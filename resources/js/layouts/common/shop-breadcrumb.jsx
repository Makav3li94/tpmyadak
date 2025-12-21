import { ChevronLeft, House } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function ShopBreadcrumb({ items = [] }) {
    return (
        <div className="container pt-4 pb-8">
            <ul className="breadcrumb flex items-center flex-wrap">
                <li>
                    <Link href={route('home')} title="home">
                        <House size={12} color="#878787"/>
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <span className="px-2">
                            <ChevronLeft size={12} color="#878787"/>
                        </span>
                        <Link
                            href={route('home.getCategory', { slug: item.slug })}
                            className="text-[#d8330a] text-xs"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
