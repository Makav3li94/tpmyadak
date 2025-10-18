import {DarkSwitch} from "@/components/daisy-ui/theme-switch.jsx";
import React from "react";
import {ShoppingCart, Search, Plus, Minus} from "lucide-react";
import logo from "../../../images/logo.png"
import {Link} from "@inertiajs/react";
import HeaderMobile from "@/layouts/common/header-mobile.jsx";
import {useCart} from "react-use-cart";
import {Button} from "@/components/index/index.js";
import SearchBar from "@/components/common/search-bar.jsx";

export default function Header(props) {
    const {
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        isEmpty,
    } = useCart();
    return (
        <header>
            <div className="container">
                <div className="grid grid-cols-12 py-6 items-center">
                    <div className="hidden lg:flex lg:col-span-4">

                        <div
                            title="shoppingCard"
                            className="flex border-[1.5px] relative border-gray-300 rounded-md px-2 group hover:drop-shadow-2xl hover:drop-shadow-gray-300 hover:shadow-lg hover:shadow-gray-300 z-50 "
                        >
                            <div
                                className="relative after:content-[''] after:absolute after:bg-gray-300 after:h-[100%] after:w-[2px] after:top-1/2 after:-translate-y-1/2 after:right-[30px] py-2">
                                <div className="indicator">
                                    <span className="indicator-item badge badge-secondary ">{totalUniqueItems}</span>
                                    <ShoppingCart className="w-6 h-6 "/>
                                </div>

                            </div>
                            <span className=" tracking-[0.5px] px-3 py-2">
                                سبد خرید
                            </span>
                            <span className="text-[#ff2d37] font-bold py-2">
                                ۲۸۸,۰۰۰ تومان
                            </span>
                            {/* ------------ drop down shopping basket big screen------------ */}

                            <div className="hidden border-1 border-gray-300 group-hover:block w-[180%]
                                absolute top-full right-2 translate-x-2 z-50 mt-1 py-2 bg-white">
                                {items.map((item, index) => (
                                    <div className="flex items-center text-gray-600 justify-between
                                         pt-3 pb-4 border-b border-gray-300 px-3" key={index}>
                                        <span
                                            className="flex-1 w-full  text-sm text-gray-500 hover:text-[#ff2d37] transition duration-300 ease-in pr-2 pl-3">
                                            {item.title}
                                        </span>
                                        <Link href="#" title="product01">
                                            <img src={route('file.show', item.image)} alt="محصول انتخابی"
                                                 className="w-52 "/>
                                        </Link>

                                        <span className="text-gray-500 px-2">{item.quantity + ' عدد'} </span>
                                        <span className="text-gray-500 pr-2 pl-5  ">
                                            {parseInt(item.price).toLocaleString('en')} تومان
                                        </span>
                                        <div className="inline-flex">
                                            <ul className="action flex items-center list-unstyled justify-center gap-3 ">
                                                <li className="edit">
                                                    <Button type='success' className="btn-xs"
                                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="fs-6_5  align-middle "/>
                                                    </Button>
                                                </li>

                                                <li className="edit">
                                                    {parseInt(item.quantity).toLocaleString('en')}
                                                </li>
                                                <li className="edit">
                                                    <Button type='warning' className="btn-xs"
                                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="fs-6_5  align-middle "/>
                                                    </Button>
                                                </li>

                                            </ul>
                                        </div>

                                    </div>
                                ))}


                                <div className="flex justify-between px-3 py-2">
                                    <span className="text-[#ff2d37] font-bold py-2">
                                        مبلغ کل: {cartTotal} تومان
                                    </span>
                                    <Button type='success' className="text-base hover:text-[#ff2d37]" title="checkout">
                                        تکمیل خرید

                                    </Button>
                                </div>
                            </div>
                        </div>

                        <DarkSwitch/>
                    </div>
                    {/* ---------- search bar big screen------------- */}
                    <SearchBar/>

                    {/* ------------- logo ----------------- */}
                    <Link href={route('home')}
                          className="w-[150px] sm:w-[200px] flex col-span-12 lg:col-span-2 h-auto   text-left ">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
            </div>
            {/* ------------------------ menu small screen----------------- */}
            <HeaderMobile/>
        </header>
    )
}
