import FrontLayout from "@/layouts/front/front-layout.jsx";
import {Deferred, router} from "@inertiajs/react";
import React, {useState} from "react";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import ListSidebar from "@/pages/main/blog/list-sidebar.jsx";
import BlogCard from "@/components/common/blog-card.jsx";
import {Pagination} from "@/components/index/index.js";
import imageCate from '../../../../images/img-cate.jpg'
export default function BlogList(props) {
    const {data: {links, data},  categories} = props
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


    return (
        <>
            <Breadcrumb l1={['بلاگ', '']}/>
            <section className="w-full container justify-center">
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-2 lg:gap-x-8 xl:gap-x-10">

                    <ListSidebar categories={categories}/>
                    {/* ------ left side----- */}
                    <div className="md:col-span-8 lg:col-span-9 mt-6 md:mt-0">
                        <h2 className="font-bold text-2xl pb-6">بلاگ</h2>
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
                                <option value={['total_view', 'desc']}>بربازدید</option>
                                {/*<option value="audi">منتخب</option>*/}
                            </select>
                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {data.map((blog, i) => (
                                <BlogCard blog={blog} i={i} />
                            ))}

                        </div>
                        <div className="w-full overflow-x-auto flex lg:justify-center">
                            <Pagination links={links}  />
                        </div>
                        <div className="border-[1px] border-gray-200 mt-8"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
BlogList.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
