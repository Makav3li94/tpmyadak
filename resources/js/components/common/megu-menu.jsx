import { ChevronLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import MegaMenuBank from '../../megu-menu-bank.jsx'
const MegaMenu = ({ isSingle=false }) => {
    return (
        <ul className="relative z-20 w-full">
            {MegaMenuBank?.map(category => (
                <li key={category.id} className={`${isSingle && 'text-[#333333]'} group hover:bg-[#ff2d37] transition duration-300 ease-in px-5 relative`}>

                    {/* سطح 1 */}
                    <div className="flex justify-between text-center items-center py-3 border-b border-gray-300 hover:border-[#ff2d37] cursor-pointer z-10">
                        <div className={`${isSingle && 'text-[#333333]'}text-sm group-hover:text-gray-50`}>
                            {category.title}
                        </div>
                        <ChevronLeft className="w-3 h-3 group-hover:fill-white"/>
                    </div>

                    {/* مگا منو */}
                    {Array.isArray(category.children) && category.children.length > 0 && (
                        <div className="hidden group-hover:flex w-[650px] drop-shadow-lg bg-white shadow-gray-400 absolute top-0 xl:-right-[60px] md:-right-[100px] -translate-x-1/2 p-5 z-10">

                            {/* اینجا تمام کنترل ستون بندی انجام میشه */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

                                {category.children.map(sub => (
                                    <ul key={sub.id} className="text-sm">

                                        {/* عنوان ستون (سطح 2) */}
                                        <li className="font-bold mb-2">
                                            <h4 className="text-[#333333]">
                                                <Link href={`/category/${sub.slug}`}>
                                                    {sub.title}
                                                </Link>
                                            </h4>
                                        </li>

                                        {/* آیتم‌های ستون (سطح 3) */}
                                        {Array.isArray(sub.children) && sub.children.length > 0 && sub.children.map(item => (
                                            <li key={item.id} className="text-gray-600 hover:text-[#ff2d37] transition duration-300 ease-in py-1.5">
                                                <Link href={`/category/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>
                                ))}

                            </div>
                        </div>
                    )}

                </li>
            ))}
        </ul>
    );
};

export default MegaMenu;
