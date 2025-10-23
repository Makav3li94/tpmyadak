import FrontLayout from "@/layouts/front/front-layout.jsx";
import {Deferred, router} from "@inertiajs/react";
import {useCart} from "react-use-cart";
import {showToast} from "@/utils.js";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import {Minus, Plus, ShoppingCart, Star, SquareCheckBig, Heart} from "lucide-react";
import RelatedProducts from "@/pages/main/product/partials/related-products.jsx";

const reviews = {
    average: 4,
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
        <p>محصول خیلی خوبی بود</p>
      `,
            date: 'July 16, 2021',
            datetime: '2021-07-16',
            author: 'پرهام اکبری',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },
        {
            id: 1,
            rating: 5,
            content: `
        <p>یکی دیگه خریدم، این یکی خوب نبود</p>
      `,
            date: 'July 16, 2021',
            datetime: '2021-07-16',
            author: 'پرهام اکبری',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },

        // More reviews...
    ],
}
export default function ProductSingle({product, attributeGroups = [],relatedProducts}) {
    const {addItem} = useCart();


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
            <Breadcrumb l1={['محصولات', 'home.getProducts']} l2={[product.title, 'home.getProduct', product.sku]}/>
            <section className="relative container">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
                        <div className="img">
                            <div className="img-box h-full max-lg:mx-auto ">
                                <img
                                    // src="https://pagedone.io/asset/uploads/1700471600.png"
                                    src={route('file.show', product.image)}
                                    alt="Yellow Tropical Printed Shirt image"
                                    className="max-lg:mx-auto lg:ml-auto h-full object-cover"/>
                            </div>
                        </div>
                        <div
                            className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                            <div className="data w-full max-w-xl">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                                    {product.title}
                                </h2>
                                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 ml-5">
                                        {parseInt(product.price).toLocaleString('en')} میلیون
                                    </h6>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>

                                        </div>
                                        <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">1624
                                            نظر</span>

                                    </div>

                                </div>

                                <p className="text-gray-500 text-base font-normal mb-5">
                                    {product.excerpt}
                                    {/*<a href="#" className="text-indigo-600">More....</a>*/}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-5">
                                    <div className="">
                                        <ul className="list  gap-y-1 ">
                                            <li className="list-row flex justify-between items-center">
                                                <div className="w-32"><strong>برند:</strong></div>
                                                <div>{product.brand.title}</div>
                                            </li>
                                            {product.filters.map((filter, i) =>
                                                <li className="list-row flex justify-between items-center" key={i}>
                                                    <div className="w-32"><strong>{filter.title}:</strong></div>
                                                    <div>{filter.pivot.value}</div>
                                                </li>
                                            )}


                                        </ul>
                                    </div>
                                    <div className=" ">
                                        <ul className="list  gap-y-1 ">
                                            {attributeGroups.length > 0 && attributeGroups.map((attr, i) =>
                                                <li className="list-row flex justify-between items-center">
                                                    <div className="w-32"><strong>{attr.group_title}:</strong></div>
                                                    <div>
                                                        {attr.attributes.map((attribute, i) =>
                                                            <button className="bg-white text-center py-1 px-4 w-full font-semibold
                                            text-xs leading-8 text-gray-900 border border-gray-200 flex items-center
                                             rounded-full justify-center transition-all duration-300 hover:bg-gray-50
                                              hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300
                                              visited:border-gray-300 visited:bg-gray-50 mb-2">
                                                                {attribute.title}
                                                                {/*{attribute.add_price}*/}
                                                            </button>
                                                        )}
                                                    </div>
                                                </li>
                                            )}
                                        </ul>

                                    </div>
                                </div>
                                <div className="Availability inline-block font-bold mb-5 mr-auto">
                                    <span className="text-gray-400 text-xs">موجودی: </span>
                                    <span className="text-gray-400 text-xs px-1">
                                        موجود در انبار
                                    </span>
                                    <SquareCheckBig className="w-4 h-4 text-primary inline-block"/>
                                    ({product.stock} عدد)
                                </div>
                                <div className="flex justify-start items-center  w-full">
                                    <div className="w-32"><strong>مناسب برای:</strong></div>
                                    <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                                        {product.car_models.map((carModel, i) =>
                                            <div key={i}
                                                 className="badge badge-neutral badge-dash ">{carModel.title}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                                    <button onClick={() => handleWish(product)}
                                            className="group transition-all duration-500 p-4 w-auto  flex items-center
                                         justify-center gap-2  rounded-full bg-indigo-50
                                         hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                                        <Heart width="26" height="26"/>
                                        اضافه به علامندی
                                    </button>
                                    {/*<div className="flex sm:items-center sm:justify-center w-full">*/}
                                    {/*    <button className="group py-3 px-6 border border-gray-400 rounded-r-full*/}
                                    {/*    bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm*/}
                                    {/*     hover:shadow-gray-300">*/}
                                    {/*        <Minus className="stroke-gray-900 group-hover:stroke-black"/>*/}

                                    {/*    </button>*/}
                                    {/*    <input type="text" className="font-semibold text-gray-900 cursor-pointer*/}
                                    {/*     text-lg py-[10px] px-6 w-full sm:max-w-[118px] outline-0 border-y*/}
                                    {/*     border-gray-400 bg-transparent placeholder:text-gray-900 text-center*/}
                                    {/*      hover:bg-gray-50" placeholder="1"/>*/}
                                    {/*    <button className="group py-3 px-6 border border-gray-400 rounded-l-full*/}
                                    {/*     bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm*/}
                                    {/*      hover:shadow-gray-300">*/}
                                    {/*        <Plus className="stroke-gray-900 group-hover:stroke-black"/>*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                    <button onClick={() => handleAdd(product)}
                                            className="group py-3 px-5 rounded-full bg-red-600 text-base-100
                                        font-semibold text-lg w-full flex items-center justify-center gap-2
                                        transition-all duration-500 hover:bg-indigo-100">
                                        <ShoppingCart className=" " width={22} height={22}/>
                                        افزودن به سبد خرید
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* name of each tab group should be unique */}

                <div className="mt-10 border-t border-gray-200 pt-10">
                    <div className="tabs tabs-lift">
                        <input type="radio" name="my_tabs_3" className="tab" aria-label="معرفی"/>
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <div dangerouslySetInnerHTML={{__html: product.about}}/>
                            <div className="prose prose-sm mt-4 text-gray-500">
                                <ul className="list  gap-y-4 mb-8">
                                    {product.specs.map((specs, i) =>
                                        <li className="list-row flex justify-start" key={i}>
                                            <div className="w-48"><strong>{specs.title}:</strong></div>
                                            <div>{specs.value}</div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_3" className="tab" aria-label="بررسی تخصصی" defaultChecked/>
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <div dangerouslySetInnerHTML={{__html: product.description}}/>
                        </div>

                        <input type="radio" name="my_tabs_3" className="tab" aria-label="دیدگاه ها"/>
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            {reviews.featured.map((review, reviewIdx) => (
                                <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
                                    <div className="flex-none py-10">
                                        <img alt="" src={review.avatarSrc}
                                             className="h-10 w-10 rounded-full bg-gray-100"/>
                                    </div>
                                    <div
                                        className={`${reviewIdx === 0 ? '' : 'border-t border-gray-200'}  py-10 w-full`}>
                                        <h3 className="font-medium text-gray-900">{review.author}</h3>
                                        <p>
                                            <time dateTime={review.datetime}>{review.date}</time>
                                        </p>

                                        <div className="mt-4 flex items-center">
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                                        </div>
                                        <p className="sr-only">{review.rating} out of 5 stars</p>

                                        <div
                                            dangerouslySetInnerHTML={{__html: review.content}}
                                            className="prose prose-sm mt-4 max-w-none text-gray-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
            <RelatedProducts relatedProducts={relatedProducts} handleAdd={handleAdd} handleWish={handleWish}/>
        </>
    )
}
ProductSingle.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
