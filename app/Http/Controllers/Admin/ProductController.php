<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\AttributeGroup;
use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;
use App\Models\Shop\CarType;
use App\Models\Shop\FilterProduct;
use App\Models\Shop\Product;
use App\Models\Shop\ProductAttribute;
use App\Models\Shop\ProductCategory;
use App\Models\Shop\ProductImage;
use App\Models\Shop\ProductSpecs;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\AutoEncoder;
use Intervention\Image\ImageManager;

use function PHPUnit\Framework\isNull;

class ProductController extends Controller
{
    #[Permission('view-product')]
    public function index(Request $request): Response
    {
        //        PRODUCT FILTER CATEGORY QUERY
        //        Product::whereHas('attributes', function ($query) {
        //            $query->where('attribute_id', $idOfAttributeYouAreInterestedIn)
        //                ->where('value', $specificValue);
        //        })->get());

        $query = Product::query();

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/product/index', [
            'data' => $query->paginate(10),
        ]);
    }

    #[Permission('create-product')]
    public function create(): Response
    {
        [$categories, $attrGroups, $carBrands ] = $this->getLabels();

        return inertia('admin/product/form', [
            'productCategories' => $categories,
            'attrGroups' => $attrGroups,
            'carBrands' => $carBrands,

        ]);
    }

    #[Permission('create-product')]
    public function store(Request $request)
    {
        $validatedData = $this->handleValidate($request);
        $validatedData['image'] = 'temp';
        $images = $request->images;
        unset($validatedData['images']);

        $product = Product::create($validatedData);
        if (isset($images) && count($images) > 0) {
            $this->handleImages($request, $product);
        }
        $filterArray = $request['car_type_id'];
        unset($validatedData['car_type_id']);
        if (count($filterArray)) {
            $product->carTypes()->attach(array_mapper($filterArray));
        }
        $this->handleProductGroupAttrs($request, $product);
        $this->handleProductSpecs($request, $product);
        $this->handleProductCategoryFilters($request, $product);

        return redirect()->route('admin.products.index')
            ->with('message', ['type' => 'success', 'message' => 'محصول با موفقیت ساخته شد.']);
    }

    #[Permission('update-product')]
    public function edit(Product $product)
    {
        $prFiles = $this->getPrStoredImages($product->id);
        [$categories, $attrGroups,$carBrands] = $this->getLabels();
        if ($product->carBrand)$product['def_brand'] = simple_labeler($product->carBrand);
        if ($product->carModel)$product['def_model'] = simple_labeler($product->carModel);
        $product['def_types'] = array_labeler($product->carTypes);

        return inertia('admin/product/form', [
            'product' => $product->load(['category', 'brand', 'supplier', 'tax', 'specs', 'attributes', 'filters']),
            'prFiles' => $prFiles,
            'productCategories' => $categories,
            'attrGroups' => $attrGroups,
            'carBrands' => $carBrands,
            'startDate' => $product->date_start,
            'endDate' => $product->date_end,
        ]);
    }

    #[Permission('update-product')]
    public function update(Request $request, Product $product): RedirectResponse
    {

        $validatedData = $this->handleValidate($request, true, $product->id);
        $images = $request->images;
        if (isset($images) && count($images) > 0) {
            $this->handleImages($request, $product, 'update');
        }
        unset($validatedData['images']);

        $product->fill($validatedData);

        $product->save();
        $filterArray = $request['car_type_id'];
        unset($validatedData['car_type_id']);
        if (count($filterArray)) {
            $product->carTypes()->sync(array_mapper($filterArray));
        }
        $this->handleProductGroupAttrs($request, $product, 'update');
        $this->handleProductSpecs($request, $product, 'update');
        $this->handleProductCategoryFilters($request, $product, 'update');

        return redirect()->route('admin.products.index')
            ->with('message', ['type' => 'success', 'message' => 'محصول با موفقیت ویرایش شد.']);
    }

    #[Permission('delete-product')]
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('message', ['type' => 'success', 'message' => 'محصول با موفقیت حذف شد.']);
    }

    private function handleValidate(Request $request, $isUpdate = false, $id = null): array
    {

        $defaultValidationArray = [
            'title' => 'required|string|max:255',
            'alias' => 'nullable|string|max:120',
            'excerpt' => 'required|string|max:255',
            'product_category_id' => 'required',
            'brand_id' => 'required|ulid',
            'car_brand_id' => 'nullable',
            'car_model_id' => 'nullable',
            'supplier_id' => 'required|ulid',
            'tax_id' => 'required|ulid',
            'sku' => 'required|string',
//            'sku' => 'required|numeric',
            'minimum' => 'required|numeric',
            'kind' => 'required|numeric',
            'price' => 'required|numeric',
            'cost' => 'nullable|numeric',
            'real_price' => 'nullable|numeric',
            'stock' => 'required|numeric',
            'discount' => 'nullable|string|max:250',
            'about' => 'nullable|string',
            'description' => 'required|string',
            //            'img_cover' => 'required|string',
            'imageFile' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:512|dimensions:maxWidth=1600, maxHeight=900',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'status_promotion' => 'nullable|boolean',
            'status' => 'nullable|boolean',
            'approve' => 'nullable|boolean',
        ];
        if ($isUpdate) {
            $conRules = [
                'images' => 'nullable|array|max:10',
                'images.*' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:1024|dimensions:max_width=2000,max_height=2000',
                'slug' => "nullable|unique:products,slug,$id",
            ];
        } else {
            $conRules = [
                'images' => 'required|array|min:1|max:10',
                'images.*' => 'required|image|mimes:jpg,jpeg,png,webp,gif|max:1024|dimensions:max_width=2000,max_height=2000',
                'slug' => 'nullable|unique:products,slug',
            ];
        }
        $rules = array_merge($defaultValidationArray, $conRules);
        $validatedData = $request->validate($rules);
        $validatedData['excerpt'] = empty($request->excerpt) ? strip_tags(Str::limit($validatedData['description'], 125)) : $request->excerpt;
        $validatedData['slug'] = empty($request->slug) ? slug_gen($request->title) : slug_gen($request->slug);
        if (isset($validatedData['date_start'])) {
            if (!isNull($validatedData['date_start'])) {
                $validatedData['date_start'] = Carbon::parse($validatedData['date_start'])->toDateTimeString();
            }
        }
        if (isset($validatedData['date_end'])) {
            if (!isNull($validatedData['date_end'])) {
                $validatedData['date_end'] = Carbon::parse($validatedData['date_end'])->toDateTimeString();
            }
        }
        if (is_array($validatedData['product_category_id'])) {
            $validatedData['product_category_id'] = $request->product_category_id['value'];
        }
        if (is_array($validatedData['car_brand_id'])) {
            $validatedData['car_brand_id'] = $request->car_brand_id['value'];
        }
        if (is_array($validatedData['car_model_id'])) {
            $validatedData['car_model_id'] = $request->car_model_id['value'];
        }

        return $validatedData;
    }

    public function handleImages(Request $request, Product $product, $type = 'create'): void
    {

        $imagesArr = [];
        if ($type == 'update') {
            Storage::disk('public')->delete('product/' . $product->image);
            foreach ($product->images as $img) {

                if (file_exists(storage_path('/app/public/product' . $img))) {
                    Storage::disk('public')->delete('product/' . $img);
                }
                if (file_exists(storage_path('/app/public/prothumb' . $img))) {
                    Storage::disk('public')->delete('prothumb/' . $img);
                }
                if (file_exists(storage_path('/app/public/product510' . $img))) {
                    Storage::disk('public')->delete('product510/' . $img);
                }
                if (file_exists(storage_path('/app/public/product75' . $img))) {
                    Storage::disk('public')->delete('product75/' . $img);
                }

                $jpeg = explode('.', $img);
                $jpeg = $jpeg[0] . 'jpg';
                if (file_exists(storage_path('/app/public/productjpg' . $img))) {
                    Storage::disk('public')->delete('productjpg/' . $jpeg);
                }
                if (file_exists(storage_path('/app/public/prothumbjpg' . $img))) {
                    Storage::disk('public')->delete('prothumbjpg/' . $jpeg);
                }

            }
            $product->images()->delete();
        }

        $manager = new ImageManager(new Driver);
        foreach ($request->images as $key => $file) {
            $id = uniqid();
            $image_name = $id . '.' . 'webp';
            $image_name_jpg = $id . '.' . 'jpg';
            if ($key == 0) {
                $product->update(['image' => $image_name]);
            }

            $manager->read($file)->resize(1024, 1024)->encode(new AutoEncoder(quality: 60))->save(storage_path('/app/public/productjpg/' . $image_name_jpg));
            $manager->read($file)->resize(350, 350)->encode(new AutoEncoder(quality: 60))->save(storage_path('/app/public/prothumbjpg/' . $image_name_jpg));
            // WEBP
            $manager->read($file)->resize(1024, 1024)->encode(new AutoEncoder(quality: 65))->save(storage_path('/app/public/product/' . $image_name));
            $manager->read($file)->resize(510, 510)->encode(new AutoEncoder(quality: 60))->save(storage_path('/app/public/product510/' . $image_name));
            $manager->read($file)->resize(350, 350)->encode(new AutoEncoder(quality: 60))->save(storage_path('/app/public/prothumb/' . $image_name));
            $manager->read($file)->resize(75, 75)->encode(new AutoEncoder(quality: 60))->save(storage_path('/app/public/product75/' . $image_name));

            $imagesArr[] = ['id' => Str::ulid(), 'product_id' => $product->id, 'image' => $image_name];

        }
        ProductImage::insertOrIgnore($imagesArr);

    }

    public function getPrStoredImages($id): array
    {
        $images = ProductImage::where('product_id', $id)->get()->toArray();
        if (count($images) > 0) {
            $storeFolder = storage_path('app/public/prothumb');

            $adFiles = [];
            foreach ($images as $image) {
                $image = $image['image'];
                $obj['name'] = $image;
                $file_path = storage_path('/app/public/prothumb/' . $image);
                $obj['size'] = filesize($file_path);
                $obj['path'] = $storeFolder;
                $obj['type'] = 'image/webp';
                $obj['preview'] = url('storage/prothumb/' . $image);

                $adFiles[] = $obj;
            }

            return $adFiles;
        }

        return [];
    }

    private function handleProductGroupAttrs(Request $request, Product $product, $type = 'store'): void
    {
        $productGroupAttrs = [];
        if (isset($request->product_group_attrs)) {
            foreach ($request->product_group_attrs as $product_attr) {
                $productGroupAttrs[] = [
                    'id' => Str::ulid(),
                    'title' => $product_attr['title'],
                    'attribute_group_id' => $product_attr['attribute_group_id'],
                    'product_id' => $product->id,
                    'add_price' => $product_attr['add_price'],
                ];
            }
            if ($type == 'update') {
                ProductAttribute::where('product_id', $product->id)->delete();
            }

            ProductAttribute::insertOrIgnore($productGroupAttrs);
        }
    }

    private function handleProductSpecs(Request $request, Product $product, $type = 'store'): void
    {
        $productSpecs = [];
        if (isset($request->product_group_specs)) {
            foreach ($request->product_group_specs as $product_spec) {
                $productSpecs[] = [
                    'id' => Str::ulid(),
                    'title' => $product_spec['title'],
                    'product_id' => $product->id,
                    'value' => $product_spec['value'],
                ];
            }
            if ($type == 'update') {
                ProductSpecs::where('product_id', $product->id)->delete();
            }

            ProductSpecs::insertOrIgnore($productSpecs);
        }
    }

    private function handleProductCategoryFilters(Request $request, Product $product, $type = 'store')
    {
        $productCategoryFilters = [];
        if (isset($request->product_group_cat_attrs)) {
            FilterProduct::where('product_id', $product->id)->delete();
            foreach ($request->product_group_cat_attrs as $product_cat_attr) {
                $product->filters()->attach($product_cat_attr['id'], ['value' => $product_cat_attr['value']]);
                //                $productCategoryFilters[] = $product_cat_attr['id'];
                //                $productCategoryFiltersValues[] =  $product_cat_attr['value'];
            }

            //            if ($type == 'update') {
            //                $product->filters()->sync($productCategoryFilters,$productCategoryFiltersValues);
            //            } else {
            //                $product->filters()->attach($productCategoryFilters,$productCategoryFiltersValues);
            //
            //            }

        }
    }

    private function getLabels(): array
    {
        $categories = ProductCategory::flatTree();
        $attrGroups = AttributeGroup::select('id', 'title')->where('status', 1)->get();
        $carBrands = CarBrand::select('id', 'title')->get()->map(function ($item) {
            return [
                'value' => strval($item['id']),
                'label' => $item['title'],
            ];
        })->values()->toArray();
//        $carModels = CarModel::select('id', 'title')->get()->map(function ($item) {
//            return [
//                'value' => strval($item['id']),
//                'label' => $item['title'],
//            ];
//        })->values()->toArray();
//        $carTypes = CarType::select('id', 'title')->get()->map(function ($item) {
//            return [
//                'value' => strval($item['id']),
//                'label' => $item['title'],
//            ];
//        })->values()->toArray();
//        $carModels = CarBrand::with('carModels:id,car_brand_id,title')->select('id', 'title')->get()->map(function ($item) {
//            return [
//                'value' => strval($item['id']),
//                'label' => $item['title'],
//                'options' => $item['carModels']->map(function ($item) {
//                    if (isset($item)) {
//                        return [
//                            'value' => strval($item['id']),
//                            'label' => $item['title'],
//                        ];
//                    } else {
//                        return;
//                    }
//
//                })->values()->toArray(),
//            ];
//        })->values()->toArray();

        return [$categories, $attrGroups,$carBrands];
    }

    public function getCarModelAjax(CarBrand $carBrand)
    {
        return $carBrand->carModels()->select('id', 'title')->get()->map(function ($item) {
            return [
                'value' => strval($item['id']),
                'label' => $item['title'],
            ];
        })->values()->toArray();
    }

    public function getCarTypeAjax(CarModel $carModel)
    {
        return $carModel->carTypes()->select('id', 'title')->get()->map(function ($item) {
            return [
                'value' => strval($item['id']),
                'label' => $item['title'],
            ];
        })->values()->toArray();
    }

    public function getCategoryFiltersAjax(ProductCategory $productCategory)
    {
        return $productCategory->filters()->select('id', 'title')->get()->map(function ($item) {
            return [
                'id' => strval($item['id']),
                'title' => $item['title'],
            ];
        })->values()->toArray();
    }
}
