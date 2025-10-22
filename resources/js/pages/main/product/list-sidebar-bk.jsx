import bannerSide from '../../../../images/banner-sidebar.jpg'
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

    const [brandFilter, setBrandFilter] = useState([]);
    const [carBrandsFilter, setCarBrandsFilter] = useState([]);
    const [carModelsFilter, setCarModelsFilter] = useState([]);
    const [categoriesFilter, setCategoriesFilter] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({}); // {filterId: [values...]}

    // --- ثابت ها ---
    const filterPrice = (min, max) => {
        setPriceMin(min);
        setPriceMax(max);
        router.get(
            route(route().current(), routeParam),
            { priceMin: min, priceMax: max },
            { replace: true, preserveState: true, preserveScroll: true }
        );
    }

    const handleCheckboxFilter = (array, group) => {
        router.get(
            route(route().current(), routeParam),
            { arrayFilter: array, group: group },
            { replace: true, preserveState: true, preserveScroll: true }
        );
    }

    // --- فیلترهای داینامیک ---
    const handleDynamicFilters = (filterId, values) => {
        setSelectedFilters(prev => {
            const updated = { ...prev, [filterId]: values };

            router.get(
                route('home.getCategory', routeParam?.slug || routeParam),
                { dynamicFilters: updated },
                { replace: true, preserveState: true, preserveScroll: true }
            );

            return updated;
        });
    }

    return (
        <div className="md:col-span-4 lg:col-span-3">
            <div className="border-[1px] border-gray-300 border-t-[#ff2d37] rounded-md overflow-hidden">
                <div className="bg-[#ff2d37] text-base-100 py-3 px-7 font-semibold">
                    فیلترها
                </div>

                <ul className="bg-base-100 py-4">
                    {/* موجودی و تخفیف */}
                    <li>
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-5">
                            <label className="label flex justify-between items-center">
                                <input type="checkbox" defaultChecked className="toggle"/>
                                <div>فقط موجود ها</div>
                            </label>
                        </fieldset>
                    </li>
                    <li>
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-5">
                            <label className="label flex justify-between items-center">
                                <input type="checkbox" defaultChecked className="toggle"/>
                                <div>تخفیف دار ها</div>
                            </label>
                        </fieldset>
                    </li>

                    {/* محدوده قیمت */}
                    <li>
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-5">
                            <div className="">محدوده قیمت</div>
                            <MultiRangeSlider min={0} max={99000000} onChange={({ min, max }) => filterPrice(min, max)} />
                        </fieldset>
                    </li>

                    {/* برندها */}
                    {brands && (
                        <li>
                            <div className="collapse collapse-plus bg-base-100 px-4">
                                <input type="radio" name="my-accordion-3" defaultChecked/>
                                <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                    برند ها
                                </div>
                                <div className="collapse-content mt-4 p-0">
                                    <ul className="max-h-50 space-y-2 overflow-y-auto py-3">
                                        <SearchFilter
                                            groupName="brands"
                                            data={brands}
                                            selected={brandFilter}
                                            setSelected={setBrandFilter}
                                            handleCheckboxFilter={handleCheckboxFilter}
                                        />
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )}

                    {/* برند خودرو */}
                    {carBrands && (
                        <li>
                            <div className="collapse collapse-plus bg-base-100 px-4">
                                <input type="radio" name="my-accordion-3"/>
                                <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                    برند خودرو
                                </div>
                                <div className="collapse-content mt-4 p-0">
                                    <ul className="max-h-50 space-y-2 overflow-y-auto py-3">
                                        <SearchFilter
                                            groupName="carBrands"
                                            data={carBrands}
                                            selected={carBrandsFilter}
                                            setSelected={setCarBrandsFilter}
                                            handleCheckboxFilter={handleCheckboxFilter}
                                        />
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )}

                    {/* نوع خودرو */}
                    {carModels && (
                        <li>
                            <div className="collapse collapse-plus bg-base-100 px-4">
                                <input type="radio" name="my-accordion-3"/>
                                <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                    نوع خودرو
                                </div>
                                <div className="collapse-content mt-4 p-0">
                                    <ul className="max-h-50 space-y-2 overflow-y-auto py-3">
                                        <SearchFilter
                                            groupName="carModels"
                                            data={carModels}
                                            selected={carModelsFilter}
                                            setSelected={setCarModelsFilter}
                                            handleCheckboxFilter={handleCheckboxFilter}
                                        />
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )}

                    {/* دسته بندی */}
                    {categories && (
                        <li>
                            <div className="collapse collapse-plus bg-base-100 px-4">
                                <input type="radio" name="my-accordion-3"/>
                                <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                    دسته بندی
                                </div>
                                <div className="collapse-content mt-4">
                                    <ul className="max-h-50 space-y-2 overflow-y-auto py-3">
                                        <SearchFilter
                                            groupName="categories"
                                            data={categories}
                                            selected={categoriesFilter}
                                            setSelected={setCategoriesFilter}
                                            handleCheckboxFilter={handleCheckboxFilter}
                                        />
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )}

                    {/* فیلترهای داینامیک */}
                    {filters && filters.map(filter => (
                        <li key={filter.id}>
                            <div className="collapse collapse-plus bg-base-100 px-4">
                                <input type="radio" name="accordion-filters" />
                                <div className="collapse-title text-gray-600 text-sm font-medium border-b border-gray-300">
                                    {filter.title}
                                </div>
                                <div className="collapse-content mt-4">
                                    <SearchFilter
                                        groupName={filter.title}
                                        data={filter.values.map(v => ({ label: v, value: v }))}
                                        selected={selectedFilters[filter.id] || []}
                                        setSelected={(updated) => handleDynamicFilters(filter.id, updated)}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}

                    {children}
                </ul>
            </div>
        </div>
    );
}
