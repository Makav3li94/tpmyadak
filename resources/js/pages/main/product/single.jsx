import '../../../../css/pembla.css'
import FrontLayout from "@/layouts/front/front-layout.jsx";
import {Deferred, router} from "@inertiajs/react";
import {useCart} from "react-use-cart";
import {showToast} from "@/utils.js";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import {Minus, Plus, ShoppingCart, Star, SquareCheckBig, Heart} from "lucide-react";
import RelatedProducts from "@/pages/main/product/partials/related-products.jsx";
import Review from "@/components/review.jsx";
import ReviewForm from "@/components/review-form.jsx";
import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useState} from "react";
import Badge from "@/components/daisy-ui/badge.jsx";

const Share = ({slug}) => {

    return (
        <div className="d-flex  pattr mt-3" key={444444442}>
            <span className="ml-auto">اشتراک گذاری:</span>
            <span className="text-muted fs-6_5">
                <button className="btn btn-sm btn-outline-secondary   " data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="اشتراک گذاری مستقیم"
                        onClick={() => {
                            navigator.clipboard.writeText(`https://kadooyab.com/product/${String(slug)}`)
                            toast.success('لینک کپی شد.');
                        }

                        }
                >
                    کپی لینک
                </button>
            </span>
        </div>


    )
}
const Thumb = (props) => {
    const {selected, index, onClick, img, ali} = props

    return (
        <div key={index}
             className={'pembla-thumbs__slide'.concat(
                 selected ? ' pembla-thumbs__slide--selected' : ''
             )}
        >
            <button
                onClick={onClick}
                type="button"
                className="btn p-0"
            >
                <img src={img} alt={ali} onClick={onClick}
                     width="75" height={75} loading={index === 0 ? "eager" : "lazy"}
                />
            </button>
        </div>
    )
}
export default function ProductSingle({product, attributeGroups = [],relatedProducts,reviews,canReview,images}) {
    const {addItem} = useCart();
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomSrc, setZoomSrc] = useState('');
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({direction: 'rtl',})
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        direction: 'rtl',
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )
    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])
    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()

        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    const handleZoom = (e, fullscreen) => {
        e.preventDefault()
        setZoomSrc(fullscreen)
        setIsZoomed(true)
    }
    const handleAdd = (item) => {
        addItem({
            id: item.id,
            sku: item.sku,
            title: item.title,
            excerpt: item.excerpt,
            discount: item.discount,
            image: item.image,
            price: item.price,
            stock: item.stock,
        })
        showToast('محصول به سبد خرید اضافه شد', 'success')
    }
    const handleWish = (item) => {
        router.post(route('user.wishlists.store'), {item: item}, {
            forceFormData: true,
            onSuccess: () => showToast('محصول به لیست خرید اضافه شد', 'success'),
        })
    }

    return (
        <>
            <Breadcrumb l1={['محصولات', 'home.getProducts']} l2={[product.title, 'home.getProduct', product.sku]}/>
            <section className="relative container">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
                        <div className="pembla">
                            <div className="pembla__viewport" ref={emblaMainRef}>
                                <div className="pembla__container">
                                    {images.map((img, index) => (
                                        <div className="pembla__slide" key={index}>
                                            <picture className="d-flex align-items-center  cursor-pointer">
                                                <source srcSet={img.thumbnail} media="(max-width:580px)"
                                                        type="image/webp"/>
                                                <source srcSet={img.original} media="(min-width:581px)"
                                                        type="image/webp"/>
                                                <source srcSet={img.main} media="(min-width:800px)" type="image/webp"/>
                                                <source srcSet={img.fullscreen} media="(min-width:1401px)"
                                                        type="image/jpg"/>

                                                <img src={img.fullscreen} alt={product.title} width={510} height={510}
                                                     className="card-pr-img-top  mx-auto articleShakes"
                                                     onClick={(e) => handleZoom(e, isMobile ? img.main : img.fullscreen)}
                                                     loading={index === 0 ? "eager" : "lazy"}
                                                />
                                            </picture>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            <div className="pembla-thumbs">
                                <div className="pembla-thumbs__viewport" ref={emblaThumbsRef}>
                                    <div className="pembla-thumbs__container justify-center gap-3">
                                        {images.map((img, index) => (
                                            <Thumb
                                                key={index}
                                                onClick={() => onThumbClick(index)}
                                                selected={index === selectedIndex}
                                                index={index}
                                                img={img.thumbnailxs}
                                                ali={product.title}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isZoomed &&
                            <div id="myModal" className={`myModal ${isZoomed && 'd-block'}`}
                                 onClick={() => setIsZoomed(false)}>
                                <img src={zoomSrc} alt='zoomed' className="myModal-content"/>
                            </div>
                        }
                        {/*<div className="img">*/}
                        {/*    <div className="img-box h-full max-lg:mx-auto ">*/}
                        {/*        <img src={route('file.show', product.image)} alt="Yellow Tropical Printed Shirt image" className="max-lg:mx-auto lg:ml-auto h-full object-cover"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div
                            className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                            <div className="data w-full max-w-xl">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                                    {product.title}
                                </h2>
                                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 ml-5">
                                        {parseInt(product.price) !== 0 ? (
                                            <>{parseInt(product.price).toLocaleString('en')} میلیون</>

                                        ):(
                                            <Badge type="primary" outline={true}>ناموجود</Badge>
                                        )}
                                    </h6>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                                            <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>

                                        </div>
                                        <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">1624
                                            نظر</span>

                                    </div>

                                </div>

                                <p className="text-gray-500 text-base font-normal mb-5">
                                    {product.excerpt}
                                    {/*<a href="#" className="text-indigo-600">More....</a>*/}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-5">
                                    <div className="">
                                        <ul className="list  gap-y-1 ">
                                            <li className="list-row flex justify-between items-center">
                                                <div className="w-32"><strong>برند:</strong></div>
                                                <div>{product.brand.title}</div>
                                            </li>
                                            {product.filters.map((filter, i) =>
                                                <li className="list-row flex justify-between items-center" key={i}>
                                                    <div className="w-32"><strong>{filter.title}:</strong></div>
                                                    <div>{filter.pivot.value}</div>
                                                </li>
                                            )}


                                        </ul>
                                    </div>
                                    <div className=" ">
                                        <ul className="list  gap-y-1 ">
                                            {attributeGroups.length > 0 && attributeGroups.map((attr, i) =>
                                                <li className="list-row flex justify-between items-center">
                                                    <div className="w-32"><strong>{attr.group_title}:</strong></div>
                                                    <div>
                                                        {attr.attributes.map((attribute, i) =>
                                                            <button className="bg-white text-center py-1 px-4 w-full font-semibold
                                            text-xs leading-8 text-gray-900 border border-gray-200 flex items-center
                                             rounded-full justify-center transition-all duration-300 hover:bg-gray-50
                                              hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300
                                              visited:border-gray-300 visited:bg-gray-50 mb-2"
                                                                    // onClick={()=>{
                                                                    //     updateItem(product.id, {
                                                                    //         price: prc,
                                                                    //         tax: Math.ceil((prc / 10) / 10000) * 10000
                                                                    //     });}}
                                                            >
                                                                {attribute.title}
                                                                {/*{attribute.add_price}*/}
                                                            </button>
                                                        )}
                                                    </div>
                                                </li>
                                            )}
                                        </ul>

                                    </div>
                                </div>
                                <div className="Availability inline-block font-bold mb-5 mr-auto">
                                    <span className="text-gray-400 text-xs">موجودی: </span>
                                    <span className="text-gray-400 text-xs px-1">
                                        {product.stock === 0 ? (
                                            <>ناموجود</>
                                        ):(
                                            <>موجود در انبار</>
                                        )}

                                    </span>
                                    <SquareCheckBig className="w-4 h-4 text-primary inline-block"/>
                                    ({product.stock} عدد)
                                </div>
                                <div className="flex justify-start items-center  w-full">
                                    <div className="w-32"><strong>مناسب برای:</strong></div>
                                    <div className="flex flex-wrap gap-2 max-w-md">
                                        {product.car_models.map((carModel, i) =>
                                            <div key={i} className="badge badge-neutral badge-dash ruby">
                                                {carModel.title}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">

                                    <button onClick={() => handleWish(product)}
                                            className="group transition-all duration-500 p-4 w-auto  flex items-center
                                         justify-center gap-2  rounded-full bg-indigo-50
                                         hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                                        <Heart width="26" height="26"/>
                                        اضافه به علامندی
                                    </button>
                                    {/*<div className="flex sm:items-center sm:justify-center w-full">*/}
                                    {/*    <button className="group py-3 px-6 border border-gray-400 rounded-r-full*/}
                                    {/*    bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm*/}
                                    {/*     hover:shadow-gray-300">*/}
                                    {/*        <Minus className="stroke-gray-900 group-hover:stroke-black"/>*/}

                                    {/*    </button>*/}
                                    {/*    <input type="text" className="font-semibold text-gray-900 cursor-pointer*/}
                                    {/*     text-lg py-[10px] px-6 w-full sm:max-w-[118px] outline-0 border-y*/}
                                    {/*     border-gray-400 bg-transparent placeholder:text-gray-900 text-center*/}
                                    {/*      hover:bg-gray-50" placeholder="1"/>*/}
                                    {/*    <button className="group py-3 px-6 border border-gray-400 rounded-l-full*/}
                                    {/*     bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm*/}
                                    {/*      hover:shadow-gray-300">*/}
                                    {/*        <Plus className="stroke-gray-900 group-hover:stroke-black"/>*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                    <button onClick={() => handleAdd(product)}
                                            className="group py-3 px-5 rounded-full bg-red-600 text-base-100
                                        font-semibold text-lg w-full flex items-center justify-center gap-2
                                        transition-all duration-500 hover:bg-indigo-100">
                                        <ShoppingCart className=" " width={22} height={22}/>
                                        افزودن به سبد خرید
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* name of each tab group should be unique */}

                <div className="mt-10 border-t border-gray-200 pt-10">
                    <div className="tabs tabs-lift">
                        <input type="radio" name="my_tabs_3" className="tab" aria-label="معرفی"/>
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <div dangerouslySetInnerHTML={{__html: product.about}}/>
                            <div className="prose prose-sm mt-4 text-gray-500">
                                <ul className="list  gap-y-4 mb-8">
                                    {product.specs.map((specs, i) =>
                                        <li className="list-row flex justify-start" key={i}>
                                            <div className="w-48"><strong>{specs.title}:</strong></div>
                                            <div>{specs.value}</div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_3" className="tab" aria-label="بررسی تخصصی" defaultChecked/>
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <div dangerouslySetInnerHTML={{__html: product.description}}/>
                        </div>

                        <input type="radio" name="my_tabs_3" className="tab" aria-label="دیدگاه ها"/>
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            {reviews.map((review, reviewIdx) => (
                                <Review review={review} i={reviewIdx}/>
                            ))}
                            {canReview ?(
                                <ReviewForm reviewType='product' model_id={product.id}/>
                            ):(
                                <div role="alert" className="alert alert-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>شما دیدگاه خود را قبلا ارسال کرده اید.</span>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </section>
            <RelatedProducts relatedProducts={relatedProducts} handleAdd={handleAdd} handleWish={handleWish}/>
        </>
    )
}
ProductSingle.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
