import {Star, Heart} from "lucide-react";
import {Link} from "@inertiajs/react";
import {useCart} from "react-use-cart";
import {Button} from "@/components/index/index.js";
import Countdown from "@/components/product/count-down.jsx";

export default function Promotion({promoProducts}) {
    const mainPromo = promoProducts[0]
    const otherPromo = promoProducts.slice(1)

    const {addItem} = useCart();
    const handleAdd = (item) => {
        addItem({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            discount: item.discount,
            image: item.image,
            price: item.price,
        })

    }
    return (
        <section className="w-full flex justify-center  bg-base-200 py-12">
            <div className="container">
                <div className="grid grid-cols-12  lg:gap-x-10">
                    <div
                        className="col-span-12 flex lg:col-span-9 justify-between bg-white drop-shadow-lg shadow-gray-400 px-2 py-4 mt-16">
                        {/* image product- deal of the day---------- */}
                        <div
                            className="w-[100px] h-[100px] sm:w-[300px] sm:h-[300px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] flex-shrink-0 mx-auto">
                            <Link href="#" title="dealofday"
                                  className="relative block w-full h-full group overflow-hidden">
                                {/*LATER MUST CHANGE TO THUMBS!*/}
                                <img
                                    src={route('file.show', mainPromo.image)}
                                    alt="deal"
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                />
                                {/*Hover Image*/}
                                {/*<img*/}
                                {/*    src={dealimage2}*/}
                                {/*    alt="deal"*/}
                                {/*    className=" absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"*/}
                                {/*/>*/}
                            </Link>
                        </div>
                        <div className="py-6 lg:py-12 md:px-8 lg:px-0 lg:pl-2">
                            <a href="#" title="producttitle">
                                <h4 className="text-[#333333] hover:text-[#ff2d37] text-xs lg:text-base font-bold transition duration-300 ease-in">
                                    {mainPromo.title}
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
                    {parseInt((mainPromo.price - mainPromo.discount)).toLocaleString('en')} میلیون
                  </span>
                                <span className="line-through text-sm sm:text-base">
                             {parseInt(mainPromo.price).toLocaleString('en')} میلیون
                  </span>
                                <p className="font-medium text-xs sm:text-sm mt-6">
                                    {mainPromo.excerpt}
                                </p>
                            </div>
                            {/* -------- countdown for deal of the day--------------- */}
                    <Countdown targetDate={mainPromo.date_end}/>
                            {/* ---------- select items for deal days------ */}
                            <div className="flex mt-8 gap-x-1 ms:gap-x-2">
                                <Button onClick={()=>handleAdd(mainPromo)} type="danger"    className="inline-block py-3 px-1 text-xs">
                                    افزودن به سبد خرید
                                </Button>
                                <div
                                    className="bg-[#333333] text-xs sm:text-sm rounded-sm p-2 ms:px-3 ms:py-3 hover:bg-[#ff2d37] transition duration-200 ease-in">
                                    <a href="#" title="addtocard">
                                        <Heart className='w-5 h-5 text-base-100'/>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*-------------- best seller section------------------- */}
                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 drop-shadow-lg shadow-gray-400 mt-16">
                        <div className="bg-[#ff2d37] rounded-t-md py-3">
                <span className="text-white font-blod text-center px-3">
                  حراج روز
                </span>
                        </div>
                        <div id="indicators-carousel" className="relative w-full bg-white" data-carousel="static">
                            <div className="relative h-[1500px] md:h-[1200px] lg:h-[500px] overflow-hidden rounded-lg">
                                <div className=" duration-700 ease-in-out" data-carousel-item="active">
                                    {otherPromo.map((product, i) =>
                                        <div key={i}
                                             className="flex flex-col md:flex-row justify-between relative after:absolute after:content-[''] after:bg-gray-200 after:w-[90%] after:h-[1px] after:top-full after:left-1/2 after:-translate-x-1/2 pt-3 pb-6">
                                            <div
                                                className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[75px] lg:h-[75  px] xl:w-[90px] xl:h-[90px] lg:flex-shrink-0 mx-auto my-2">
                                                <a href="#" title="dealofday"
                                                   className="relative block w-full h-full group overflow-hidden md:mr-5 lg:mr-0">
                                                    <img src={route('file.show', product.image)} alt="deal"
                                                         className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                                    />
                                                    {/*<img src={bestseller01Hover} alt="deal"*/}
                                                    {/*     className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"*/}
                                                    {/*/>*/}
                                                </a>
                                            </div>
                                            {" "}
                                            <div
                                                className="lg:py-2 lg:px-0 lg:pl-2 w-full text-center lg:text-start my-auto">
                                                <a href="#" title="producttitle">
                                                    <h4 className="text-[#333333] hover:text-[#ff2d37] text-lg font-bold lg:font-medium lg:text-sm transition duration-300 ease-in py-2">
                                                        {product.title}
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
                                                    <div className="line-through text-sm sm:text-base">
                                                        {parseInt(product.price).toLocaleString('en')} میلیون
                                                    </div>
                                                    <div className="text-[#ff2d37] text-sm sm:text-base pl-2">
                                                        {parseInt((product.price - product.discount)).toLocaleString('en')} میلیون
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* second seller------ */}

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
