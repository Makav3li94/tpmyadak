import {DarkSwitch} from "@/components/daisy-ui/theme-switch.jsx";
import React, {useState} from "react";

import logo from "../../../images/logo.png"
import {Link} from "@inertiajs/react";
import SearchBar from "@/components/common/search-bar.jsx";
import {motion} from "motion/react"
import {useIsMobile} from '@/hooks'
import GetCart from "@/components/common/get-cart.jsx";
import {Search, Menu, Moon} from "lucide-react";

export default function Header(props) {
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
                            <img src={logo} alt="logo" className="h-8 sm:h-12"/>
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
                                <img src={logo} alt="logo"  className="h-8 sm:h-12"/>
                            </Link>
                        {/* ------------------------ shopping basket small screen----------------- */}

                        <div className="col-span-4 flex items-center px-1 sm:px-0">

                                <div className="btn" onClick={()=>setOpenSearch(!openSearch)}>
                                    <Search className=" h-5 w-5" />
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
                                <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer-1" className="btn drawer-button">
                                        <Menu/>
                                    </label>
                                </div>
                                <div className="drawer-side">
                                    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                                    <ul className="menu bg-base-200 min-h-full w-80 ">
                                        {/* Sidebar content here */}
                                        <div className="py-4 overflow-y-auto ">
                                            <ul className="space-y-2 font-medium">
                                                {/* ------ menu drawer list HOME------ */}

                                                <li>
                                                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                                                        <input type="radio" name="my-accordion-3" defaultChecked />
                                                        <div className="collapse-title font-semibold">اصلی</div>
                                                        <ul  className=" collapse-content py-2 space-y-2 bg-white px-2">
                                                            <li>
                                                                <Link href={route('home')} className="cursor-pointer ">
                                                                    خانه
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href={route('home')} className="cursor-pointer ">
                                                                    محصولات
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href={route('home.getBlogs')} className="cursor-pointer ">
                                                                    وبلاگ
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>



                                                </li>
                                                <li>
                                                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                                                        <input type="radio" name="my-accordion-3" defaultChecked />
                                                        <div className="collapse-title font-semibold">صفحات</div>
                                                            <ul  className=" collapse-content py-2 space-y-2 bg-white px-2">
                                                                <li className="py-1">
                                                                    <a
                                                                        href="#"
                                                                        title="faqpage"
                                                                        className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                    >
                                                                        سوالات متداول
                                                                    </a>{" "}
                                                                </li>
                                                                <li className="py-1">
                                                                    <a
                                                                        href="#"
                                                                        title="sitemappage"
                                                                        className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                    >
                                                                        نقشه سایت{" "}
                                                                    </a>{" "}
                                                                </li>
                                                                <li className="py-1">
                                                                    <a
                                                                        href="#"
                                                                        title="contactus"
                                                                        className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                    >
                                                                        تماس با ما
                                                                    </a>{" "}
                                                                </li>
                                                                <li className="py-1">
                                                                    <a
                                                                        href="#"
                                                                        title="bannerefectpage"
                                                                        className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                    >
                                                                        گالری تصاویر{" "}
                                                                    </a>{" "}
                                                                </li>
                                                                <li className="py-1">
                                                                    <a
                                                                        href="#"
                                                                        title="aboutus"
                                                                        className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                    >
                                                                        درباره ما
                                                                    </a>{" "}
                                                                </li>
                                                            </ul>
                                                    </div>



                                                </li>
                                                <li>
                                                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                                                        <input type="radio" name="my-accordion-3" defaultChecked />
                                                        <div className="collapse-title font-semibold">دسته بندی ها</div>
                                                        <ul  className=" collapse-content py-2 space-y-2 bg-white px-2">
                                                            <li className="py-1">
                                                                <h4 className="font-bold text-base">
                                                                    لوازم جانبی خودرو
                                                                </h4>
                                                            </li>
                                                            <li className="py-1">
                                                                <a
                                                                    href="#"
                                                                    title="securityalarms"
                                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                >
                                                                    دزدگیر و سیستم‌های امنیتی
                                                                </a>{" "}
                                                            </li>
                                                            <li className="py-1">
                                                                <a
                                                                    href="#"
                                                                    title="speakers"
                                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                >
                                                                    سیستم صوتی و بلندگوها
                                                                </a>{" "}
                                                            </li>
                                                            <li className="py-1">
                                                                <a
                                                                    href="#"
                                                                    title="gadgets"
                                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                >
                                                                    گجت‌ها و قطعات یدکی
                                                                </a>{" "}
                                                            </li>
                                                            <li className="py-1">
                                                                <a
                                                                    href="#"
                                                                    title="moreaccessories"
                                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                                >
                                                                    سایر لوازم جانبی
                                                                </a>{" "}
                                                            </li>
                                                        </ul>
                                                    </div>



                                                </li>
                                                {/* ------ menu drawer categories list------ */}
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
