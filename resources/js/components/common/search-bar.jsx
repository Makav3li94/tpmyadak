import React, {useEffect, useState} from 'react';
import {Search,XIcon} from "lucide-react";
import { motion } from "motion/react"
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
            <div className={`${!isMobile ? 'searchForm hidden md:flex md:col-span-5 md:pl-6':'border-1 border-gray-300 group-hover:max-h-64  lg:w-[180%] w-full  absolute top-32 left-0 right-2 translate-x-2 z-50 mt-1  bg-white'}`}>
                <form className="w-full mx-auto">
                    <div className="flex">
                        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                           جست و جو محصول ...
                        </label>


                        <div className="relative w-full">
                            <input
                                type="search"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg  border-s-2 border border-gray-300 focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400"
                                placeholder=" کلمه کلیدی خود را بنویسید..."
                                value={searchTerm}
                                required
                                onChange={(e) => setSearchTerm(e.target.value)}/>

                            {searchTerm === '' ? (
                                <button
                                    type="submit"
                                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#ff2d37] rounded-e-lg border border-[#ff2d37] focus:ring-4 focus:outline-none focus:ring-gray-300"
                                >
                                    <Search className="w-5 h-5"/>

                                    <span className="sr-only">Search</span>
                                </button>
                            ) : (

                                <button
                                type="submit"
                                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#ff2d37] rounded-e-lg border border-[#ff2d37] focus:ring-4 focus:outline-none focus:ring-gray-300"
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
                                    transition={{ duration: 0.5 }}
                                    exit={{ height: 0 }}
                                    key={"container"}
                                    className="list bg-base-100 rounded-box shadow-md absolute z-99 w-full"
                                >
                                        {(!loading && searchTerm !== '' && searchTerm.length > 3 && searchItems.length === undefined) ?
                                            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" hidden="">نتیجه ای یافت نشد.</li> : null}

                                        {searchItems.length > 0 ?
                                            (
                                                searchItems.map((addSearch, index) => (
                                                    <li className="list-row" key={index}>
                                                        {/*<Link className="link-dark link-underline-opacity-0 ml-5 w-100 h-100 d-inline-block  fs-6-5"*/}
                                                        {/*   target="_blank"*/}
                                                        {/*   href={route('home.getProduct', addSearch.slug)}>*/}
                                                        {addSearch.title.length > 35 ? `${addSearch.title.substring(0, 35)}...` : addSearch.title}
                                                        {/*</Link>*/}
                                                    </li>
                                                ))
                                            ) : (
                                                (searchTerm !== '' && !loading) &&
                                                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" hidden="">نتیجه ای یافت نشد.</li>
                                            )
                                        }

                                        {loading ? <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" hidden="">لطفا عبارت کامل وارد کنید ...</li> : null}
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
