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

                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group ">
                                    <div className="flex justify-between text-center items-center py-3 border-b
                                    curser-pointer border-gray-300 z-10">
                                        <div className=" text-sm group-hover:text-gray-50">
                                            قطعات خودرو
                                        </div>
                                        <ChevronLeft className="w-3 h-3 group-hover:fill-[white]"/>

                                    </div>
                                    {/* -------------sub menu lightning------------- */}
                                    <div className="hidden group-hover:flex w-[650px] drop-shadow-lg bg-white shadow-gray-400 absolute top-0 xl:-right-[60px] md:-right-[100px] -translate-x-1/2  p-5 z-10">
                                        {/*className="hidden group-hover:flex drop-shadow-lg bg-white shadow-gray-400 absolute top-0 -translate-x-1/2 -left-[280px] p-5">*/}
                                        <ul className="p-3 text-sm">
                                            {/* --------------APPAREL----------- */}
                                            <li className="font-bold">
                                                <h4 className="text-[#333333]">قطعات موتوری</h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <Link href="#" title="tabpcacc">
                                                    تسمه تایم
                                                </Link>
                                            </li>

                                            <li>
                                                <h4 className="text-[#333333] mt-5 font-bold">
                                                    قطعات مصرفی
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <Link href="#" title="camera">
                                                    لنت ترمز
                                                </Link>
                                            </li>
                                            <li>
                                                <h4 className="text-[#333333] mt-5 font-bold">
                                                    قطعات گیربکس
                                                </h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <Link href="#" title="camera">
                                                    کیت کلاچ
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group ">
                                    <div
                                        className="flex justify-between text-center items-center py-3 border-b curser-pointer
                                    border-gray-300 z-10">
                                        <div className=" text-sm group-hover:text-gray-50">
                                            روغن و روان کننده ها
                                        </div>
                                        <ChevronLeft className="w-3 h-3 group-hover:fill-[white]"/>

                                    </div>
                                    {/* -------------sub menu lightning------------- */}
                                    <div className="hidden group-hover:flex w-[650px] drop-shadow-lg bg-white shadow-gray-400 absolute top-0 xl:-right-[60px] md:-right-[100px] -translate-x-1/2  p-5 z-10">
                                        {/*className="hidden group-hover:flex drop-shadow-lg bg-white shadow-gray-400 absolute top-0 -translate-x-1/2 -left-[280px] p-5">*/}
                                        <ul className="p-3 text-sm">
                                            {/* --------------APPAREL----------- */}
                                            <li className="font-bold">
                                                <h4 className="text-[#333333]">روغن موتور</h4>
                                            </li>

                                        </ul>
                                        <ul className="p-3 text-sm">
                                            {/* --------------APPAREL----------- */}
                                            <li className="font-bold">
                                                <h4 className="text-[#333333]">روغن ترمز</h4>
                                            </li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group ">
                                    <div
                                        className="flex justify-between text-center items-center py-3 border-b curser-pointer
                                    border-gray-300 z-10">
                                        <div className=" text-sm group-hover:text-gray-50">
                                            نظافت و نگهداری خودرو
                                        </div>
                                        <ChevronLeft className="w-3 h-3 group-hover:fill-[white]"/>

                                    </div>
                                    {/* -------------sub menu lightning------------- */}
                                    <div className="hidden group-hover:flex w-[650px] drop-shadow-lg bg-white shadow-gray-400 absolute top-0 xl:-right-[60px] md:-right-[100px] -translate-x-1/2  p-5 z-10">
                                        {/*className="hidden group-hover:flex drop-shadow-lg bg-white shadow-gray-400 absolute top-0 -translate-x-1/2 -left-[280px] p-5">*/}
                                        <ul className="p-3 text-sm">
                                            {/* --------------APPAREL----------- */}
                                            <li className="font-bold">
                                                <h4 className="text-[#333333]">چسب</h4>
                                            </li>
                                            <li className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <Link href="#" title="tabpcacc">
                                                    چسب دوقلو
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group ">
                                    <div
                                        className="flex justify-between text-center items-center py-3 border-b curser-pointer
                                    border-gray-300 z-10">
                                        <div className=" text-sm group-hover:text-gray-50">
                                            اکتان و مکمل ها
                                        </div>
                                        <ChevronLeft className="w-3 h-3 group-hover:fill-[white]"/>

                                    </div>
                                    {/* -------------sub menu lightning------------- */}
                                    <div className="hidden group-hover:flex w-[650px] drop-shadow-lg bg-white shadow-gray-400 absolute top-0 xl:-right-[60px] md:-right-[100px] -translate-x-1/2  p-5 z-10">
                                        {/*className="hidden group-hover:flex drop-shadow-lg bg-white shadow-gray-400 absolute top-0 -translate-x-1/2 -left-[280px] p-5">*/}
                                        <ul className="p-3 text-sm">
                                            {/* --------------APPAREL----------- */}
                                            <li className="font-bold">
                                                <h4 className="text-[#333333]">اکتان بنزین</h4>
                                            </li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="px-4 py-2 hover:bg-red-500 hover:text-base-100 text-[#333333] group ">
                                    <div
                                        className="flex justify-between text-center items-center py-3 border-b curser-pointer
                                    border-gray-300 z-10">
                                        <div className=" text-sm group-hover:text-gray-50">
                                            خوشبو کننده
                                        </div>
                                        <ChevronLeft className="w-3 h-3 group-hover:fill-[white]"/>

                                    </div>
                                    {/* -------------sub menu lightning------------- */}
                                    <div className="hidden group-hover:flex w-[650px] drop-shadow-lg bg-white shadow-gray-400 absolute top-0 xl:-right-[60px] md:-right-[100px] -translate-x-1/2  p-5 z-10">
                                        {/*className="hidden group-hover:flex drop-shadow-lg bg-white shadow-gray-400 absolute top-0 -translate-x-1/2 -left-[280px] p-5">*/}
                                        <ul className="p-3 text-sm">
                                            {/* --------------APPAREL----------- */}
                                            <li className="font-bold">
                                                <h4 className="text-[#333333]">مشاهده همه</h4>
                                            </li>

                                        </ul>
                                    </div>
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
