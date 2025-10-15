import {DarkSwitch} from "@/components/daisy-ui/theme-switch.jsx";
import React from "react";
import {AlignJustify, ShoppingCart} from "lucide-react";
import logo from "../../../images/logo.png"
import {Link} from "@inertiajs/react";
export default function MenuHeader(props) {
    return (
        <div className="  lg:grid grid-cols-12 justify-between pt-10 z-0 gap-x-10">
            <div className="col-span-12 ">
                <ul className="flex relative items-center text-center">
                    {/* -------mega menu home------------- */}
                    <li className="bg-[#ff2d37] py-3 rounded-t-md text-white px-4 font-bold ml-2 z-40 group">
                        <Link href="#" title="home">
                            خانه
                        </Link>
                    </li>

                    <li className="bg-white py-3 rounded-t-md text-[#333333] px-4 font-bold ml-2 z-40 group hover:bg-[#ff2d37] transition duration-300 ease-in">
                        <a href="#" title="features" className="group-hover:text-white">
                            مشخصات
                        </a>
                        <div
                            className="hidden group-hover:flex flex-wrap drop-shadow-lg bg-white max-w-[900px] shadow-gray-400 absolute top-full right-0 z-40 px-2 py-4">
                            <ul>
                                <li className="flex">
                                    {/* --------mega menu pages list------ */}
                                    <ul className="px-4 xl:px-8 pt-2">
                                        <li className="relative after:absolute after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:bottom-0 after:left-0">
                                            <h4 className="text-sm xl:text-base font-bold py-3 mb-3 text-right">
                                                لیست صفحات
                                            </h4>
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="categorypage1"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه دسته اول
                                            </a>
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="categorypage2"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه دسته دوم
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="categorypage3"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه دسته سوم
                                            </a>{" "}
                                        </li>
                                    </ul>
                                    {/* ------------ mega menu product pages------ */}
                                    <ul className="px-4 xl:px-8 pt-2">
                                        <li className="relative after:absolute after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:bottom-0 after:left-0">
                                            <h4 className="text-sm xl:text-base font-bold py-3 mb-3 text-right">
                                                {" "}
                                                صفحات محصولات
                                            </h4>
                                        </li>
                                        <li className="py-1 text-sm text-right">
                                            <a
                                                href="#"
                                                title="productpage1"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه اول محصول
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="productpage2"
                                                className=" hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه دوم محصول
                                            </a>{" "}
                                        </li>
                                    </ul>
                                    {/* --------- mega menu shopping list-------- */}
                                    <ul className="px-4 xl:px-8 pt-2">
                                        <li className="relative after:absolute after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:bottom-0 after:left-0">
                                            <h4 className="text-sm xl:text-base font-bold py-3 mb-3 text-right">
                                                صفحات خرید
                                            </h4>
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="shoppingcardpage"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه سبد خرید
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="checkoutpage"
                                                className="text-sm hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه صورت حساب
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="comparepage"
                                                className="text-sm hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه مقایسه محصولات
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="wishlistpage"
                                                className="text-sm hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه علاقه مندی ها
                                            </a>{" "}
                                        </li>
                                    </ul>
                                    {/* --------- mega menu my account pages-------- */}
                                    <ul className="px-4 xl:px-8 pt-2">
                                        <li className=" relative after:absolute after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:bottom-0 after:left-0">
                                            <h4 className="text-sm xl:text-base font-bold py-3 mb-3 text-right">
                                                صفحات پروفایل شخصی
                                            </h4>
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="loginpage"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه ورود
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="registerpage"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                صفحه ثبت نام
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="myaccountpage"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                پروفایل شخصی
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="orderhistorypage"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                تاریخچه سفارشات
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="orderinfopage"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                اطلاعات سفارشات
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="productsreturnpage"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                مرجوعی ها{" "}
                                            </a>{" "}
                                        </li>
                                        <li className="py-2 text-sm text-right">
                                            <a
                                                href="#"
                                                title="giftcardpage"
                                                className="hover:text-[#ff2d37] transition duration-300 ease-in"
                                            >
                                                کارت هدیه{" "}
                                            </a>{" "}
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#ff2d37] hover:text-white transition duration-300 ease-in">
                        <a href="#" title="blog">
                            بلاگ
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
