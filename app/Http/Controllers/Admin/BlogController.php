<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogFaq;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\AutoEncoder;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;


class BlogController extends Controller
{
    #[Permission('view-blog')]
    public function index(Request $request): Response
    {
        $query = Blog::query();

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/blog/index', [
            'data' => $query->paginate(10),
        ]);
    }

    #[Permission('create-blog')]
    public function create(): Response
    {
        return inertia('admin/blog/form');
    }

    #[Permission('create-blog')]
    public function store(Request $request): RedirectResponse
    {
        [$validatedData, $faqValidatedData] = $this->handleValidate($request);

        $imageName = "post-" . now()->timestamp . "." . $request->imageFile->extension();
        Storage::disk('public')->put(
            $imageName,
            file_get_contents($request->imageFile)
        );
        unset($validatedData['croppedImage']);
        unset($validatedData['imageFile']);
        $image_name = $this->manageImg($imageName);
        $validatedData["img_cover"] = $image_name;

        $blog = Blog::create($validatedData);
        $faqValidatedData['post_id'] = $blog->id;
        BlogFaq::create($faqValidatedData);
        return redirect()->route('admin.blogs.index')
            ->with('message', ['type' => 'success', 'message' => 'وبلاگ با موفقیت ساخته شد.']);
    }

    #[Permission('update-blog')]
    public function edit(Blog $blog): Response
    {
        $publish_date = $blog->getRawOriginal('published_at');
        return inertia('admin/blog/form', [
            'blog' => $blog->load(['category', 'subCategory','faq']),
            'publishDate' => $publish_date,
        ]);
    }

    #[Permission('update-blog')]
    public function update(Request $request, Blog $blog): RedirectResponse
    {
        [$validatedData, $faqValidatedData] = $this->handleValidate($request);

        if ($blog->fuq()->exists()) {
            $blog->fuq()->update($faqValidatedData);
        } else {
            $faqValidatedData['blog_id'] = $blog->id;
            BlogFaq::create($faqValidatedData);
        }
        if ($request->imageFile != null) {

            $imageName = "post-" . now()->timestamp . "." . $request->imageFile->extension();
            Storage::disk('public')->put(
                $imageName,
                file_get_contents($request->imageFile)
            );

            Storage::disk('public')->delete($blog->img_cover);
            unset($validatedData['croppedImage']);


            $image_name = $this->manageImg($imageName);
            $validatedData["img_cover"] = $image_name;
        }
        $blog->fill($validatedData);

        $blog->save();

        return redirect()->route('admin.blogs.index')
            ->with('message', ['type' => 'success', 'message' => 'وبلاگ با موفقیت ویرایش شد.']);
    }

    #[Permission('delete-blog')]
    public function destroy(Blog $blog): RedirectResponse
    {
        $blog->delete();

        return redirect()->route('admin.blogs.index')
            ->with('message', ['type' => 'success', 'message' => 'وبلاگ با موفقیت حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function handleValidate(Request $request): array
    {

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'category_id' => 'required|ulid',
            'excerpt' => 'required|string|max:255',
            'subcategory_id' => 'required|ulid',
//            'img_cover' => 'required|string',
            'imageFile' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:512|dimensions:maxWidth=1600, maxHeight=900',
            'published_at' => 'required|date',
            'body' => 'required|string',
            'status' => 'nullable|boolean',
        ]);
        $faqValidatedData = $request->validate([
            'q1' => 'nullable|string',
            'q2' => 'nullable|string',
            'q3' => 'nullable|string',
            'a1' => 'nullable|string',
            'a2' => 'nullable|string',
            'a3' => 'nullable|string',
        ]);
        $validatedData ['excerpt'] = empty($request->excerpt) ? strip_tags(Str::limit($validatedData['body'], 125)) : $request->excerpt;
        $validatedData ['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        $validatedData ['published_at'] = Carbon::parse($validatedData ['published_at'])->toDateTimeString();
        return [$validatedData, $faqValidatedData];
    }


    private function manageImg($image): string
    {
        $img = File::get(storage_path('/app/public/' . $image));
        $id = uniqid();
        $image_name = 'post-'.$id . '.' . 'webp';
        $image_thumb_name = 'thumb-post-'.$id . '.' . 'webp';
        $image_name_jpg = 'post-'.$id . '.' . 'jpg';
        $image_thumb_name_jpg = 'thumb-post-'.$id . '.' . 'jpg';
        $manager = new ImageManager(new Driver());

        $manager->read($img)->resize(1200, 675)->encode( new AutoEncoder(quality: 60))->save(storage_path('/app/public/postjpg/' . $image_name_jpg));
        $manager->read($img)->resize(446, 251)->encode( new AutoEncoder(quality: 60))->save(storage_path('/app/public/postthumbjpg/' . $image_thumb_name_jpg));
        //WEBP
        $manager->read($img)->resize(800, 450)->encode(new WebpEncoder(quality: 30))->save(storage_path('/app/public/post510/' . $image_name));

        $manager->read($img)->resize(800, 450)->encode(new WebpEncoder(quality: 10))->save(storage_path('/app/public/' . $image_name));
        $manager->read($img)->resize(446, 251)->encode(new WebpEncoder(quality: 10))->save(storage_path('/app/public/postthumb/' . $image_thumb_name));


        if (file_exists(storage_path('/app/public/' . $image))) {
            Storage::disk('public')->delete( $image);
        }
        if (file_exists(storage_path('/app/public/post510/' . $image))) {
            Storage::disk('public')->delete( $image);
        }
        if (file_exists(storage_path('/app/public/postthumb' . $image))) {
            Storage::disk('public')->delete('postthumb/' . 'thumb-'.$image);
        }
        $jpeg =explode('.',$image);
        $jpeg =$jpeg[0].'jpg';
        if (file_exists(storage_path('/app/public/postthumbjpg' . $jpeg))) {
            Storage::disk('public')->delete('postthumbjpg/' . 'thumb-'.$jpeg);
        }
        if (file_exists(storage_path('/app/public/postjpg' . $jpeg))) {
            Storage::disk('public')->delete('postjpg/' . $jpeg);
        }
        return $image_name;
//        ImageManager::imagick()->read($img)->resize(300, 170, function ($c) {
//            $c->aspectRatio();
//            $c->upsize();
//        })->encode('webp', 0)->save(storage_path('/app/public/postthumb/' . $image));
//
//        ImageManager::imagick()->read($img)->resize(300, 170, function ($c) {
//            $c->aspectRatio();
//            $c->upsize();
//        })->encode('jpg', 0)->save(storage_path('/app/public/postthumbjpg/' . $image));
    }
}


