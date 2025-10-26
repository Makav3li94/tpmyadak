import {AlignJustify} from "lucide-react";
import {Link} from "@inertiajs/react";
import Slider from "@/pages/main/welcome/partials/slider.jsx";
import {ChevronLeft} from "lucide-react";

export default function Category({sliders}) {
    return (
        <section className="bg-base-100 w-full flex justify-center pb-12">
            <div className="container   ">
            <div className="  hidden lg:grid grid-cols-12 justify-between  z-0 gap-x-10">
                <div className="lg:col-span-3 lg:flex bg-[#ff2d37] rounded-t-md px-5 py-3 text-center justify-between">
                    <span className="text-white">تمام دسته بندی ها</span>
                    <AlignJustify className="w-6 h-6 text-white"/>

                </div>
                <div className="lg:col-span-9 lg:col-start-4">
                    <ul className="flex relative items-center text-center">
                        {/* -------mega menu home------------- */}
                        <li className="bg-[#ff2d37] py-3 rounded-t-md text-white px-4 font-bold ml-2 z-40 group">
                            <Link href="#" title="home">
                                خانه
                            </Link>
                        </li>

                        <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#ff2d37] hover:text-white transition duration-300 ease-in">
                            <Link href={route('home.getProducts')} title="products">
                                محصولات
                            </Link>
                        </li>
                        <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#ff2d37] hover:text-white transition duration-300 ease-in">
                            <Link href={route('home.getBlogs')} title="blog">
                                بلاگ
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full border-b-2 border-[#ff2d37]"></div>
            {/* ------- menu right side big screen------- */}

            {/* --------sub menu right categories---------- */}
            <div className="overflow-hidden w-full flex">
                <div className="grid grid-cols-12 justify-between relative gap-x-10">
                    <div className="hidden lg:flex lg:col-span-3 bg-base-100 shadow-lg shadow-gray-400">
                        <ul className="relative z-20 w-full">
                            {/* --------------- lightning category--------- */}
                            <li className="group hover:bg-[#ff2d37] transition duration-300 ease-in px-5 relative">
                                <div
                                   className="flex justify-between text-center items-center py-3 border-b curser-pointer
                                    border-gray-300 hover:border-[#ff2d37] z-10">
                                    <div className=" text-sm group-hover:text-gray-50">
                                        روشنایی
                                    </div>
                                    <ChevronLeft className="w-3 h-3 group-hover:fill-[white]"/>

                                </div>
                                {/* -------------sub menu lightning------------- */}
                                <div
                                    className="hidden group-hover:flex w-[650px] drop-shadow-lg bg-white shadow-gray-400 absolute top-0 xl:-right-[60px] md:-right-[100px] -translate-x-1/2  p-5 z-10">
                                    {/*className="hidden group-hover:flex drop-shadow-lg bg-white shadow-gray-400 absolute top-0 -translate-x-1/2 -left-[280px] p-5">*/}
                                    <ul className="p-3 text-sm">
                                        {/* --------------APPAREL----------- */}
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

                        </ul>
                    </div>
                    <Slider sliders={sliders}/>
                </div>
            </div>
            </div>
        </section>
    )
}
