import '../../../../css/bembla.css'
import FrontLayout from "@/layouts/front/front-layout.jsx";
import {Deferred, Link, router} from "@inertiajs/react";
import {useState} from "react";
import ProductCard from "@/components/common/product-card.jsx";
import {useCart} from "react-use-cart";
import {showToast} from "@/utils.js";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import ListSidebar from "@/pages/main/product/list-sidebar.jsx";
import {NextButton, PrevButton, usePrevNextButtons} from "@/components/common/carousalArrowButtons.jsx";
import {SelectedSnapDisplay, useSelectedSnapDisplay} from "@/components/common/carousalSelectedSnapDisplay.jsx";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import {Card} from "@/components/index/index.js";

export default function ProductList(props) {
    const {data: {links, data}, brands=null, carBrands=null, carModels=null,categories=null,filters=null, productCategory} = props

    const {addItem} = useCart();
    const [sortColumn, setSortColumn] = useState('')

    const [emblaRef, emblaApi] = useEmblaCarousel({align: 'start', direction: 'rtl', loop: true },[Autoplay()])
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)
    const sortList = (e) => {
        setSortColumn(e.target.value)
        router.get(
            route(route().current(),productCategory.slug),
            {column: e.target.value},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true
            }
        )
    }

    const handleAdd = (item) => {
        addItem({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            discount: item.discount,
            image: item.image,
            price: item.price,
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
            <Breadcrumb l1={['دسته بندی', '']} l2={[productCategory.title,'']}/>
            <section className="w-full container justify-center mb-12">
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-2 lg:gap-x-8 xl:gap-x-10">
                    <ListSidebar brands={brands} carBrands={carBrands} carModels={carModels} categories={categories} filters={filters} routeParam={productCategory.slug}/>
                    {/* ------ left side----- */}
                    <div className="md:col-span-8 lg:col-span-9 mt-6 md:mt-0">
                        <h2 className="font-bold text-2xl pb-6">
                            زیردسته های موجود در : {productCategory.title}
                        </h2>
                        {(productCategory.children && productCategory.children.length >0) &&
                            <section className="bembla relative">
                                <div className="bembla__viewport" ref={emblaRef}>
                                    <div className="bembla__container">
                                        { productCategory.children.map((item,index) => (
                                            <div className="bembla__slide" key={index}>
                                                <Card>
                                                    <figure>
                                                        {item.image!==null ?(
                                                            <img  src={route('file.show',{file:item.image,dir:'category/'})}
                                                                  className='h-22' alt='slide'/>
                                                        ):(
                                                            <img  src='/thumbnail.webp' className='h-22' alt='slide'/>
                                                        )}
                                                    </figure>
                                                    <div className="card-body text-center p-2">
                                                        <Link href={route('home.getCategory',item.slug)}>
                                                            <h2 className="card-title justify-center text-sm">{item.title}</h2>
                                                        </Link>
                                                        {item.description !==null&& <p>{item.description}</p>}

                                                    </div>
                                                </Card>


                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bembla__controls">
                                    <div className="bembla__buttons">
                                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                                    </div>

                                    <SelectedSnapDisplay
                                        selectedSnap={selectedSnap}
                                        snapCount={snapCount}
                                    />
                                </div>
                            </section>
                        }

                        <div className="my-8 text-left">
                            <label htmlFor="cars">مرتب سازی</label>
                            <select name="cars" id="cars" className="border-[1px] border-gray-300 px-1 mx-2"
                                    value={sortColumn}
                                    onChange={(e) => sortList(e)}>
                                <option value={['created_at', 'desc']}>جدیدترین</option>
                                <option value={['price', 'asc']}>ارزانترین</option>
                                <option value={['price', 'desc']}>گرانترین</option>
                                {/*<option value="audi">منتخب</option>*/}
                            </select>
                        </div>
                        <div className="-mx-px grid grid-cols-1 border-l border-gray-200 sm:mx-0  sm:grid-cols-2 lg:grid-cols-4 ">
                            {data.map((product, i) => (
                                <ProductCard product={product} key={i} handleAdd={() => handleAdd(product)}
                                             handleWish={() => handleWish(product)}/>
                            ))}

                        </div>
                        <div className="border-[1px] border-gray-200 mt-8"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
ProductList.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
