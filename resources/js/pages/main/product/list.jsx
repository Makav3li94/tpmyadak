import FrontLayout from "@/layouts/front/front-layout.jsx";
import imageCate from '../../../../images/img-cate.jpg'
import {Deferred, router} from "@inertiajs/react";
import React, {useState} from "react";
import ProductCard from "@/components/common/product-card.jsx";
import {useCart} from "react-use-cart";
import {showToast} from "@/utils.js";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import ListSidebar from "@/pages/main/product/list-sidebar.jsx";
import {Pagination} from "@/components/index/index.js";

export default function ProductList(props) {
    const {data: {links, data}, brands, carBrands, carModels, categories} = props
    const {addItem} = useCart();
    const [sortColumn, setSortColumn] = useState('')

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

    const handleAdd = (item) => {
        addItem({
            id: item.id,
            sku: item.sku,
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

                    <ListSidebar brands={brands} carBrands={carBrands} carModels={carModels} categories={categories}/>
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
                        <div className="-mx-px grid grid-cols-1 border-l border-gray-200 sm:mx-0  sm:grid-cols-2 lg:grid-cols-4 ">
                            {data.map((product, i) => (
                                <ProductCard product={product} key={i} handleAdd={() => handleAdd(product)}
                                             handleWish={() => handleWish(product)}/>
                            ))}

                        </div>
                        <div className="border-[1px] border-gray-200 mt-8"></div>
                        <div className="w-full overflow-x-auto flex lg:justify-center">
                            <Pagination links={links}  />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
ProductList.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
