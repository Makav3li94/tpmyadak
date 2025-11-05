import {
    ChevronLeft,
    House,
    Menu,
} from "lucide-react";
import {Link} from "@inertiajs/react";
import MeguMenu from "@/components/common/megu-menu.jsx";
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
                            <MeguMenu isSingle={true}/>
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
                            <Link href={route('home.getBlogs')} title="blog">
                                بلاگ
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full border-b-2 border-[#ff2d37]"></div>
            {/* --------------breadcrumb------------------- */}

        </section>
    )
}
