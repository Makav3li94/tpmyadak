import {Star, Search, Heart, Undo2} from "lucide-react";
import replacement from '../../../../../images/replacement.jpg'
import bestseller04 from '../../../../../images/bestseller04.jpg'
import bestseller04Hover from '../../../../../images/bestsellerHover04.jpg'
import bestseller05 from '../../../../../images/bestseller05.jpg'
import bestseller05Hover from '../../../../../images/bestsellerHover05.jpg'
import bestseller06 from '../../../../../images/bestseller06.jpg'
import bestseller06Hover from '../../../../../images/bestsellerHover06.jpg'

export default function LatestProducts(props) {
    return (
        <section className="w-full flex justify-center  bg-base-100 py-12">
            <div className="container">
                <div className="flex  bg-base-100">
                    <a href="#" title="replecment" className="hidden md:flex md:flex-shrink-0">
                        <img src={replacement} alt="replacement"
                             className="md:w-[200px] h:[660px] lg:w-[280px] lg:h-[560px]"/>
                    </a>
                    <div className="bg-base-100 py-6 mx-auto">
                        <div className="mb-4">
                            <ul className=" md:flex flex-wrap -mb-px font-bold text-center px-6">
                                <li className="me-2" role="presentation">
                                    <button
                                        className="inline-block p-4 cursor-pointer text-[#ff2d37] transition duration-300 ease-in"
                                        id="profile-tab"
                                        type="button"

                                    >
                                        آخرین محصولات
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div id="default-tab-content">
                            <div className=" px-4 xl:px-10 py-4 sm:h-[1300px] h-[1400px] md:h-[400px]" id="profile">
                                <div
                                    className="flex-col flex md:flex-row md:gap-x-1 gap-y-10 lg:gap-x-2 xl:gap-x-15">
                                    <div className="border-1 border-gray-300 text-center pb-5 group">
                                        <div
                                            className="w-[300px] h-[300px] md:w-[150px] md:h-[150px] lg:w-[220px] lg:h-[220px] xl:w-[260px] xl:h-[260px] mx-auto">
                                            <a href="#" title="dealofday"
                                               className="relative block w-full h-full group overflow-hidden border-b-[1px] border-gray-300 group-hover:border-b-0"
                                            >
                                                <img src={bestseller04} alt="deal"
                                                     className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                                />

                                                <img src={bestseller04Hover} alt="deal"
                                                     className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                />
                                            </a>
                                        </div>
                                        {" "}
                                        <div
                                            className="hidden relative group-hover:flex bg-[#333333] items-center justify-between">
                                            <a href="#" title="moreinfo"
                                               className="w-12 h-12 bg-[#ff2d37] flex rounded-full justify-center items-center absolute bottom-38 right-1/2 translate-x-1/2">
                                                <Search className="w-6 h-6 text-white"/>
                                            </a>
                                            <a href="#" title="favourite" className="px-4 py-3">
                                                <Heart className="w-6 h-6 text-white"/>
                                            </a>
                                            <span
                                                className="text-sm text-white relative after:absolute after:content-[''] after:w-[1px] after:h-full after:top-0 after:-left-6 after:bg-gray-400 before:bg-gray-400 before:absolute before:content-['']
                        before:w-[1px] before:h-full before:bottom-0 before:-right-6"
                                            >
                          <a
                              href="#"
                              title="addcard"
                              className="inline-block py-3"
                          >
                            افزودن به سبد خرید
                          </a>
                        </span>
                                            <a href="#" title="return" className="px-4 py-3">
                                                <Undo2 className="w-6 h-6 text-white"/>
                                            </a>
                                        </div>
                                        <h4 className="text-[#333333] hover:text-[#ff2d37] py-3">
                                            فرمان اتومیبل آاودی
                                        </h4>
                                        <div className="flex justify-center pb-3">
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                                        </div>
                                        <span className="font-bold text-[#333333]">
                        ۵۰ میلیون
                      </span>
                                    </div>
                                    <div className="border-1 border-gray-300 text-center pb-5 group">
                                        <div
                                            className="w-[300px] h-[300px] md:w-[150px] md:h-[150px] lg:w-[220px] lg:h-[220px] xl:w-[260px] xl:h-[260px] mx-auto">
                                            <a
                                                href="#"
                                                title="dealofday"
                                                className="relative block w-full h-full group overflow-hidden border-b-[1px] border-gray-300 group-hover:border-b-0"
                                            >
                                                <img src={bestseller05} alt="deal"
                                                     className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                                />

                                                <img src={bestseller05Hover} alt="deal"
                                                     className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                />
                                            </a>
                                        </div>
                                        {" "}
                                        <div
                                            className="hidden relative group-hover:flex bg-[#333333] items-center justify-between">
                                            <a
                                                href="#"
                                                title="moreinfo"
                                                className="w-12 h-12 bg-[#ff2d37] flex rounded-full justify-center items-center absolute bottom-38 right-1/2 translate-x-1/2"
                                            >
                                                <Search className="w-6 h-6 text-white"/>
                                            </a>
                                            <a href="#" title="favourite" className="px-4 py-3">
                                                <Heart className="w-6 h-6 text-white"/>
                                            </a>
                                            <span
                                                className="text-sm text-white relative after:absolute after:content-[''] after:w-[1px] after:h-full after:top-0 after:-left-6 after:bg-gray-400 before:bg-gray-400 before:absolute before:content-['']
                        before:w-[1px] before:h-full before:bottom-0 before:-right-6"
                                            >
                          <a
                              href="#"
                              title="addcard"
                              className="inline-block py-3"
                          >
                            افزودن به سبد خرید
                          </a>
                        </span>
                                            <a href="#" title="return" className="px-4 py-3">
                                                <Undo2 className="w-6 h-6 text-white"/>
                                            </a>
                                        </div>
                                        <h4 className="text-[#333333] hover:text-[#ff2d37] py-3">
                                            فرمان اتومیبل آاودی
                                        </h4>
                                        <div className="flex justify-center pb-3">
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                                        </div>
                                        <span className="font-bold text-[#333333]">
                        ۵۰ میلیون
                      </span>
                                    </div>
                                    <div className="border-1 border-gray-300 text-center pb-5 group">
                                        <div
                                            className="w-[300px] h-[300px] md:w-[150px] md:h-[150px] lg:w-[220px] lg:h-[220px] xl:w-[260px] xl:h-[260px] lg:flex-shrink-0 mx-auto">
                                            <a
                                                href="#"
                                                title="dealofday"
                                                className="relative block w-full h-full group overflow-hidden border-b-[1px] border-gray-300 group-hover:border-b-0"
                                            >
                                                <img src={bestseller06} alt="deal"
                                                     className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                                />

                                                <img src={bestseller06Hover} alt="deal"
                                                     className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                />
                                            </a>
                                        </div>
                                        {" "}
                                        <div
                                            className="hidden relative group-hover:flex bg-[#333333] items-center justify-between">
                                            <a
                                                href="#"
                                                title="moreinfo"
                                                className="w-12 h-12 bg-[#ff2d37] flex rounded-full justify-center items-center absolute bottom-38 right-1/2 translate-x-1/2"
                                            >
                                                <Search className="w-6 h-6 text-white"/>
                                            </a>
                                            <a href="#" title="favourite" className="px-4 py-3">
                                                <Heart className="w-6 h-6 text-white"/>
                                            </a>
                                            <span
                                                className="text-sm text-white relative after:absolute after:content-[''] after:w-[1px] after:h-full after:top-0 after:-left-6 after:bg-gray-400 before:bg-gray-400 before:absolute before:content-['']
                        before:w-[1px] before:h-full before:bottom-0 before:-right-6"
                                            >
                          <a
                              href="#"
                              title="addcard"
                              className="inline-block py-3"
                          >
                            افزودن به سبد خرید
                          </a>
                        </span>
                                            <a href="#" title="return" className="px-4 py-3">
                                                <Undo2 className="w-6 h-6 text-white"/>
                                            </a>
                                        </div>
                                        <h4 className="text-[#333333] hover:text-[#ff2d37] py-3">
                                            فرمان اتومیبل آاودی
                                        </h4>
                                        <div className="flex justify-center pb-3">
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                                        </div>
                                        <span className="font-bold text-[#333333]">
                        ۵۰ میلیون
                      </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
