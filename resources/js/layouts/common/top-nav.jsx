import {
    ChevronLeft,
    House,
    Menu,
} from "lucide-react";
import {Link} from "@inertiajs/react";
import MeguMenu from "@/components/common/megu-menu.jsx";
export default function TopNav() {

    return (
        <ul className="flex relative items-center text-center bg-base-100">
            <li className="bg-[#d8330a] py-3 rounded-t-md text-white px-4 font-bold ml-2 z-40 group">
                <Link href={route('home')} title="home">
                    خانه
                </Link>
            </li>
            <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#d8330a] hover:text-white transition duration-300 ease-in">
                <Link href={route('home.getBlogs')} title="blog">
                    بلاگ
                </Link>
            </li>
            <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#d8330a] hover:text-white transition duration-300 ease-in">
                <Link href={route('home.about')} title="about">
                    درباره ما
                </Link>
            </li>
            <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#d8330a] hover:text-white transition duration-300 ease-in">
                <Link href={route('home.contact')} title="contact">
                    تماس با ما
                </Link>
            </li>
            <li className="bg-white max-w-fit py-3 rounded-t-md text-[#333333] px-5 font-bold ml-2 hover:bg-[#d8330a] hover:text-white transition duration-300 ease-in">
                <Link href={route('home.faq')} title="contact">
                    سوالات متداول
                </Link>
            </li>
        </ul>
    )
}
