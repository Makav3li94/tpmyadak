import '../../../../css/bembla.css'
import FrontLayout from "@/layouts/front/front-layout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import React, {useEffect, useRef, useState} from "react";
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
    const {
        data = {},
        brands = null,
        carBrands = null,
        carModels = null,
        categories = null,
        filters = null,
        productCategory
    } = props;

    const initialProducts = Array.isArray(data.data) ? data.data : [];
    const initialNextPageUrl = data.next_page_url ?? null;
    const initialNextCursor = data.next_cursor ?? null;

    const [products, setProducts] = useState(initialProducts);
    const [nextUrl, setNextUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(Boolean(initialNextPageUrl || initialNextCursor));

    const loaderRef = useRef(null);
    const observerRef = useRef(null);

    // build URL از cursor
    function buildUrlFromCursor(cursorValue) {
        if (!cursorValue) return null;
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.delete('cursor');
        params.set('cursor', cursorValue);
        return `${url.pathname}?${params.toString()}`;
    }

    // مقدار اولیه nextUrl
    useEffect(() => {
        if (initialNextPageUrl) {
            setNextUrl(initialNextPageUrl);
            setHasMore(true);
            return;
        }
        if (initialNextCursor) {
            setNextUrl(buildUrlFromCursor(initialNextCursor));
            setHasMore(true);
            return;
        }
        setNextUrl(null);
        setHasMore(false);
    }, []);

    // IntersectionObserver برای infinite scroll
    useEffect(() => {
        if (!loaderRef.current || !hasMore) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            const e = entries[0];
            if (e.isIntersecting && !loading && nextUrl) loadMore();
        }, {
            root: null,
            rootMargin: '200px',
            threshold: 0.1
        });

        observerRef.current.observe(loaderRef.current);
        return () => observerRef.current?.disconnect();
    }, [nextUrl, loading, hasMore]);

    const loadMore = () => {
        if (!nextUrl || loading || !hasMore) return;
        setLoading(true);

        router.get(nextUrl, {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['data'],
            onSuccess: (res) => {
                const payload = res.props?.data ?? {};
                const newItems = Array.isArray(payload.data) ? payload.data : [];

                setProducts(prev => {
                    const merged = [...prev, ...newItems];
                    const seen = new Set();
                    return merged.filter(item => {
                        const id = item?.id ?? JSON.stringify(item);
                        if (seen.has(id)) return false;
                        seen.add(id);
                        return true;
                    });
                });

                if (payload.next_page_url) {
                    setNextUrl(payload.next_page_url);
                    setHasMore(true);
                } else if (payload.next_cursor) {
                    setNextUrl(buildUrlFromCursor(payload.next_cursor));
                    setHasMore(true);
                } else {
                    setNextUrl(null);
                    setHasMore(false);
                }
            },
            onFinish: () => setLoading(false)
        });
    };

    const {addItem} = useCart();
    const [sortColumn, setSortColumn] = useState('');

    const [emblaRef, emblaApi] = useEmblaCarousel({align: 'start', direction: 'rtl', loop: true}, [Autoplay()]);
    const {prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick} = usePrevNextButtons(emblaApi);
    const {selectedSnap, snapCount} = useSelectedSnapDisplay(emblaApi);

    const sortList = (e) => {
        setSortColumn(e.target.value);
        router.get(
            route(route().current(), productCategory.slug),
            {column: e.target.value},
            {replace: true, preserveState: true, preserveScroll: true}
        );
    };

    const handleAdd = (item) => {
        addItem({
            id: item.id,
            sku: item.sku,
            title: item.title,
            excerpt: item.excerpt,
            discount: item.discount,
            image: item.image,
            price: item.price,
        });
        showToast('محصول به سبد خرید اضافه شد', 'success');
    };

    const handleWish = (item) => {
        router.post(route('user.wishlists.store'), {item}, {
            forceFormData: true,
            onSuccess: () => showToast('محصول به لیست خرید اضافه شد', 'success'),
        });
    };

    return (
        <>
            <Head title={'محصولات ' + productCategory.title}/>
            <Breadcrumb l1={['دسته بندی', '']} l2={[productCategory.title,'']}/>
            <section className="w-full container justify-center mb-12">
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-2 lg:gap-x-8 xl:gap-x-10">
                    <ListSidebar
                        brands={brands}
                        carBrands={carBrands}
                        carModels={carModels}
                        categories={categories}
                        filters={filters}
                        routeParam={productCategory.slug}
                    />
                    <div className="md:col-span-8 lg:col-span-9 mt-6 md:mt-0">
                        <h2 className="font-bold text-2xl pb-6">
                            زیردسته های موجود در : {productCategory.title}
                        </h2>

                        {productCategory.children?.length > 0 && (
                            <section className="bembla relative">
                                <div className="bembla__viewport" ref={emblaRef}>
                                    <div className="bembla__container">
                                        {productCategory.children.map((item, index) => (
                                            <div className="bembla__slide pl-0" key={index}>
                                                <div className="flex flex-col items-center justify-center border-r border-gray-600 p-1">
                                                    <figure>
                                                        <img
                                                            src={item.image ? route('file.show', {file:item.image, dir:'category/'}) : '/thumbnail.webp'}
                                                            className="h-22"
                                                            alt="slide"
                                                        />
                                                    </figure>
                                                    <div className="card-body text-center p-1 mt-2">
                                                        <Link href={route('home.getCategory', item.slug)}>
                                                            <h2 className="card-title justify-center text-sm">{item.title}</h2>
                                                        </Link>
                                                        {item.description && <p>{item.description}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bembla__controls">
                                    <div className="bembla__buttons jobjob">
                                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                                    </div>
                                    <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount}/>
                                </div>
                            </section>
                        )}

                        <div className="my-8 text-left">
                            <label htmlFor="cars">مرتب سازی</label>
                            <select
                                name="cars"
                                id="cars"
                                className="border-[1px] border-gray-300 px-1 mx-2"
                                value={sortColumn}
                                onChange={sortList}
                            >
                                <option value={['created_at','desc']}>جدیدترین</option>
                                <option value={['price','asc']}>ارزانترین</option>
                                <option value={['price','desc']}>گرانترین</option>
                            </select>
                        </div>

                        <div className="-mx-px grid grid-cols-1 border-l border-gray-200 sm:mx-0 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product, i) => (
                                <ProductCard key={i} product={product} handleAdd={() => handleAdd(product)} handleWish={() => handleWish(product)}/>
                            ))}
                        </div>

                        {/* loader */}
                        <div ref={loaderRef} className="h-12"></div>
                        {loading && <div className="text-center py-4">در حال بارگذاری...</div>}

                        <div className="border-[1px] border-gray-200 mt-8"></div>
                    </div>
                </div>
            </section>
        </>
    )
}

ProductList.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
