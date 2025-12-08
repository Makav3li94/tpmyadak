import { router } from "@inertiajs/react";
import { useState } from "react";
import MultiRangeSlider from "@/pages/main/product/partials/MultiRangeSlider.jsx";
import SearchFilter from "@/pages/main/product/partials/searchFilter.jsx";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Plus, Minus } from 'lucide-react'

export default function ListSidebar({
                                        brands = null,
                                        carBrands = null,
                                        carModels = null,
                                        categories = null,
                                        filters = null,
                                        routeParam = null,
                                        children
                                    }) {
    // --- فیلترهای پایه ---
    const [inStock, setInStock] = useState(false);
    const [hasPromotion, setHasPromotion] = useState(false);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(99000000);

    // فیلترهای ثابت
    const [staticFilters, setStaticFilters] = useState({
        brands: [],
        carBrands: [],
        carModels: [],
        categories: [],
    });

    // فیلترهای داینامیک
    const [dynamicFilters, setDynamicFilters] = useState({});

    // --- تابع کمکی برای ساخت پارامترهای کامل فیلتر ---
    const getFilterData = (overrides = {}) => ({
        priceMin,
        priceMax,
        staticFilters,
        dynamicFilters,
        in_stock: inStock,
        has_promotion: hasPromotion,
        ...overrides,
    });

    // --- فیلتر قیمت ---
    const filterPrice = (min, max) => {
        setPriceMin(min);
        setPriceMax(max);
        router.get(
            route(route().current(), routeParam),
            getFilterData({ priceMin: min, priceMax: max }),
            { replace: true, preserveState: true, preserveScroll: true }
        );
    };

    // --- فیلترهای ثابت ---
    const handleStaticFilters = (group, values) => {
        setStaticFilters(prev => {
            const updated = { ...prev, [group]: values };
            router.get(
                route(route().current(), routeParam),
                getFilterData({ staticFilters: updated }),
                { replace: true, preserveState: true, preserveScroll: true }
            );
            return updated;
        });
    };

    // --- فیلترهای داینامیک ---
    const handleDynamicFilters = (filterId, values) => {
        setDynamicFilters(prev => {
            const updated = { ...prev, [filterId]: values };
            router.get(
                route(route().current(), routeParam),
                getFilterData({ dynamicFilters: updated }),
                { replace: true, preserveState: true, preserveScroll: true }
            );
            return updated;
        });
    };

    // --- فیلتر موجودی ---
    const handleInStock = () => {
        const newInStock = !inStock;
        setInStock(newInStock);
        router.get(
            route(route().current(), routeParam),
            getFilterData({ in_stock: newInStock }),
            { replace: true, preserveState: true, preserveScroll: true }
        );
    };

    // --- فیلتر تخفیف ---
    const handleHasPromotion = () => {
        const newHasPromotion = !hasPromotion;
        setHasPromotion(newHasPromotion);
        router.get(
            route(route().current(), routeParam),
            getFilterData({ has_promotion: newHasPromotion }),
            { replace: true, preserveState: true, preserveScroll: true }
        );
    };

    return (
        <div className="md:col-span-4 lg:col-span-3 lg:px-0 px-3">
            <div className="drawer lg:drawer-open flex w-full">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-3"
                           className="btn btn-xs btn-error text-base-100 drawer-button lg:hidden fixed right-0 top-3/8 z-1">
                        فیلترها
                    </label>
                </div>
                <div className="drawer-side h-full w-full">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="border-[1px] border-gray-300 border-t-[#d8330a] rounded-md overflow-hidden">
                        <div className="bg-[#d8330a] text-base-100 py-3 px-7 font-semibold">
                            فیلترها
                        </div>

                        <ul className="bg-base-100 py-4">

                            {/* موجودی و تخفیف */}
                            <li>
                                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full lg:w-64 border p-4 mb-5">
                                    <label className="label flex justify-between items-center">
                                        <input type="checkbox" className="toggle" checked={inStock} onChange={handleInStock}/>
                                        <div className="text-base-content">فقط موجود ها</div>
                                    </label>
                                </fieldset>
                            </li>
                            <li>
                                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full lg:w-64 border p-4 mb-5">
                                    <label className="label flex justify-between items-center">
                                        <input type="checkbox" className="toggle" checked={hasPromotion} onChange={handleHasPromotion}/>
                                        <div className="text-base-content">تخفیف دار ها</div>
                                    </label>
                                </fieldset>
                            </li>

                            {/* محدوده قیمت */}
                            <li>
                                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full lg:w-64 border p-4 mb-5">
                                    <div >محدوده قیمت</div>
                                    <MultiRangeSlider min={0} max={99000000} onChange={({ min, max }) => filterPrice(min, max)}/>
                                </fieldset>
                            </li>

                            {/* فیلترهای ثابت */}
                            {brands && (
                                <li className="border-b border-gray-300 mb-2 pb-2">
                                    <Disclosure as="div" className="px-4" defaultOpen={true}>
                                        <dt>
                                            <DisclosureButton className="group flex w-full items-start justify-between text-left">
                                                <span className="text-sm font-medium">برند ها</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <Plus aria-hidden="true" className="h-4 w-4 group-data-[open]:hidden"/>
                                                    <Minus aria-hidden="true" className="h-4 w-4 [.group:not([data-open])_&]:hidden"/>
                                                </span>
                                            </DisclosureButton>
                                        </dt>
                                        <DisclosurePanel as="dd" className="mt-4 p-0">
                                            <SearchFilter
                                                groupName="brands"
                                                data={brands}
                                                selected={staticFilters.brands}
                                                setSelected={(values) => handleStaticFilters('brands', values)}
                                            />
                                        </DisclosurePanel>
                                    </Disclosure>
                                </li>
                            )}

                            {carBrands && (
                                <li className="border-b border-gray-300 mb-2 pb-2">
                                    <Disclosure as="div" className="px-4" defaultOpen={true}>
                                        <dt>
                                            <DisclosureButton className="group flex w-full items-start justify-between text-left">
                                                <span className="text-sm font-medium">برند خودرو</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <Plus aria-hidden="true" className="h-4 w-4 group-data-[open]:hidden"/>
                                                    <Minus aria-hidden="true" className="h-4 w-4 [.group:not([data-open])_&]:hidden"/>
                                                </span>
                                            </DisclosureButton>
                                        </dt>
                                        <DisclosurePanel as="dd" className="mt-4 p-0">
                                            <SearchFilter
                                                groupName="carBrands"
                                                data={carBrands}
                                                selected={staticFilters.carBrands}
                                                setSelected={(values) => handleStaticFilters('carBrands', values)}
                                            />
                                        </DisclosurePanel>
                                    </Disclosure>
                                </li>
                            )}

                            {carModels && (
                                <li className="border-b border-gray-300 mb-2 pb-2">
                                    <Disclosure as="div" className="px-4" defaultOpen={true}>
                                        <dt>
                                            <DisclosureButton className="group flex w-full items-start justify-between text-left">
                                                <span className="text-sm font-medium">نوع خودرو</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <Plus aria-hidden="true" className="h-4 w-4 group-data-[open]:hidden"/>
                                                    <Minus aria-hidden="true" className="h-4 w-4 [.group:not([data-open])_&]:hidden"/>
                                                </span>
                                            </DisclosureButton>
                                        </dt>
                                        <DisclosurePanel as="dd" className="mt-4 p-0">
                                            <SearchFilter
                                                groupName="carModels"
                                                data={carModels}
                                                selected={staticFilters.carModels}
                                                setSelected={(values) => handleStaticFilters('carModels', values)}
                                            />
                                        </DisclosurePanel>
                                    </Disclosure>
                                </li>
                            )}

                            {categories && (
                                <li className="border-b border-gray-300 mb-2 pb-2">
                                    <Disclosure as="div" className="px-4" defaultOpen={true}>
                                        <dt>
                                            <DisclosureButton className="group flex w-full items-start justify-between text-left">
                                                <span className="text-sm font-medium">دسته بندی</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <Plus aria-hidden="true" className="h-4 w-4 group-data-[open]:hidden"/>
                                                    <Minus aria-hidden="true" className="h-4 w-4 [.group:not([data-open])_&]:hidden"/>
                                                </span>
                                            </DisclosureButton>
                                        </dt>
                                        <DisclosurePanel as="dd" className="mt-4 p-0">
                                            <SearchFilter
                                                groupName="categories"
                                                data={categories}
                                                selected={staticFilters.categories}
                                                setSelected={(values) => handleStaticFilters('categories', values)}
                                            />
                                        </DisclosurePanel>
                                    </Disclosure>
                                </li>
                            )}

                            {/* فیلترهای داینامیک */}
                            {filters && filters.map(filter => (
                                <li key={filter.id}>
                                    <Disclosure as="div" className="px-4" defaultOpen={true}>
                                        <dt>
                                            <DisclosureButton className="group flex w-full items-start justify-between text-left">
                                                <span className="text-sm font-medium">{filter.title}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <Plus aria-hidden="true" className="h-4 w-4 group-data-[open]:hidden"/>
                                                    <Minus aria-hidden="true" className="h-4 w-4 [.group:not([data-open])_&]:hidden"/>
                                                </span>
                                            </DisclosureButton>
                                        </dt>
                                        <DisclosurePanel as="dd" className="mt-4 p-0">
                                            <SearchFilter
                                                groupName={filter.title}
                                                data={filter.values.map(v => ({ label: v, value: v }))}
                                                selected={dynamicFilters[filter.id] || []}
                                                setSelected={(values) => handleDynamicFilters(filter.id, values)}
                                            />
                                        </DisclosurePanel>
                                    </Disclosure>
                                </li>
                            ))}

                            {children}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
