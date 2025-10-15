import {Star} from "lucide-react";
import dealimage from '../../../../../images/dealimage.jpg'
import dealimage2 from '../../../../../images/dealimage2.jpg'
import bestseller01 from '../../../../../images/bestseller01.jpg'
import bestseller01Hover from '../../../../../images/bestsellerHover01.jpg'
import bestseller02 from '../../../../../images/bestseller02.jpg'
import bestseller02Hover from '../../../../../images/bestsellerHover02.jpg'
import bestseller03 from '../../../../../images/bestseller03.jpg'
import bestseller03Hover from '../../../../../images/bestsellerHover03.jpg'

export default function Promotion(props) {
    return (
        <section className="w-full flex justify-center  bg-[#fff]">
            <div className="container">
                <div className="grid grid-cols-12 mt-10 lg:gap-x-10">
                    <div
                        className="col-span-12 flex lg:col-span-9 justify-between bg-white drop-shadow-lg shadow-gray-400 px-2 py-4 mt-16">
                        {/* image product- deal of the day---------- */}
                        <div
                            className="w-[100px] h-[100px] sm:w-[300px] sm:h-[300px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] flex-shrink-0 mx-auto">
                            <a
                                href="#"
                                title="dealofday"
                                className="relative block w-full h-full group overflow-hidden"
                            >
                                <img
                                    src={dealimage}
                                    alt="deal"
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <img
                                    src={dealimage2}
                                    alt="deal"
                                    className=" absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </a>
                        </div>
                        <div className="py-6 lg:py-12 md:px-8 lg:px-0 lg:pl-2">
                            <a href="#" title="producttitle">
                                <h4 className="text-[#333333] hover:text-[#ff2d37] text-xs lg:text-base font-bold transition duration-300 ease-in">
                                    لاستیک عقب ماشین مدل درجه یک
                                </h4>
                            </a>
                            {/* rating product- deal of the day---------- */}
                            <div className="flex my-6">
                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                            </div>
                            {/* prices product- deal of the day---------- */}
                            <div className="my-6 font-bold flex-grow text-gray-400">
                  <span className="text-[#ff2d37] text-sm sm:text-base pl-2">
                    ۵۰ میلیون
                  </span>
                                <span className="line-through text-sm sm:text-base">
                    ۷۰ میلیون
                  </span>
                                <p className="font-medium text-xs sm:text-sm mt-6">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                                    و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                                    تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                                    کاربردی می باشد،د.
                                </p>
                            </div>
                            {/* -------- countdown for deal of the day--------------- */}
                            <div className="flex gap-x-1 sm:gap-x-4">
                                <div
                                    className="w-10 sm:w-14 border-2 border-gray-300 rounded-sm flex flex-col items-center px-4 py-2">
                                    <span className="font-bold">00</span>
                                    <span className="text-xs sm:text-sm text-gray-400 font-ligh">
                      روز
                    </span>
                                </div>
                                <div
                                    className="w-10 sm:w-14 border-2 border-gray-300 rounded-sm flex flex-col items-center px-4 py-2">
                                    <span className="font-bold">00</span>
                                    <span className="text-xs sm:text-sm text-gray-400 font-light">
                      ساعت
                    </span>
                                </div>
                                <div
                                    className="w-10 sm:w-14 border-2 border-gray-300 rounded-md flex flex-col items-center px-4 py-2">
                                    <span className="font-bold">00</span>
                                    <span className="text-xs sm:text-sm text-gray-400 font-light">
                      دقیقه
                    </span>
                                </div>
                                <div
                                    className="w-10 sm:w-14 border-2 border-gray-300 rounded-md flex flex-col items-center px-4 py-2">
                                    <span className="font-bold">00</span>
                                    <span className="text-xs sm:text-sm text-gray-400 font-light">
                      ثانیه
                    </span>
                                </div>
                            </div>
                            {/* ---------- select items for deal days------ */}
                            <div className="flex mt-8 gap-x-1 ms:gap-x-2">
                                <div
                                    className="bg-[#333333] text-xs sm:text-sm rounded-sm px-1 ms:px-4 ms:py-3 hover:bg-[#ff2d37] transition duration-200 ease-in">
                                    <a
                                        href="#"
                                        title="addtocard"
                                        className="text-white text-center py-2 inline-block"
                                    >
                                        اضافه به سبد خرید
                                    </a>
                                </div>
                                <div
                                    className="bg-[#333333] text-xs sm:text-sm rounded-sm p-2 ms:px-3 ms:py-3 hover:bg-[#ff2d37] transition duration-200 ease-in">
                                    <a href="#" title="addtocard">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            fill="white"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/>
                                        </svg>
                                    </a>
                                </div>
                                <div
                                    className="bg-[#333333] text-xs sm:text-sm rounded-sm p-2 ms:px-3 ms:py-3 hover:bg-[#ff2d37] transition duration-200 ease-in">
                                    <a href="#" title="addtocard">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            fill="white"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*-------------- best seller section------------------- */}
                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 drop-shadow-lg shadow-gray-400 mt-16">
                        <div className="bg-[#ff2d37] rounded-t-md py-3">
                <span className="text-white font-blod text-center px-3">
                  فروشنده های برتر
                </span>
                        </div>
                        <div id="indicators-carousel" className="relative w-full bg-white" data-carousel="static">
                            <div
                                className="relative h-[1500px] md:h-[1200px] lg:h-[500px] overflow-hidden rounded-lg">
                                <div className=" duration-700 ease-in-out" data-carousel-item="active">

                                    <div
                                        className="flex flex-col md:flex-row justify-between relative after:absolute after:content-[''] after:bg-gray-200 after:w-[90%] after:h-[1px] after:top-full after:left-1/2 after:-translate-x-1/2 pt-3 pb-6">
                                        <div
                                            className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[75px] lg:h-[75  px] xl:w-[90px] xl:h-[90px] lg:flex-shrink-0 mx-auto my-2">
                                            <a href="#" title="dealofday"
                                               className="relative block w-full h-full group overflow-hidden md:mr-5 lg:mr-0">
                                                <img src={bestseller01} alt="deal"
                                                     className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                                />
                                                <img src={bestseller01Hover} alt="deal"
                                                     className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                />
                                            </a>
                                        </div>
                                        {" "}
                                        <div
                                            className="lg:py-2 lg:px-0 lg:pl-2 w-full text-center lg:text-start my-auto">
                                            <a href="#" title="producttitle">
                                                <h4 className="text-[#333333] hover:text-[#ff2d37] text-lg font-bold lg:font-medium lg:text-sm transition duration-300 ease-in py-2">
                                                    لاستیک عقب ماشین
                                                </h4>
                                            </a>
                                            {/* rating product- deal of the day---------- */}
                                            <div className="flex justify-center lg:justify-start">
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                                            </div>
                                            {/* prices product- deal of the day---------- */}

                                            <div className="text-gray-400 py-1">
                          <span className="text-[#ff2d37] pl-2 font-bold">
                            ۵۰ میلیون
                          </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* second seller------ */}
                                    <div
                                        className="flex flex-col md:flex-row justify-between relative after:absolute after:content-[''] after:bg-gray-200 after:w-[90%] after:h-[1px] after:top-full after:left-1/2 after:-translate-x-1/2 pt-3 pb-6">
                                        <div
                                            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[75px] lg:h-[75px] xl:w-[90px] xl:h-[90px] lg:flex-shrink-0 mx-auto my-2">
                                            <a
                                                href="#"
                                                title="dealofday"
                                                className="relative block w-full h-full group overflow-hidden md:mr-5 lg:mr-0"
                                            >
                                                <img
                                                    src={bestseller02}
                                                    alt="product"
                                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                                />
                                                <img
                                                    src={bestseller02Hover}
                                                    alt="product"
                                                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                />
                                            </a>
                                        </div>
                                        {" "}
                                        <div
                                            className="lg:py-2 lg:px-0 lg:pl-2 w-full text-center lg:text-start my-auto">
                                            <a href="#" title="producttitle">
                                                <h4 className="text-[#333333] hover:text-[#ff2d37] text-lg font-bold lg:font-medium lg:text-sm transition duration-300 ease-in py-2">
                                                    شمع دوتایی ماشین
                                                </h4>
                                            </a>
                                            {/* rating product- deal of the day---------- */}
                                            <div className="flex justify-center lg:justify-start">
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                                            </div>
                                            {/* prices product- deal of the day---------- */}

                                            <div className="text-gray-400 py-1">
                          <span className="text-[#ff2d37] pl-2 font-bold">
                            ۴۰ میلیون
                          </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* third seller------ */}
                                    <div
                                        className="flex flex-col md:flex-row justify-between relative after:absolute after:content-[''] after:bg-gray-200 after:w-[90%] after:h-[1px] after:top-full after:left-1/2 after:-translate-x-1/2 pt-3 pb-6">
                                        <div
                                            className="w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] lg:w-[75px] lg:h-[75px] xl:w-[90px] xl:h-[90px] lg:flex-shrink-0 mx-auto my-2">
                                            <a
                                                href="#"
                                                title="dealofday"
                                                className="relative block w-full h-full group overflow-hidden md:mr-5 lg:mr-0"
                                            >
                                                <img
                                                    src={bestseller03}
                                                    alt="deal"
                                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                                />
                                                <img
                                                    src={bestseller03Hover}
                                                    alt="deal"
                                                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                />
                                            </a>
                                        </div>
                                        {" "}
                                        <div
                                            className="lg:py-2 lg:px-0 lg:pl-2 w-full text-center lg:text-start my-auto">
                                            <a href="#" title="producttitle">
                                                <h4 className="text-[#333333] hover:text-[#ff2d37] text-lg font-bold lg:font-medium lg:text-sm transition duration-300 ease-in py-2">
                                                    شمع دوتایی ماشین
                                                </h4>
                                            </a>
                                            {/* rating product- deal of the day---------- */}
                                            <div className="flex justify-center lg:justify-start">
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                                <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                                            </div>
                                            {/* prices product- deal of the day---------- */}

                                            <div className="text-gray-400 py-1">
                          <span className="text-[#ff2d37] pl-2 font-bold">
                            ۴۰ میلیون
                          </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            {/* replacement parts---------------------------- */}

        </section>
    )
}
