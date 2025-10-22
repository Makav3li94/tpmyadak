import {
    ChevronLeft,
    House,
    Menu,
} from "lucide-react";
import {Link} from "@inertiajs/react";
export default function HeaderSingle() {

    return (
        <section className="w-full container justify-center">
            <div className=" hidden lg:grid grid-cols-12 justify-between pt-10 z-0 gap-x-10">
                {/* --------- all categories right side------- */}
                <div className="lg:col-span-3">
                    <div
                        className="font-semibold group/main relative bg-gray-400 text-base-100 rounded-t-md py-3 px-7 flex justify-between cursor-pointer">
                        <span>تمامی دسته بندی ها</span>
                        <Menu size={20}/>
                        <div
                            className="hidden w-full bg-base-100 group-hover/main:block absolute top-full z-30 right-0">
                            <ul>
                                {/* --------light main----- */}
                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group border-[1px] border-b-gray-300">
                                    <a
                                        href="#"
                                        title="light"
                                        className="flex justify-between items-center"
                                    >
                                        <span>روشنایی</span>
                                        <ChevronLeft size={16} color="#878787"/>
                                    </a>
                                    <div
                                        className="hidden group-hover:flex justify-between gap-x-10 drop-shadow-lg bg-white shadow-gray-400 absolute top-0 translate-x-0 right-full translate-y-0 p-5 w-[700px]">
                                        <ul className="p-3 text-sm">
                                            {/* --------------APPAREL----------- */}
                                            <li className="font-bold ">
                                                <h4 className="text-[#333333]">کاورها</h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5 font-light">
                                                <a href="#" title="tabpcacc">
                                                    لوازم جانبی تبلت و کامپیوتر
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="ipadacc">
                                                    لوازم جانبی آیپد{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="ipadacc">
                                                    لوازم جانبی آیفون{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="tarvel">
                                                    کیف و لوازم سفر{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="security">
                                                    دزدگیر و امنیت خودرو{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="speaker">
                                                    سیستم صوتی و بلندگوهای خودرو{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <h4 className="text-[#333333] mt-5 font-bold">
                                                    کابل و رابط‌ها
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="camera">
                                                    دوربین و عکاسی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="electronics">
                                                    لوازم الکترونیکی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
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
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="cammping">
                                                    گوشی ها{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="hiking">
                                                    اصلاح و موزدایی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="outdoor">
                                                    تجهیزات سالن و اسپا{" "}
                                                </a>
                                            </li>
                                            <li className="font-bold">
                                                <h4 className="text-[#333333] font-bold mt-5">
                                                    تبلت ها و گوشی های هوشمند
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="sport">
                                                    لوازم ورزشی و فضای باز{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="bath">
                                                    بهداشت و مراقبت بدن{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
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
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="battery">
                                                    باتری و شارژر{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="headset">
                                                    هدفون و هدست{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="oudiohome">
                                                    لوازم صوتی خانگی{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* --------oil. fluid main----- */}
                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] border-[1px] border-b-gray-300">
                                    <a
                                        href="#"
                                        title="light"
                                        className="flex justify-between items-center"
                                    >
                                        <span>روغن مایع</span>
                                    </a>
                                </li>
                                {/* --------smart devices main----- */}
                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group border-[1px] border-b-gray-300">
                                    <a
                                        href="#"
                                        title="light"
                                        className="flex justify-between items-center"
                                    >
                                        <span>تجهیزات هوشمند</span>
                                        <ChevronLeft size={16} color="#878787"/>
                                    </a>
                                    <div
                                        className="hidden group-hover:flex justify-between gap-x-5 drop-shadow-lg bg-white shadow-gray-400 absolute top-0 translate-x-0 right-full translate-y-0 p-5 w-[350px]">
                                        <ul className="p-3 text-sm">
                                            {/* --------------smartphone----------- */}
                                            <li className="font-bold">
                                                <h4 className="text-[#333333]">کاورها</h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="tabpcacc">
                                                    متن ساختگی
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="ipadacc">
                                                    اسکنر{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="ipadacc">
                                                    لوازم اپل{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="tarvel">
                                                    لوازم دل{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="security">
                                                    متن ساختگی{" "}
                                                </a>
                                            </li>

                                            <li>
                                                <h4 className="text-[#333333] mt-5 font-bold">
                                                    لوازم الکترونیکی{" "}
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="camera">
                                                    متن ساختگیی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="electronics">
                                                    متن ساختگی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="outdoor">
                                                    متن ساخگتی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="outdoor">
                                                    مانیتورها{" "}
                                                </a>
                                            </li>
                                        </ul>
                                        <img
                                            src="./src/assets/image/vbanner1.png"
                                            alt="vbanner"
                                            className="w-[164px] h-[303px] pt-5 px-4"
                                        />
                                    </div>
                                </li>
                                {/* -------replecment part main-----------------/ */}
                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group border-[1px] border-b-gray-300">
                                    <a
                                        href="#"
                                        title="light"
                                        className="flex justify-between items-center"
                                    >
                                        <span className="text-[#333333] text-sm group-hover:text-white">
                                            لوازم یدکی{" "}
                                        </span>
                                        <ChevronLeft size={16} color="#878787"/>
                                    </a>
                                    <div
                                        className="hidden group-hover:flex justify-between gap-x-10 drop-shadow-lg bg-white shadow-gray-400 absolute top-0 translate-x-0 right-full translate-y-0 p-5 w-[700px]">
                                        <ul className="p-3 text-sm">
                                            {/* --------------APPAREL----------- */}
                                            <li className="font-bold ">
                                                <h4 className="text-[#333333]">کاورها</h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5 font-light">
                                                <a href="#" title="tabpcacc">
                                                    لوازم جانبی تبلت و کامپیوتر
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="ipadacc">
                                                    لوازم جانبی آیپد{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="ipadacc">
                                                    لوازم جانبی آیفون{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="tarvel">
                                                    کیف و لوازم سفر{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="security">
                                                    دزدگیر و امنیت خودرو{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="speaker">
                                                    سیستم صوتی و بلندگوهای خودرو{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <h4 className="text-[#333333] mt-5 font-bold">
                                                    کابل و رابط‌ها
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="camera">
                                                    دوربین و عکاسی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="electronics">
                                                    لوازم الکترونیکی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
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
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="cammping">
                                                    گوشی ها{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="hiking">
                                                    اصلاح و موزدایی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="outdoor">
                                                    تجهیزات سالن و اسپا{" "}
                                                </a>
                                            </li>
                                            <li className="font-bold">
                                                <h4 className="text-[#333333] font-bold mt-5">
                                                    تبلت ها و گوشی های هوشمند
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="sport">
                                                    لوازم ورزشی و فضای باز{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="bath">
                                                    بهداشت و مراقبت بدن{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
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
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="battery">
                                                    باتری و شارژر{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="headset">
                                                    هدفون و هدست{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="oudiohome">
                                                    لوازم صوتی خانگی{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* -------paint art main------ */}
                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group border-[1px] border-b-gray-300">
                                    <a
                                        href="#"
                                        title="light"
                                        className="flex justify-between items-center"
                                    >
                                        <span className="text-[#333333] text-sm group-hover:text-white">
                                            لوازم رنگ و بدنه{" "}
                                        </span>
                                        <ChevronLeft size={16} color="#878787"/>
                                    </a>
                                    {/* -------------sub menu paint art------------- */}
                                    <div
                                        className="hidden group-hover:flex justify-between gap-x-5 drop-shadow-lg bg-white shadow-gray-400 absolute top-0 translate-x-0 right-full translate-y-0 p-5 w-[650px]">
                                        <ul className="p-3 text-sm">
                                            <li className="font-bold">
                                                <h4 className="text-[#333333]">کاورها</h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="tabpcacc">
                                                    لوازم جانبی تبلت و کامپیوتر
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="ipadacc">
                                                    لوازم جانبی آیپد{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="ipadacc">
                                                    لوازم جانبی آیفون{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="tarvel">
                                                    کیف و لوازم سفر{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="security">
                                                    دزدگیر و امنیت خودرو{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="speaker">
                                                    سیستم صوتی و بلندگوهای خودرو{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <h4 className="text-[#333333] mt-5 font-bold">
                                                    کابل و رابط‌ها
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="camera">
                                                    دوربین و عکاسی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="electronics">
                                                    لوازم الکترونیکی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
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
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="cammping">
                                                    گوشی ها{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="hiking">
                                                    اصلاح و موزدایی{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="outdoor">
                                                    تجهیزات سالن و اسپا{" "}
                                                </a>
                                            </li>
                                            <li className="font-bold">
                                                <h4 className="text-[#333333] font-bold mt-5">
                                                    تبلت ها و گوشی های هوشمند
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="sport">
                                                    لوازم ورزشی و فضای باز{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="bath">
                                                    بهداشت و مراقبت بدن{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
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
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="battery">
                                                    باتری و شارژر{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="headset">
                                                    هدفون و هدست{" "}
                                                </a>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <a href="#" title="oudiohome">
                                                    لوازم صوتی خانگی{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/*------- part replecment main---------- */}
                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group border-[1px] border-b-gray-300">
                                    <a
                                        href="#"
                                        title="light"
                                        className="flex justify-between items-center"
                                    >
                                        {" "}
                                        <span>لوازم جانبی</span>
                                    </a>
                                </li>
                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group border-[1px] border-b-gray-300">
                                    <a href="#" title="light">
                                        <span>لاستیک و تایر</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-9 lg:col-start-4">

                    <ul className="flex relative items-center text-center bg-base-100">
                        <li className="bg-[#ff2d37] py-3 rounded-t-md text-white px-4 font-bold ml-2 z-40 group">
                            <Link href={route('home')} title="home">
                                خانه
                            </Link>
                        </li>

                        <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#ff2d37] hover:text-white transition duration-300 ease-in">
                            <Link href={route('home.getProducts')} title="products">
                                محصولات
                            </Link>
                        </li>
                        <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#ff2d37] hover:text-white transition duration-300 ease-in">
                            <a href="#" title="blog">
                                بلاگ
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full border-b-2 border-[#ff2d37]"></div>
            {/* --------------breadcrumb------------------- */}

        </section>
    )
}
