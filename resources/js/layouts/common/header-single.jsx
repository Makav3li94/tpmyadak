import {
    ChevronLeft,
    House,
    Menu,
} from "lucide-react";
import {Link} from "@inertiajs/react";
import MeguMenu from "@/components/common/megu-menu.jsx";
import TopNav from "@/layouts/common/top-nav.jsx";
export default function HeaderSingle() {

    return (
        <section className="w-full container justify-center">
            <div className=" hidden lg:grid grid-cols-12 justify-between  z-0 gap-x-10">
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

                    <TopNav/>
                </div>
            </div>
            <div className="w-full border-b-2 border-[#d8330a]"></div>
            {/* --------------breadcrumb------------------- */}

        </section>
    )
}
