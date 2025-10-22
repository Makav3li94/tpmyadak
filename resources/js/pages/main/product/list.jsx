import FrontLayout from "@/layouts/front/front-layout.jsx";
import {
    ChevronLeft,
    Star,
    Search,
    Heart,
    RefreshCw,
} from "lucide-react";
import bannerSide from '../../../../images/banner-sidebar.jpg'
import imageCate from '../../../../images/img-cate.jpg'
import {Deferred, router} from "@inertiajs/react";
import {useState} from "react";
import ProductCard from "@/components/common/product-card.jsx";
import {useCart} from "react-use-cart";
import {showToast} from "@/utils.js";
import MultiRangeSlider from "@/pages/main/product/partials/MultiRangeSlider.jsx";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import BallSpinner from "@/components/common/ball-spinner.jsx";
import SearchFilter from "@/pages/main/product/partials/searchFilter.jsx";

export default function ProductList(props) {
    const {data: {links, data}, brands, carBrands, carModels, categories} = props
    const {addItem} = useCart();
    const [sortColumn, setSortColumn] = useState('')
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(99000000);
    const [brandFilter, setBrandFilter] = useState([]);
    const [carBrandsFilter, setCarBrandsFilter] = useState([]);
    const [carModelsFilter, setCarModelsFilter] = useState([]);
    const [categoriesFilter, setCategoriesFilter] = useState([]);

    const sortList = (e) => {
        setSortColumn(e.target.value)
        router.get(
            route(route().current()),
            {column: e.target.value},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true
            }
        )
    }
    const filterPrice = (min, max) => {
        setPriceMin(min)
        setPriceMax(max)
        router.get(
            route(route().current()),
            {priceMin: min, priceMax: max},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true
            }
        )
    }
    const handleCheckboxFilter = (array,group) => {
        router.get(
            route(route().current()),
            {arrayFilter: array, group: group},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true
            }
        )
    }
    const handleAdd = (item) => {
        addItem({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            discount: item.discount,
            image: item.image,
            price: item.price,
        })
        showToast('محصول به سبد خرید اضافه شد', 'success')
    }
    const handleWish = (item) => {
        router.post(route('user.wishlists.store'), {item: item}, {
            forceFormData: true,
            onSuccess: () => showToast('محصول به لیست خرید اضافه شد', 'success'),
        })
    }

    return (
        <>
            <Breadcrumb l1={['محصولات', '']}/>
            <section className="w-full container justify-center">
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-2 lg:gap-x-8 xl:gap-x-10">
                    <div className="md:col-span-4 lg:col-span-3">
                        <div className="border-[1px] border-gray-300 border-t-[#ff2d37] rounded-md overflow-hidden">
                            {/* Header */}
                            <div className="bg-[#ff2d37] text-base-100 py-3 px-7 font-semibold">
                                فیلترها
                            </div>

                            <ul className="bg-base-100 py-4">
                                <li>
                                    <fieldset
                                        className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-5">
                                        <label className="label flex justify-between items-center">
                                            <input type="checkbox" defaultChecked className="toggle"/>
                                            <div>فقط موجود ها</div>
                                        </label>
                                    </fieldset>
                                </li>
                                <li>
                                    <fieldset
                                        className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-5">
                                        <label className="label flex justify-between items-center">
                                            <input type="checkbox" defaultChecked className="toggle"/>
                                            <div>تخفیف دار ها</div>
                                        </label>
                                    </fieldset>
                                </li>
                                <li>
                                    <fieldset
                                        className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-5">
                                        <div className="">محدوده قیمت</div>
                                        <MultiRangeSlider min={0} max={99000000} onChange={({min, max}) => {
                                            filterPrice(min, max)

                                        }}
                                        />
                                    </fieldset>

                                </li>
                                {/* -------- تلفن هوشمند و تبلت -------- */}
                                <div className="collapse collapse-plus bg-base-100 px-4">
                                    <input type="radio" name="my-accordion-3" defaultChecked/>
                                    <div
                                        className="collapse-title text-gray-600 text-sm font-medium border-b-[1px] border-gray-300">
                                        برند ها
                                    </div>
                                    <div className="collapse-content mt-4 p-0">

                                        <ul className="max-h-50 space-y-2 overflow-y-auto overflow-x-hidden py-3">
                                            {/*<Deferred data="brands" fallback={<BallSpinner/>}>*/}

                                            <SearchFilter groupName='brands' data={brands} selected={brandFilter}
                                                          setSelected={setBrandFilter}  handleCheckboxFilter={handleCheckboxFilter}/>
                                            {/*</Deferred>*/}
                                        </ul>


                                    </div>
                                </div>

                                {/* -------- لوازم الکترونیکی -------- */}
                                <div className="collapse collapse-plus bg-base-100 px-4">
                                    <input type="radio" name="my-accordion-3"/>
                                    <div
                                        className="collapse-title text-gray-600 text-sm font-medium border-b-[1px] border-gray-300">
                                        برند خودرو
                                    </div>
                                    <div className="collapse-content mt-4 p-0">
                                        <ul className="max-h-50 space-y-2 overflow-y-auto overflow-x-hidden py-3">
                                            <SearchFilter groupName='carBrands' data={carBrands}
                                                          selected={carBrandsFilter} setSelected={setCarBrandsFilter} handleCheckboxFilter={handleCheckboxFilter}/>
                                        </ul>
                                    </div>
                                </div>

                                {/* -------- کفش -------- */}
                                <div className="collapse collapse-plus bg-base-100 px-4">
                                    <input type="radio" name="my-accordion-3"/>
                                    <div
                                        className="collapse-title text-gray-600 text-sm font-medium border-b-[1px] border-gray-300">
                                        نوع خودرو
                                    </div>
                                    <div className="collapse-content mt-4 p-0">
                                        <ul className="max-h-50 space-y-2 overflow-y-auto overflow-x-hidden py-3">
                                            <SearchFilter groupName='carModels' data={carModels}
                                                          selected={carModelsFilter} setSelected={setCarModelsFilter}  handleCheckboxFilter={handleCheckboxFilter}/>
                                        </ul>
                                    </div>
                                </div>

                                {/* -------- زیورآلات -------- */}
                                <div className="collapse collapse-plus bg-base-100 px-4">
                                    <input type="radio" name="my-accordion-3"/>
                                    <div
                                        className="collapse-title text-gray-600 text-sm font-medium border-b-[1px] border-gray-300">
                                        دسته بندی
                                    </div>
                                    <div className="collapse-content mt-4">
                                        <ul className="max-h-50 space-y-2 overflow-y-auto overflow-x-hidden py-3">
                                            <SearchFilter groupName='categories' data={categories}
                                                          selected={categoriesFilter}
                                                          setSelected={setCategoriesFilter}  handleCheckboxFilter={handleCheckboxFilter}/>
                                        </ul>
                                    </div>
                                </div>

                            </ul>
                        </div>
                        {/* ------ latest product------ */}
                        <a href="#" title="banner" className="hidden sm:block">
                            <img
                                src={bannerSide}
                                alt="banner"
                                className="hover:opacity-85"
                            />
                        </a>
                    </div>
                    {/* ------ left side----- */}
                    <div className="md:col-span-8 lg:col-span-9 mt-6 md:mt-0">
                        <h2 className="font-bold text-2xl pb-6">محصولات</h2>
                        <a href="#" title="img-cate" className="group">
                            <img
                                src={imageCate}
                                alt="imagecat"
                                className="group-hover:opacity-110 w-full"
                            />
                        </a>
                        <div className="my-8 text-left">
                            <label htmlFor="cars">مرتب سازی</label>
                            <select name="cars" id="cars" className="border-[1px] border-gray-300 px-1 mx-2"
                                    value={sortColumn}
                                    onChange={(e) => sortList(e)}>
                                <option value={['created_at', 'desc']}>جدیدترین</option>
                                <option value={['price', 'asc']}>ارزانترین</option>
                                <option value={['price', 'desc']}>گرانترین</option>
                                {/*<option value="audi">منتخب</option>*/}
                            </select>
                        </div>
                        <div className="-mx-px grid grid-cols-1 border-l border-gray-200 sm:mx-0  md:grid-cols-4 ">
                            {data.map((product, i) => (
                                <ProductCard product={product} key={i} handleAdd={() => handleAdd(product)}
                                             handleWish={() => handleWish(product)}/>
                            ))}

                        </div>
                        <div className="border-[1px] border-gray-200 mt-8"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
ProductList.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
