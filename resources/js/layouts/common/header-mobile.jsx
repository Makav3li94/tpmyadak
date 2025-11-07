import React from "react";
import {ChevronDown} from "lucide-react";

export default function HeaderMobile(props) {
    return (

        <div className="w-full  bg-[#f5f5f5] lg:hidden   my-0">
            {/* ------------------------ menu categories small sceern----------------- */}
            <div class="container grid grid-cols-12 py-3 px-4">
                <a className="col-span-5 flex items-center py-2">
                    <span className="flex text-sm font-bold text-[#333333]">
                        دسته بندی ها
                        <div className="flex items-center justify-end">
                            <div>
                                <button
                                    type="button"
                                    className="col-span-1 flex items-center mr-auto py-1"
                                    data-drawer-target="drawer-navigation-categories"
                                    data-drawer-show="drawer-navigation-categories"
                                    aria-controls="drawer-navigation-categories"
                                >
                                    <ChevronDown className="px-1 text-grey-500"/>

                                </button>
                            </div>
                            <div
                                id="drawer-navigation-categories"
                                className="fixed w-64 top-0 left-0 z-40 h-screen px-4 py-6 overflow-y-auto transition-transform -translate-x-full bg-[#333333] border-b-[1px] border-gray-300"
                                tabindex="-1"
                                aria-labelledby="drawer-navigation-label"
                            >
                                {/* ------- close button----- */}
                                <button
                                    type="button"
                                    data-drawer-hide="drawer-navigation-categories"
                                    aria-controls="drawer-navigation-categories"
                                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 start-2.5 inline-flex items-center justify-center cursor-pointer dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#ffffff"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                                {/* ---------- category drawer list------- */}
                                <div className="py-4 overflow-y-auto bg-[#333333]">
                                    <ul className="space-y-2 font-medium">
                                        {/* ------ menu drawer list lightning------ */}
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-[#333333] cursor-pointer"
                                                aria-controls="dropdown-example-category"
                                                data-collapse-toggle="dropdown-example-category"
                                            >
                                                <span
                                                    className="flex-1 ms-3 text-left hover:text-[#d8330a] rtl:text-right">
                                                    روشنایی
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 640 640"
                                                    className="w-4 h-4 group-hover:fill-[#333333]"
                                                    fill="#ffffff"
                                                >
                                                    <path
                                                        d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                                                </svg>
                                            </button>
                                            <ul
                                                id="dropdown-example-category"
                                                className="hidden py-2 space-y-2 bg-white"
                                            >
                                                <ul className="p-3 text-sm">
                                                    {/* --------------APPAREL----------- */}
                                                    <li className="font-bold">
                                                        <h4 className="text-[#333333]">کاورها</h4>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="tabpcacc">
                                                            لوازم جانبی تبلت و کامپیوتر
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="ipadacc">
                                                            لوازم جانبی آیپد{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="ipadacc">
                                                            لوازم جانبی آیفون{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="tarvel">
                                                            کیف و لوازم سفر{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="security">
                                                            دزدگیر و امنیت خودرو{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="speaker">
                                                            سیستم صوتی و بلندگوهای خودرو{" "}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <h4 className="text-[#333333] mt-5 font-bold">
                                                            کابل و رابط‌ها
                                                        </h4>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="camera">
                                                            دوربین و عکاسی{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="electronics">
                                                            لوازم الکترونیکی{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="outdoor">
                                                            فضای باز و مسافرتی{" "}
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="p-3 text-sm">
                                                    <li className="font-bold">
                                                        <h4 className="text-[#333333] font-bold">
                                                            کمپینگ و کوهنوردی
                                                        </h4>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="cammping">
                                                            گوشی ها{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="hiking">
                                                            اصلاح و موزدایی{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="outdoor">
                                                            تجهیزات سالن و اسپا{" "}
                                                        </a>
                                                    </li>
                                                    <li className="font-bold">
                                                        <h4 className="text-[#333333] font-bold mt-5">
                                                            تبلت ها و گوشی های هوشمند
                                                        </h4>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="sport">
                                                            لوازم ورزشی و فضای باز{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="bath">
                                                            بهداشت و مراقبت بدن{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="gadget">
                                                            گجت‌ها و قطعات خودرو{" "}
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="p-3 text-sm">
                                                    <li className="font-bold">
                                                        <h4 className="text-[#333333] font-bold">
                                                            کیف و لوازم سفر
                                                        </h4>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="battery">
                                                            باتری و شارژر{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="headset">
                                                            هدفون و هدست{" "}
                                                        </a>
                                                    </li>
                                                    <li className="text-gray-600 hover:text-[#d8330a] transition duration-300 ease-in py-1.5">
                                                        <a href="#" title="oudiohome">
                                                            لوازم صوتی خانگی{" "}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </ul>
                                        </li>
                                        {/* ------ menu drawer list features------ */}
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-[#333333] dark:hover:bg-gray-700 cursor-pointer"
                                                aria-controls="dropdown-features"
                                                data-collapse-toggle="dropdown-features"
                                            >
                                                <span className="flex-1 ms-3 text-left rtl:text-right">
                                                    مشخصات
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 640 640"
                                                    className="w-4 h-4 group-hover:fill-[#333333]"
                                                    fill="#ffffff"
                                                >
                                                    <path
                                                        d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                                                </svg>
                                            </button>
                                            <ul
                                                id="dropdown-features"
                                                className="py-2 space-y-2 bg-white"
                                            >
                                                {/* -------- drawer menu pages list------ */}
                                                <ul className="px-3 pt-2">
                                                    <li className="py-1">
                                                        <h4 className="font-bold text-base">
                                                            لیست صفحات
                                                        </h4>
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="categorypage1"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه دسته اول
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="categorypage2"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه دسته دوم
                                                        </a>{" "}
                                                    </li>
                                                </ul>
                                                {/* ------------ drawer menu product pages------ */}
                                                <ul className="px-3 pt-2">
                                                    <li className="py-1">
                                                        <h4 className="font-bold text-base">
                                                            {" "}
                                                            صفحات محصولات
                                                        </h4>
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="productpage1"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه اول محصول
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="productpage2"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه دوم محصول
                                                        </a>{" "}
                                                    </li>
                                                </ul>
                                                {/* --------- drawer menu shopping list-------- */}
                                                <ul className="px-3 pt-2">
                                                    <li className="py-1">
                                                        <h4 className="font-bold text-base">
                                                            صفحات خرید
                                                        </h4>
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="shoppingcardpage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه سبد خرید
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="checkoutpage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه صورت حساب
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="comparepage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه مقایسه محصولات
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="wishlistpage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه علاقه مندی ها
                                                        </a>{" "}
                                                    </li>
                                                </ul>
                                                {/* --------- drawer my account pages-------- */}

                                                <ul className="px-3 pt-2">
                                                    <li className="py-1">
                                                        <h4 className="font-bold text-base">
                                                            صفحات پروفایل شخصی
                                                        </h4>
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="loginpage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه ورود
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="registerpage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            صفحه ثبت نام
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="myaccountpage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            پروفایل شخصی
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="orderhistorypage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            تاریخچه سفارشات
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="orderinfopage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            اطلاعات سفارشات
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="productsreturnpage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            مرجوعی ها{" "}
                                                        </a>{" "}
                                                    </li>
                                                    <li className="py-1">
                                                        <a
                                                            href="#"
                                                            title="giftcardpage"
                                                            className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                        >
                                                            کارت هدیه{" "}
                                                        </a>{" "}
                                                    </li>
                                                </ul>
                                            </ul>
                                        </li>
                                        {/* ------ menu drawer list main pages------ */}
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-[#333333] dark:hover:bg-gray-700 cursor-pointer"
                                                aria-controls="dropdown-pages"
                                                data-collapse-toggle="dropdown-pages"
                                            >
                                                <span className="flex-1 ms-3 text-left rtl:text-right">
                                                    صفحات مهم
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 640 640"
                                                    className="w-4 h-4 group-hover:fill-[#333333]"
                                                    fill="#ffffff"
                                                >
                                                    <path
                                                        d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                                                </svg>
                                            </button>
                                            <ul
                                                id="dropdown-pages"
                                                className="py-2 space-y-2 bg-white px-2"
                                            >
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
                                        </li>
                                        {/* ------ menu drawer categories list------ */}
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-[#333333] dark:hover:bg-gray-700 cursor-pointer"
                                                aria-controls="dropdown-categories"
                                                data-collapse-toggle="dropdown-categories"
                                            >
                                                <span className="flex-1 ms-3 text-left rtl:text-right">
                                                    دسته بندی ها{" "}
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 640 640"
                                                    className="w-4 h-4 group-hover:fill-[#333333]"
                                                    fill="#ffffff"
                                                >
                                                    <path
                                                        d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                                                </svg>
                                            </button>
                                            <ul
                                                id="dropdown-categories"
                                                className="py-2 space-y-2 bg-white"
                                            >
                                                {/* -------- drawer menu sub-categories------ */}
                                                <ul>
                                                    <li>
                                                        <a href="#" title="categories01">
                                                            <img
                                                                src="./src/assets/image/categories01.jpg"
                                                                alt="categories01"
                                                                className="mx-auto"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" title="categories02">
                                                            <img
                                                                src="./src/assets/image/categories02.jpg"
                                                                alt="categories02"
                                                                className="mx-auto"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" title="categories03">
                                                            <img
                                                                src="./src/assets/image/categories03.jpg"
                                                                alt="categories03"
                                                                className="mx-auto"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" title="categories04">
                                                            <img
                                                                src="./src/assets/image/categories04.jpg"
                                                                alt="categories04"
                                                                className="mx-auto"
                                                            />
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="px-3 pt-2">
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
                                                {/* -------- drawer menu pages sub-categories------ */}
                                                <ul className="px-3 pt-2">
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

                                                {/* -------- drawer menu pages sub-categories------ */}
                                                <ul className="px-3 pt-2">
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

                                                {/* -------- drawer menu pages sub-categories------ */}
                                                <ul className="px-3 pt-2">
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
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </span>
                </a>
                {/* ------------------------ shopping basket small screen----------------- */}

                <div className="col-span-5 flex items-center px-1 sm:px-0">
                    <a
                        href="#"
                        title="shoppingCard"
                        className="w-fit flex border-[1.5px] border-gray-300 rounded-md items-center ml-0 mr-auto px-1 sm:px-2 relative z-10 group"
                    >
                        <div
                            className="relative after:content-[''] md:after:absolute md:after:bg-gray-300 after:h-[100%] after:w-[2px] after:top-1/2 after:-translate-y-1/2 after:right-[30px] py-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                fill="#282828"
                                width="24px"
                            >
                                <path
                                    d="M320 64C326.6 64 332.9 66.7 337.4 71.5L481.4 223.5L481.9 224L560 224C577.7 224 592 238.3 592 256C592 270.5 582.4 282.7 569.2 286.7L523.1 493.9C516.6 523.2 490.6 544 460.6 544L179.3 544C149.3 544 123.3 523.2 116.8 493.9L70.8 286.7C57.6 282.8 48 270.5 48 256C48 238.3 62.3 224 80 224L158.1 224L158.6 223.5L302.6 71.5C307.1 66.7 313.4 64 320 64zM320 122.9L224.2 224L415.8 224L320 122.9zM240 328C240 314.7 229.3 304 216 304C202.7 304 192 314.7 192 328L192 440C192 453.3 202.7 464 216 464C229.3 464 240 453.3 240 440L240 328zM320 304C306.7 304 296 314.7 296 328L296 440C296 453.3 306.7 464 320 464C333.3 464 344 453.3 344 440L344 328C344 314.7 333.3 304 320 304zM448 328C448 314.7 437.3 304 424 304C410.7 304 400 314.7 400 328L400 440C400 453.3 410.7 464 424 464C437.3 464 448 453.3 448 440L448 328z"/>
                            </svg>
                        </div>
                        <span className="hidden md:flex text-[#282828] tracking-[0.5px] pr-4 pl-1 py-2">
                            سبد خرید
                        </span>
                        <span className="hidden md:flex text-[#d8330a] font-bold py-2">
                            ۲۸۸,۰۰۰ تومان
                        </span>
                        {/* ------------------------ dropdown shopping basket md----------------- */}
                        <div
                            className="hidden sm:w-max border-1 border-gray-300 group-hover:block absolute top-full right-auto translate-x-2 z-30 mt-1 py-2 -left-20">
                            {/* ------------------------ dropdown shopping basket first product md----------------- */}

                            <div
                                className="flex items-center text-gray-600 justify-between pt-3 pb-4 border-b border-gray-300 px-2">
                                <a href="#" title="product01">
                                    <img
                                        src="./src/assets/image/selectedproduct02.jpg"
                                        alt="محصول انتخابی"
                                        className="w-[52px] h-[52px]"
                                    />
                                </a>
                                <span
                                    className="text-xs sm:text-sm text-gray-500 hover:text-[#d8330a] transition duration-300 ease-in pr-2 pl-3">
                                    تایر درجه یک خارجی
                                </span>
                                <span className="text-xs sm:text-base text-gray-500 px-2">
                                    x۱
                                </span>
                                <span className="text-xs sm:text-base text-gray-500 pr-2 pl-5">
                                    ۵۰۰,۰۰۰ تومان
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    width="14px"
                                    fill="#b1b5bb"
                                    className="hover:fill-[#d8330a] transition duration-300 ease-in"
                                >
                                    <path
                                        d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/>
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    width="18px"
                                    fill="#b1b5bb"
                                    className="hover:fill-[#d8330a] ml-0 mr-auto transition duration-300 ease-in"
                                >
                                    <path
                                        d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
                                </svg>
                            </div>
                            {/* ------------------------ dropdown shopping basket second product md----------------- */}
                            <div
                                className="flex w-max items-center text-gray-600 justify-between pt-3 pb-4 border-b border-gray-300 px-2">
                                <a href="#" title="product01">
                                    <img
                                        src="./src/assets/image/selectedproduct01.jpg"
                                        alt="محصول انتخابی"
                                        className="w-[52px] h-[52px]"
                                    />
                                </a>
                                <span
                                    className="text-xs sm:text-sm text-gray-500 hover:text-[#d8330a] transition duration-300 ease-in pr-2 pl-3">
                                    جعبه فرمان اورجینال{" "}
                                </span>
                                <span className="text-xs sm:text-base text-gray-500 px-2">
                                    x۱
                                </span>
                                <span className="text-xs sm:text-base text-gray-500 pr-2 pl-5">
                                    ۸۰۰,۰۰۰ تومان
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    width="14px"
                                    fill="#b1b5bb"
                                    className="hover:fill-[#d8330a] transition duration-300 ease-in"
                                >
                                    <path
                                        d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/>
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    width="18px"
                                    fill="#b1b5bb"
                                    className="hover:fill-[#d8330a] ml-0 mr-auto transition duration-300 ease-in"
                                >
                                    <path
                                        d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
                                </svg>
                            </div>
                            {/* ------dropdown shopping basket details prices md--------------- */}
                            <div
                                className="flex justify-between text-sm sm:text-base px-3 py-2 border-b border-gray-300">
                                <span className="font-extrabold text-[14px] text-gray-600">
                                    جمع جز
                                </span>
                                <span className="t text-gray-500">۱,۳۰۰،۰۰۰ تومان</span>
                            </div>
                            <div
                                className="flex justify-between text-sm sm:text-base px-3 py-2 border-b border-gray-300">
                                <span className="font-extrabold text-[14px] text-gray-600">
                                    تخفیف
                                </span>
                                <span className="text-gray-500">۱۰۰،۰۰۰ تومان</span>
                            </div>
                            <div
                                className="flex justify-between text-sm sm:text-base px-3 py-2 border-b border-gray-300">
                                <span className="font-extrabold text-[14px] text-gray-600">
                                    عوارض محیط زیست
                                </span>
                                <span className="text-gray-500">۲۰۰،۰۰۰ تومان</span>
                            </div>
                            <div
                                className="flex justify-between text-sm sm:text-base px-3 py-2 border-b border-gray-300">
                                <span className="font-extrabold text-[14px] text-gray-600">
                                    مالیات بر ارزش افزوده
                                </span>
                                <span className="text-gray-500">۳۰،۰۰۰ تومان</span>
                            </div>
                            <div
                                className="flex justify-between text-sm sm:text-base px-3 py-2 border-b border-gray-300">
                                <span className="font-extrabold text-[14px] text-gray-600">
                                    جمع کل
                                </span>
                                <span className="text-gray-500">۳۰،۰۰۰ تومان</span>
                            </div>
                            <div className="flex justify-between text-sm sm:text-base px-3 py-2">
                                <a
                                    href="#"
                                    title="viewcard"
                                    className="flex text-gray-400 group"
                                >
                                    <span className="text-sm sm:text-base hover:text-[#d8330a]">
                                        مشاهده سبد
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640"
                                        width="16px"
                                        fill="#9ca3af"
                                        className="group-hover:fill-[#d8330a]"
                                    >
                                        <path
                                            d="M416.5 88L416.5 160L352.5 160C273 160 208.5 224.5 208.5 304C208.5 397.4 291.3 438.8 309.1 446.6C311.3 447.6 313.7 448 316.2 448L318.7 448C328.5 448 336.5 440 336.5 430.2C336.5 421.9 330.6 414.7 323.7 409.9C314.8 403.7 304.5 391.7 304.5 369.4C304.5 324.4 341 287.9 386 287.9L416.5 287.9L416.5 359.9C416.5 369.6 422.3 378.4 431.3 382.1C440.3 385.8 450.6 383.8 457.5 376.9L593.5 240.9C602.9 231.5 602.9 216.3 593.5 207L457.5 71C450.6 64.1 440.3 62.1 431.3 65.8C422.3 69.5 416.5 78.3 416.5 88zM144.5 160C100.3 160 64.5 195.8 64.5 240L64.5 496C64.5 540.2 100.3 576 144.5 576L400.5 576C444.7 576 480.5 540.2 480.5 496L480.5 464C480.5 446.3 466.2 432 448.5 432C430.8 432 416.5 446.3 416.5 464L416.5 496C416.5 504.8 409.3 512 400.5 512L144.5 512C135.7 512 128.5 504.8 128.5 496L128.5 240C128.5 231.2 135.7 224 144.5 224L160.5 224C178.2 224 192.5 209.7 192.5 192C192.5 174.3 178.2 160 160.5 160L144.5 160z"/>
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    title="checkout"
                                    className="flex text-gray-400 group"
                                >
                                    <span className="text-sm sm:text-base hover:text-[#d8330a]">
                                        تکمیل خرید
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640"
                                        width="16px"
                                        fill="#9ca3af"
                                        className="group-hover:fill-[#d8330a]"
                                    >
                                        <path
                                            d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </a>
                </div>
                <a href="#" title="" className="w-fit col-span-1 flex items-center ml-0 mr-auto py-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        fill="#282828"
                        width="24px"
                    >
                        <path
                            d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
                    </svg>
                </a>
                {/* -------- menu drawer small sceern----- */}
                <div className="flex items-center justify-end">
                    <div>
                        <button
                            type="button"
                            className="col-span-1 flex items-center mr-auto py-1"
                            data-drawer-target="drawer-navigation"
                            data-drawer-show="drawer-navigation"
                            aria-controls="drawer-navigation"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                width="32px"
                                fill="#333333"
                                className="px-1"
                            >
                                <path
                                    d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/>
                            </svg>
                        </button>
                    </div>
                    <div
                        id="drawer-navigation"
                        className="fixed w-64 top-0 left-0 z-40 h-screen px-4 py-6 overflow-y-auto transition-transform -translate-x-full bg-[#333333] border-b-[1px] border-gray-300"
                        tabindex="-1"
                        aria-labelledby="drawer-navigation-label"
                    >
                        {/* ------- close button----- */}
                        <button
                            type="button"
                            data-drawer-hide="drawer-navigation"
                            aria-controls="drawer-navigation"
                            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 start-2.5 inline-flex items-center justify-center cursor-pointer dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#ffffff"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                        {/* ---------- menu drawer list------- */}
                        <div className="py-4 overflow-y-auto bg-[#333333]">
                            <ul className="space-y-2 font-medium">
                                {/* ------ menu drawer list HOME------ */}
                                <li>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-[#333333] cursor-pointer"
                                        aria-controls="dropdown-example"
                                        data-collapse-toggle="dropdown-example"
                                    >
                                        <span className="flex-1 ms-3 text-left hover:text-[#d8330a] rtl:text-right">
                                            خانه
                                        </span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="w-4 h-4 group-hover:fill-[#333333]"
                                            fill="#ffffff"
                                        >
                                            <path
                                                d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                                        </svg>
                                    </button>
                                    <ul
                                        id="dropdown-example"
                                        className="hidden py-2 space-y-2 bg-white"
                                    >
                                        <li>
                                            <a href="#" title="homepagedefault">
                                                <img
                                                    src="./src/assets/image/homepagedefault.jpg"
                                                    alt="homepagedefault"
                                                    className="mx-auto"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="homepagelayout02">
                                                <img
                                                    src="./src/assets/image/home2.jpg"
                                                    alt="homepagelayout02"
                                                    className="mx-auto"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="homepagelayout03">
                                                <img
                                                    src="./src/assets/image/homepagelayout03.jpg"
                                                    alt="homepagelayout03"
                                                    className="mx-auto"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="homepagelayout04">
                                                <img
                                                    src="./src/assets/image/homepagelayout4.jpg"
                                                    alt="homepagelayout04"
                                                    className="mx-auto"
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* ------ menu drawer list features------ */}
                                <li>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-[#333333] dark:hover:bg-gray-700 cursor-pointer"
                                        aria-controls="dropdown-features"
                                        data-collapse-toggle="dropdown-features"
                                    >
                                        <span className="flex-1 ms-3 text-left rtl:text-right">
                                            مشخصات
                                        </span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="w-4 h-4 group-hover:fill-[#333333]"
                                            fill="#ffffff"
                                        >
                                            <path
                                                d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                                        </svg>
                                    </button>
                                    <ul
                                        id="dropdown-features"
                                        className="py-2 space-y-2 bg-white"
                                    >
                                        {/* -------- drawer menu pages list------ */}
                                        <ul className="px-3 pt-2">
                                            <li className="py-1">
                                                <h4 className="font-bold text-base">لیست صفحات</h4>
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="categorypage1"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه دسته اول
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="categorypage2"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه دسته دوم
                                                </a>{" "}
                                            </li>
                                        </ul>
                                        {/* ------------ drawer menu product pages------ */}
                                        <ul className="px-3 pt-2">
                                            <li className="py-1">
                                                <h4 className="font-bold text-base">
                                                    {" "}
                                                    صفحات محصولات
                                                </h4>
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="productpage1"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه اول محصول
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="productpage2"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه دوم محصول
                                                </a>{" "}
                                            </li>
                                        </ul>
                                        {/* --------- drawer menu shopping list-------- */}
                                        <ul className="px-3 pt-2">
                                            <li className="py-1">
                                                <h4 className="font-bold text-base">صفحات خرید</h4>
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="shoppingcardpage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه سبد خرید
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="checkoutpage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه صورت حساب
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="comparepage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه مقایسه محصولات
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="wishlistpage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه علاقه مندی ها
                                                </a>{" "}
                                            </li>
                                        </ul>
                                        {/* --------- drawer my account pages-------- */}

                                        <ul className="px-3 pt-2">
                                            <li className="py-1">
                                                <h4 className="font-bold text-base">
                                                    صفحات پروفایل شخصی
                                                </h4>
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="loginpage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه ورود
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="registerpage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    صفحه ثبت نام
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="myaccountpage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    پروفایل شخصی
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="orderhistorypage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    تاریخچه سفارشات
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="orderinfopage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    اطلاعات سفارشات
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="productsreturnpage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    مرجوعی ها{" "}
                                                </a>{" "}
                                            </li>
                                            <li className="py-1">
                                                <a
                                                    href="#"
                                                    title="giftcardpage"
                                                    className="text-sm hover:text-[#d8330a] transition duration-300 ease-in"
                                                >
                                                    کارت هدیه{" "}
                                                </a>{" "}
                                            </li>
                                        </ul>
                                    </ul>
                                </li>
                                {/* ------ menu drawer list main pages------ */}
                                <li>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-[#333333] dark:hover:bg-gray-700 cursor-pointer"
                                        aria-controls="dropdown-pages"
                                        data-collapse-toggle="dropdown-pages"
                                    >
                                        <span className="flex-1 ms-3 text-left rtl:text-right">
                                            صفحات مهم
                                        </span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="w-4 h-4 group-hover:fill-[#333333]"
                                            fill="#ffffff"
                                        >
                                            <path
                                                d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                                        </svg>
                                    </button>
                                    <ul
                                        id="dropdown-pages"
                                        className="py-2 space-y-2 bg-white px-2"
                                    >
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
                                </li>
                                {/* ------ menu drawer categories list------ */}
                                <li>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-[#333333] dark:hover:bg-gray-700 cursor-pointer"
                                        aria-controls="dropdown-categories"
                                        data-collapse-toggle="dropdown-categories"
                                    >
                                        <span className="flex-1 ms-3 text-left rtl:text-right">
                                            دسته بندی ها{" "}
                                        </span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="w-4 h-4 group-hover:fill-[#333333]"
                                            fill="#ffffff"
                                        >
                                            <path
                                                d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                                        </svg>
                                    </button>
                                    <ul
                                        id="dropdown-categories"
                                        className="py-2 space-y-2 bg-white"
                                    >
                                        {/* -------- drawer menu sub-categories------ */}
                                        <ul>
                                            <li>
                                                <a href="#" title="categories01">
                                                    <img
                                                        src="./src/assets/image/categories01.jpg"
                                                        alt="categories01"
                                                        className="mx-auto"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="categories02">
                                                    <img
                                                        src="./src/assets/image/categories02.jpg"
                                                        alt="categories02"
                                                        className="mx-auto"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="categories03">
                                                    <img
                                                        src="./src/assets/image/categories03.jpg"
                                                        alt="categories03"
                                                        className="mx-auto"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="categories04">
                                                    <img
                                                        src="./src/assets/image/categories04.jpg"
                                                        alt="categories04"
                                                        className="mx-auto"
                                                    />
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="px-3 pt-2">
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
                                        {/* -------- drawer menu pages sub-categories------ */}
                                        <ul className="px-3 pt-2">
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

                                        {/* -------- drawer menu pages sub-categories------ */}
                                        <ul className="px-3 pt-2">
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

                                        {/* -------- drawer menu pages sub-categories------ */}
                                        <ul className="px-3 pt-2">
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
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
