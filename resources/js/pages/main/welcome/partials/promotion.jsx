import '../../../../../css/dembla.css'
import {Star, Heart} from "lucide-react";
import {Link} from "@inertiajs/react";
import {useCart} from "react-use-cart";
import {Button} from "@/components/index/index.js";
import Countdown from "@/components/product/count-down.jsx";
import {isEmpty} from "@/utils.js";
import {DotButton, useDotButton} from "@/components/common/carousalDotButtons.jsx";
import useEmblaCarousel from "embla-carousel-react";
import {useIsMobile} from "@/hooks.js";

export default function Promotion({promoProducts}) {
    const mainPromo = promoProducts[0]
    const otherPromo = promoProducts.slice(1)
    const isMobile = useIsMobile()
    const chunked = [];
    for (let i = 0; i < otherPromo.length; i += 3) {
        chunked.push(otherPromo.slice(i, i + 3));
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({axis: 'y'})

    const {selectedIndex, scrollSnaps, onDotButtonClick} =
        useDotButton(emblaApi)

    const {addItem} = useCart();
    const handleAdd = (item) => {
        addItem({
            id: item.id,
            sku: item.sku,
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
                        className="col-span-12 flex lg:col-span-9 justify-between bg-white drop-shadow-lg shadow-gray-400 px-2 py-4 mt-16 items-center">
                        <h3 className="modtitle2"><span>حراج روز</span></h3>
                        {/* image product- deal of the day---------- */}
                        {mainPromo && !isEmpty(mainPromo) &&
                            <>
                                <div
                                    className="w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] flex-shrink-0 mx-auto ">
                                    <Link href={route('home.getProduct', mainPromo.sku)} title="dealofday"
                                          className="relative block w-full h-full group overflow-hidden">
                                        {/*LATER MUST CHANGE TO THUMBS!*/}
                                        <img
                                            // src={route('file.show', mainPromo.image)}
                                            src={`https://cdn.tpmyadak.com/prothumb/${mainPromo.image}`}
                                            alt="deal"
                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75 my-auto "
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
                                    <Link href={route('home.getProduct', mainPromo.sku)} title="producttitle">
                                        <h4 className="text-[#333333] hover:text-[#d8330a] text-xs lg:text-base font-bold transition duration-300 ease-in">
                                            {mainPromo.title}
                                        </h4>
                                    </Link>
                                    {/* rating product- deal of the day---------- */}
                                    {/*<div className="flex my-6">*/}
                                    {/*    <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>*/}
                                    {/*    <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>*/}
                                    {/*    <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>*/}
                                    {/*    <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>*/}
                                    {/*    <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>*/}
                                    {/*</div>*/}
                                    {/* prices product- deal of the day---------- */}
                                    <div className="my-6 font-bold flex-grow text-gray-400">
                                        <span className="text-[#d8330a] text-sm sm:text-base pl-2">
                                            {parseInt((mainPromo.price - mainPromo.discount)).toLocaleString('en')} تومان
                                        </span>
                                        <span className="line-through text-sm sm:text-base">
                                            {parseInt(mainPromo.price).toLocaleString('en')} تومان
                                        </span>
                                        <p className="font-medium text-xs sm:text-sm mt-6">
                                            {mainPromo.excerpt}
                                        </p>
                                    </div>
                                    {/* -------- countdown for deal of the day--------------- */}
                                    <Countdown targetDate={mainPromo.date_end}/>
                                    {/* ---------- select items for deal days------ */}
                                    <div className="flex mt-8 gap-x-1 ms:gap-x-2">
                                        <Button onClick={() => handleAdd(mainPromo)} type="danger"
                                                className="relative flex  items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200">
                                            افزودن به سبد خرید <span className="sr-only">, {mainPromo.title}</span>
                                        </Button>


                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    {/*-------------- best seller section------------------- */}
                    {!isMobile &&
                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 drop-shadow-lg shadow-gray-400 mt-16">
                        <div className="bg-[#d8330a] rounded-t-md py-3">
                            <span className="text-white font-blod text-center px-3">
                                حراج روز
                            </span>
                        </div>
                        <div id="indicators-carousel" className="relative w-full bg-white" data-carousel="static">
                            <div className="relative md:h-[1200px] lg:h-[500px] overflow-hidden rounded-lg">
                                <section className="dembla h-full">
                                    <div className="dembla__viewport" ref={emblaRef}>
                                        <div className="dembla__container h-full">
                                            {chunked.map((items, i) =>
                                                <div className="dembla__slide h-full flex flex-col" key={i}>
                                                    {items.map((product, i) =>
                                                        <div key={i}
                                                             className="flex flex-col md:flex-row justify-between items-center relative after:absolute after:content-[''] after:bg-gray-200 after:w-[90%] after:h-[1px] after:top-full after:left-1/2 after:-translate-x-1/2 pt-3 ">
                                                            <div
                                                                className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[75px] lg:h-[75  px] xl:w-[90px] xl:h-[90px] lg:flex-shrink-0 mx-auto my-2">
                                                                <Link href={route('home.getProduct', product.sku)}
                                                                      title="dealofday"
                                                                      className="relative block w-full h-full group overflow-hidden md:mr-5 lg:mr-0">
                                                                    <img
                                                                        // src={route('file.show', product.image)}
                                                                        src={`https://cdn.tpmyadak.com/prothumb/${product.image}`}
                                                                        alt="deal"
                                                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
                                                                    />
                                                                    {/*<img src={bestseller01Hover} alt="deal"*/}
                                                                    {/*     className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"*/}
                                                                    {/*/>*/}
                                                                </Link>
                                                            </div>
                                                            {" "}
                                                            <div
                                                                className="lg:py-2 lg:px-0 lg:pl-2 w-full text-center lg:text-start my-auto">
                                                                <Link href={route('home.getProduct', product.sku)}
                                                                      title="producttitle">
                                                                    <h4 className="text-[#333333] hover:text-[#d8330a] text-lg font-bold lg:font-medium lg:text-sm transition duration-300 ease-in py-2">
                                                                        {product.title.substring(0, 40) + ' ...'}
                                                                    </h4>
                                                                </Link>

                                                                {/* prices product- deal of the day---------- */}

                                                                <div className="text-gray-400 py-1">
                                                                    <div className="line-through text-sm sm:text-base">
                                                                        {parseInt(product.price).toLocaleString('en')} تومان
                                                                    </div>
                                                                    <div
                                                                        className="text-[#d8330a] text-sm sm:text-base pl-2">
                                                                        {parseInt((product.price - product.discount)).toLocaleString('en')} تومان
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="dembla__controls flex justify-center">

                                        <div className="dembla__dots">
                                            {scrollSnaps.map((_, index) => (
                                                <DotButton
                                                    key={index}
                                                    onClick={() => onDotButtonClick(index)}
                                                    className={'dembla__dot'.concat(
                                                        index === selectedIndex ? ' dembla__dot--selected' : ''
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </section>


                                {/* second seller------ */}

                            </div>


                        </div>
                    </div>
                    }
                </div>
            </div>
            {/* replacement parts---------------------------- */}

        </section>
    )
}
