import bannerSide from '../../../../images/banner-sidebar.jpg';
import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import MultiRangeSlider from "@/pages/main/product/partials/MultiRangeSlider.jsx";
import SearchFilter from "@/pages/main/product/partials/searchFilter.jsx";

export default function ListSidebar({categories = null}) {


    return (

        <div className="md:col-span-4 lg:col-span-3 lg:px-0  px-3">
            <div className="drawer lg:drawer-open flex">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-3"
                           className="btn btn-xs btn-error text-base-100 drawer-button lg:hidden fixed right-0 top-2/4 z-1">
                        دسته ها
                    </label>
                </div>
                <div className="drawer-side h-full">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="border-[1px] border-gray-300 border-t-[#d8330a] rounded-md overflow-hidden">
                        <div className="bg-[#d8330a] text-base-100 py-3 px-7 font-semibold">
                            دسته ها
                        </div>

                        <ul className="bg-base-100 py-4 flex flex-col gap-5 ">
                            {categories && categories.map((category, i) =>
                                <>
                                    <li key={i} className="w-full lg:w-64 text-gray-700 hover:text-[#d8330a] transition duration-300 ease-in p-2">
                                        <Link href={route('home.getBlogs', {category: category.id})}>
                                            {category.title}
                                        </Link>

                                    </li>
                                    {category.children.length > 0 && category.children.map((sub, i) =>
                                        <li key={i*20} className="w-full lg:w-64 text-gray-700 hover:text-[#d8330a] transition duration-300 ease-in py-1 px-4">
                                            <Link href={route('home.getBlogs', {subcategory: sub.id})}>
                                                -- {category.title}
                                            </Link>

                                        </li>
                                    )}
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}
