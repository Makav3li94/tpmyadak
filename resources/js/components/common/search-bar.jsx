import React, {useEffect, useState} from 'react';
import {Search,XIcon} from "lucide-react";
import { motion } from "motion/react"
import {Link} from "@inertiajs/react";
const SearchBar = ({isMobile=false}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchItems, setSearchItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [searchDone, setSearchDone] = useState(0);
    const handleSearch = () => {
        if (searchTerm.trim() === "" || (searchTerm !== "" && searchTerm.trim().length < 2)) {
            setSearchItems([])
            setLoading(true)
            return false
        }
        axios.post(route('home.product.search',searchTerm)).then(response => {
                setLoading(false)

                if (response.data.data.length === 0 ) {
                    setSearchItems([])
                    setSearchDone(searchDone + 1)
                    setLoading(false)

                    return false
                }
                setSearchItems(response.data.data);

            }
        ).catch(error => {
            console.log(error.stack);
        });

        setLoading(false)

    }
    useEffect(() => {
        setHasMounted(true)
    }, [])
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(true)

            if (searchTerm === '') {
                setSearchItems([])
                setLoading(false)
                return false
            }
            handleSearch()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])


    return (
        <>
            <div className={`${!isMobile ? 'searchForm hidden md:flex md:col-span-5 md:pl-6':'border-1 border-gray-300 group-hover:max-h-64 ' +
                ' lg:w-[180%] w-full  absolute top-32 left-0 right-2 translate-x-2 z-50 mt-1  bg-white'}`}>
                <form className="w-full mx-auto">
                    <div className="flex">
                        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                           جست و جو محصول ...
                        </label>


                        <div className="relative w-full">
                            <input
                                type="search"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded  border-s-2 border border-gray-300 focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400"
                                placeholder=" کلمه کلیدی خود را بنویسید..."
                                value={searchTerm}
                                required
                                onChange={(e) => setSearchTerm(e.target.value)}/>

                            {searchTerm === '' ? (
                                <button
                                    type="submit"
                                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#d8330a] rounded-e-lg border border-[#d8330a] focus:ring-4 focus:outline-none focus:ring-gray-300"
                                >
                                    <Search className="w-5 h-5"/>

                                    <span className="sr-only">Search</span>
                                </button>
                            ) : (

                                <button
                                type="submit"
                                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#d8330a] rounded-e-lg border border-[#d8330a] focus:ring-4 focus:outline-none focus:ring-gray-300"
                                onClick={(e) => {
                                e.preventDefault()
                                setSearchTerm('');
                                setSearchItems([]);
                                setLoading(false)
                            }}>

                                    {hasMounted && <XIcon className="w-5 h-5"/>}
                                <span className="sr-only">Search</span>
                                </button>
                            )}
                            {/*<BallSpinner message="داریم میگردیم ..."/>*/}
                            {searchTerm !== '' &&
                                <motion.ul
                                    style={{ overflow: "hidden" }}
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ height: 0 }}
                                    key={"container"}
                                    className="list bg-base-100 rounded-box shadow-md absolute z-99 w-full"
                                >
                                    {/* محصولات */}
                                    {searchItems.filter(i => i.type === 'product').length > 0 &&
                                        searchItems.filter(i => i.type === 'product').map((prod, idx) => (
                                            <li className="list-row" key={`prod-${idx}`}>
                                                <Link
                                                    target="_blank"
                                                    href={route('home.getProduct', prod.sku)}
                                                >
                                                    {prod.title.length > 35 ? `${prod.title.substring(0, 35)}...` : prod.title}
                                                </Link>
                                            </li>
                                        ))
                                    }

                                    {/* دسته‌ها */}
                                    {searchItems.filter(i => i.type === 'category').length > 0 && (
                                        <>
                                            <li className="p-2 text-xs text-gray-500 font-medium">جستجو در دسته‌ها</li>
                                            {searchItems.filter(i => i.type === 'category').map((cat, idx) => (
                                                <li
                                                    key={`cat-${idx}`}
                                                    className="list-row p-2 hover:bg-gray-100 bg-gray-50 border-t border-gray-200"
                                                >
                                                    <Link
                                                        className="font-medium text-blue-600"
                                                        href={route('home.getCategory', cat.slug)}
                                                    >
                                                        {cat.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                    {searchItems.filter(i => i.type === 'brand').length > 0 && (
                                        <>
                                            <li className="p-2 text-xs text-gray-500 font-medium">جستجو در برندها</li>
                                            {searchItems.filter(i => i.type === 'brand').map((brand, idx) => (
                                                <li
                                                    key={`brand-${idx}`}
                                                    className="list-row p-2 hover:bg-gray-100 bg-gray-50 border-t border-gray-200"
                                                >
                                                    <Link
                                                        className="font-medium text-blue-600"
                                                        href={route('home.getBrand', brand.slug)}
                                                    >
                                                        {brand.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                    {/* حالت loading */}
                                    {loading && (
                                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">در حال جستجو ...</li>
                                    )}

                                    {/* وقتی نتیجه‌ای نیست */}
                                    {!loading && searchTerm.length > 1 && searchItems.length === 0 && (
                                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">نتیجه ای یافت نشد.</li>
                                    )}
                                </motion.ul>

                            }

                        </div>
                    </div>
                </form>
            </div>

        </>
    );
};

export default SearchBar;
