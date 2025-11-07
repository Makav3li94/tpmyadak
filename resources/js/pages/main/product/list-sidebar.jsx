import { router } from "@inertiajs/react";
import { useState } from "react";
import MultiRangeSlider from "@/pages/main/product/partials/MultiRangeSlider.jsx";
import SearchFilter from "@/pages/main/product/partials/searchFilter.jsx";

export default function ListSidebar({
                                        brands = null,
                                        carBrands = null,
                                        carModels = null,
                                        categories = null,
                                        filters = null,
                                        routeParam = null,
                                        children
                                    }) {
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

    // --- فیلتر قیمت ---
    const filterPrice = (min, max) => {
        setPriceMin(min);
        setPriceMax(max);
        router.get(
            route(route().current(), routeParam),
            { priceMin: min, priceMax: max, staticFilters, dynamicFilters },
            { replace: true, preserveState: true, preserveScroll: true }
        );
    };

    // --- فیلترهای ثابت ---
    const handleStaticFilters = (group, values) => {
        setStaticFilters(prev => {
            const updated = { ...prev, [group]: values };
            router.get(
                route(route().current(), routeParam),
                { priceMin, priceMax, staticFilters: updated, dynamicFilters },
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
                { priceMin, priceMax, staticFilters, dynamicFilters: updated },
                { replace: true, preserveState: true, preserveScroll: true }
            );
            return updated;
        });
    };

    return (

        <div className="md:col-span-4 lg:col-span-3 lg:px-0  px-3">
            <div className="drawer lg:drawer-open flex">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-3" className="btn btn-xs btn-error text-base-100 drawer-button lg:hidden fixed right-0 top-2/4 z-1">
                        فیلترها
                    </label>
                </div>
                <div className="drawer-side h-full">
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
                                        <input type="checkbox" defaultChecked className="toggle" />
                                        <div>فقط موجود ها</div>
                                    </label>
                                </fieldset>
                            </li>
                            <li>
                                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full lg:w-64 border p-4 mb-5">
                                    <label className="label flex justify-between items-center">
                                        <input type="checkbox" defaultChecked className="toggle" />
                                        <div>تخفیف دار ها</div>
                                    </label>
                                </fieldset>
                            </li>

                            {/* محدوده قیمت */}
                            <li>
                                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full lg:w-64 border p-4 mb-5">
                                    <div className="">محدوده قیمت</div>
                                    <MultiRangeSlider min={0} max={99000000} onChange={({ min, max }) => filterPrice(min, max)} />
                                </fieldset>
                            </li>

                            {/* فیلترهای ثابت */}
                            {brands && (
                                <li>
                                    <div className="collapse collapse-plus bg-base-100 px-4">
                                        <input type="radio" name="filter-brands" defaultChecked />
                                        <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                            برند ها
                                        </div>
                                        <div className="collapse-content mt-4 p-0">
                                            <SearchFilter
                                                groupName="brands"
                                                data={brands}
                                                selected={staticFilters.brands}
                                                setSelected={(values) => handleStaticFilters('brands', values)}
                                            />
                                        </div>
                                    </div>
                                </li>
                            )}

                            {carBrands && (
                                <li>
                                    <div className="collapse collapse-plus bg-base-100 px-4">
                                        <input type="radio" name="filter-carBrands" />
                                        <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                            برند خودرو
                                        </div>
                                        <div className="collapse-content mt-4 p-0">
                                            <SearchFilter
                                                groupName="carBrands"
                                                data={carBrands}
                                                selected={staticFilters.carBrands}
                                                setSelected={(values) => handleStaticFilters('carBrands', values)}
                                            />
                                        </div>
                                    </div>
                                </li>
                            )}

                            {carModels && (
                                <li>
                                    <div className="collapse collapse-plus bg-base-100 px-4">
                                        <input type="radio" name="filter-carModels" />
                                        <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                            نوع خودرو
                                        </div>
                                        <div className="collapse-content mt-4 p-0">
                                            <SearchFilter
                                                groupName="carModels"
                                                data={carModels}
                                                selected={staticFilters.carModels}
                                                setSelected={(values) => handleStaticFilters('carModels', values)}
                                            />
                                        </div>
                                    </div>
                                </li>
                            )}

                            {categories && (
                                <li>
                                    <div className="collapse collapse-plus bg-base-100 px-4">
                                        <input type="radio" name="filter-categories" />
                                        <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                            دسته بندی
                                        </div>
                                        <div className="collapse-content mt-4">
                                            <SearchFilter
                                                groupName="categories"
                                                data={categories}
                                                selected={staticFilters.categories}
                                                setSelected={(values) => handleStaticFilters('categories', values)}
                                            />
                                        </div>
                                    </div>
                                </li>
                            )}

                            {/* فیلترهای داینامیک */}
                            {filters && filters.map(filter => (
                                <li key={filter.id}>
                                    <div className="collapse collapse-plus bg-base-100 px-4">
                                        <input type="radio" name="accordion-dynamic-filters" />
                                        <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                            {filter.title}
                                        </div>
                                        <div className="collapse-content mt-4">
                                            <SearchFilter
                                                groupName={filter.title}
                                                data={filter.values.map(v => ({ label: v, value: v }))}
                                                selected={dynamicFilters[filter.id] || []}
                                                setSelected={(values) => handleDynamicFilters(filter.id, values)}
                                            />
                                        </div>
                                    </div>
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
