import {DarkSwitch} from "@/components/daisy-ui/theme-switch.jsx";
import React, {useEffect, useRef, useState} from "react";

import logo from "../../../images/logo.png"
import {Link, usePage} from "@inertiajs/react";
import SearchBar from "@/components/common/search-bar.jsx";
import {motion} from "motion/react"
import {useIsMobile} from '@/hooks'
import GetCart from "@/components/common/get-cart.jsx";
import {Search, Menu, ChevronLeft} from "lucide-react";
import MegaMenuBank from '../../megu-menu-bank.jsx'

function MegaMenuDrawer() {
    const [activeTab, setActiveTab] = useState(
        MegaMenuBank && MegaMenuBank.length > 0 ? MegaMenuBank[0].id : null
    );

    return (
        <div className="rtl flex h-full">
            {/* ستون تب‌ها ثابت */}
            <div className="flex flex-col w-1/3 border-l border-gray-300  p-2 h-full sticky top-0">
                <button
                    key={99999}
                    onClick={() => setActiveTab(99999)}
                    className={`px-1 py-2 text-right mb-1 rounded hover:bg-gray-100 break-words ${
                        activeTab === 99999 ? "bg-base-300 font-semibold" : ""
                    }`}
                >
                    منو
                </button>
                {MegaMenuBank?.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`px-1 py-2 text-right mb-1 rounded hover:bg-gray-100 break-words ${
                            activeTab === category.id ? "bg-base-300 font-semibold" : ""
                        }`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            {/* ستون محتوا scrollable */}
            <div className="flex-1 p-4 overflow-y-scroll h-screen">
                {activeTab === 99999 &&
                <div key={99999} className="space-y-4">
                    <ul key={999999} className="text-sm space-y-1">
                        <li className="font-bold truncate">
                            <Link href={route('home')} className="flex justify-between items-center  hover:text-[#d8330a] pr-2 truncate" title="home">
                                <div className="truncate">خانه</div>
                                <ChevronLeft className="w-3 h-3"/>
                            </Link>
                        </li>
                        <li className="font-bold truncate">
                            <Link href={route('home.getBlogs')} className="flex justify-between items-center  hover:text-[#d8330a] pr-2 truncate" title="getBlogs">
                                <div className="truncate">بلاگ</div>
                                <ChevronLeft className="w-3 h-3"/>
                            </Link>
                        </li>
                        <li className="font-bold truncate">
                            <Link href={route('home.about')} className="flex justify-between items-center  hover:text-[#d8330a] pr-2 truncate" title="home">
                                <div className="truncate"> درباره ما</div>
                                <ChevronLeft className="w-3 h-3"/>
                            </Link>
                        </li>
                        <li className="font-bold truncate">
                            <Link href={route('home.contact')} className="flex justify-between items-center  hover:text-[#d8330a] pr-2 truncate" title="home">
                                <div className="truncate">تماس با ما</div>
                                <ChevronLeft className="w-3 h-3"/>
                            </Link>
                        </li>
                        <li className="font-bold truncate">
                            <Link href={route('home.faq')} className="flex justify-between items-center  hover:text-[#d8330a] pr-2 truncate" title="home">
                                <div className="truncate">سوالات متداول</div>
                                <ChevronLeft className="w-3 h-3"/>
                            </Link>
                        </li>
                    </ul>
                </div>
                }
                {MegaMenuBank?.map(
                    (category) =>
                        activeTab === category.id && (
                            <div key={category.id} className="space-y-4">
                                {Array.isArray(category.children) &&
                                    category.children.map((sub) => (
                                        <ul key={sub.id} className="text-sm space-y-1">
                                            <li className="font-bold truncate">
                                                <Link
                                                    href={`/category/${sub.slug}`}
                                                    className="flex justify-between items-center  hover:text-[#d8330a] pr-2 truncate"
                                                >
                                                    <div className="truncate">{sub.title}</div>
                                                    <ChevronLeft className="w-3 h-3"/>
                                                </Link>
                                            </li>

                                            {Array.isArray(sub.children) &&
                                                sub.children.length > 0 &&
                                                sub.children.map((item) => (
                                                    <li
                                                        key={item.id}
                                                        className="text-gray-600 hover:text-[#d8330a] text-xs pr-2 truncate"
                                                    >
                                                        <Link href={`/category/${item.slug}`} className="truncate">
                                                            {item.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    ))}
                            </div>
                        )
                )}
            </div>
        </div>

    );
}

export default function Header(props) {
    const drawerRef = useRef(null);
    const { component } = usePage(); // نام صفحه فعلی
    useEffect(() => {
        if (drawerRef.current) {
            drawerRef.current.checked = false;
        }
    }, [component]); // هر بار component تغییر کرد اجرا شود
    const [openSearch, setOpenSearch] = useState(false)
    const isMobile = useIsMobile()
    return (
        <header className=" w-full flex justify-center items-center">
            {!isMobile ? (
                <div className="container">
                    <div className="grid grid-cols-12 py-6 items-center ">
                        <div className="hidden md:flex md:col-span-4 items-center">

                            <GetCart/>

                            <DarkSwitch/>
                        </div>
                        {/* ---------- search bar big screen------------- */}
                        <SearchBar/>

                        {/* ------------- logo ----------------- */}
                        <Link href={route('home')}
                              className="w-full flex col-span-12 md:col-span-3 h-auto   text-left " dir="ltr">
                            <img src={logo} alt="logo" className="h-8 sm:h-11"/>
                        </Link>
                    </div>
                </div>
            ) : (

                <div className="w-full  bg-base-200 lg:hidden   my-0">
                    {/* ------------------------ menu categories small sceern----------------- */}
                    <div class="container grid grid-cols-12 py-3 px-4">
                        <div className="col-span-4 flex items-center px-1 sm:px-0">
                            <GetCart isMobile={isMobile}/>
                            <DarkSwitch/>
                        </div>
                        <Link href={route('home')}
                              className="col-span-4 flex items-center py-2 justify-center  ">
                            <img src={logo} alt="logo" className="h-8 sm:h-12"/>
                        </Link>
                        {/* ------------------------ shopping basket small screen----------------- */}

                        <div className="col-span-4 flex items-center px-1 sm:px-0">

                            <div className="btn" onClick={() => setOpenSearch(!openSearch)}>
                                <Search className=" h-5 w-5"/>
                            </div>
                            {openSearch &&
                                <motion.div
                                    style={{overflow: "hidden"}}
                                    initial={{height: 0}}
                                    animate={{height: "auto"}}
                                    transition={{duration: 0.5}}
                                    exit={{height: 0}}
                                    key={"container"}
                                >
                                    <SearchBar isMobile={isMobile}/>
                                </motion.div>
                            }
                            {/* -------- menu drawer small sceern----- */}
                            <div className="flex items-center justify-end mr-3">
                                <div className="drawer">
                                    <input id="my-drawer-1" type="checkbox" className="drawer-toggle peer" ref={drawerRef} />
                                    <div className=" drawer-content z-999 transition-all duration-300 peer-checked:absolute peer-checked:-top-20 peer-checked:right-0">
                                        <label htmlFor="my-drawer-1" className="btn drawer-button">
                                            <Menu/>
                                        </label>
                                        {/* سایر محتوای صفحه */}
                                    </div>
                                    <div className="drawer-side">
                                        <label htmlFor="my-drawer-1" className="drawer-overlay"></label>
                                        <ul className="menu bg-base-200 w-full">
                                            {/* Sidebar content here */}
                                            <div className="py-4 overflow-y-auto ">
                                                <ul className="space-y-2 font-medium">
                                                    {/* ------ menu drawer list HOME------ */}
                                                    <li>
                                                        <MegaMenuDrawer/>

                                                    </li>
                                                    {/*<li>*/}

                                                    {/*    <div className="collapse collapse-plus bg-base-100 border border-base-300">*/}
                                                    {/*        <input type="radio" name="my-accordion-3" defaultChecked />*/}
                                                    {/*        <div className="collapse-title font-semibold">اصلی</div>*/}
                                                    {/*        <ul  className=" collapse-content py-2 space-y-2 bg-white px-2">*/}
                                                    {/*            <li>*/}
                                                    {/*                <Link href={route('home')} className="cursor-pointer ">*/}
                                                    {/*                    خانه*/}
                                                    {/*                </Link>*/}
                                                    {/*            </li>*/}
                                                    {/*            <li>*/}
                                                    {/*                <Link href={route('home.getBlogs')} className="cursor-pointer ">*/}
                                                    {/*                    وبلاگ*/}
                                                    {/*                </Link>*/}
                                                    {/*            </li>*/}
                                                    {/*        </ul>*/}
                                                    {/*    </div>*/}


                                                    {/*</li>*/}
                                                    {/*<li>*/}
                                                    {/*    <div className="collapse collapse-plus bg-base-100 border border-base-300">*/}
                                                    {/*        <input type="radio" name="my-accordion-3" defaultChecked />*/}
                                                    {/*        <div className="collapse-title font-semibold">دسته بندی ها</div>*/}
                                                    {/*        <ul  className=" collapse-content py-2 space-y-2 bg-white px-2">*/}
                                                    {/*            <li className="py-1">*/}
                                                    {/*                <h4 className="font-bold text-base">*/}
                                                    {/*                    لوازم جانبی خودرو*/}
                                                    {/*                </h4>*/}
                                                    {/*            </li>*/}

                                                    {/*        </ul>*/}
                                                    {/*    </div>*/}


                                                    {/*</li>*/}
                                                </ul>
                                            </div>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------------------ menu small screen----------------- */}

        </header>
    )
}
