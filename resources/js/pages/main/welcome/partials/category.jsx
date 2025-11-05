import {AlignJustify} from "lucide-react";
import {Link} from "@inertiajs/react";
import Slider from "@/pages/main/welcome/partials/slider.jsx";
import {ChevronLeft} from "lucide-react";
import MeguMenu from "@/components/common/megu-menu.jsx";

export default function Category({sliders}) {
    return (
        <section className="bg-base-100 w-full flex justify-center pb-12">
            <div className="container   ">
                <div className="  hidden lg:grid grid-cols-12 justify-between  z-0 gap-x-10">
                    <div
                        className="lg:col-span-3 lg:flex bg-[#ff2d37] rounded-t-md px-5 py-3 text-center justify-between">
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
                <div className="w-full border-b-2 border-[#ff2d37] absolute left-0 right-0"></div>
                {/* ------- menu right side big screen------- */}

                {/* --------sub menu right categories---------- */}
                <div className=" w-full flex">
                    <div className="grid grid-cols-12 justify-between relative gap-x-10">
                        <div className="hidden lg:flex lg:col-span-3 bg-base-100 c-shadow">
                            <MeguMenu/>
                        </div>
                        <Slider sliders={sliders}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
