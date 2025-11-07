import {
    ChevronLeft,
    House,
    Menu,
} from "lucide-react";
import {Link} from "@inertiajs/react";
export default function Breadcrumb({l1,l2=null}) {

    return (
        <div className="container pt-4 pb-8">
            <ul className="breadcrumb flex items-center">
                <li>
                    <Link href={route('home')} title="home" className="hover:text-[#d8330a] transition duration-300 ease-in">
                        <House size={12} color="#878787"/>
                    </Link>
                </li>
                <li className="px-2">
                        <ChevronLeft size={12} color="#878787"/>
                </li>

                <li>
                    <Link href={l1[1] !== '' ? route(l1[1],l1[2]?l1[2]:null) : route(route().current())} title={l1[0]} className="text-[#d8330a] text-xs">
                        {l1[0]}
                    </Link>
                </li>
                {l2!==null &&
                <>
                    <li className="px-2">
                        <ChevronLeft size={12} color="#878787"/>
                    </li>
                    <li>
                        <Link href={l2[1] !== '' ? route(l2[1],l2[2]?l2[2]:null) : route(route().current())} title={l2[0]} className="text-[#d8330a] text-xs">
                            {l2[0]}
                        </Link>
                    </li>
                </>
                }
            </ul>
        </div>
    )
}
