import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SearchFilter({ data = [], groupName = "", selected = [], setSelected, handleCheckboxFilter = null }) {
    const [query, setQuery] = useState("");

    const filteredData = data.filter((item) => {
        const label = item?.label || "";
        return label.toLowerCase().includes(query.toLowerCase().trim());
    });

    const handleCheckboxChange = (value, checked) => {
        const updated = checked
            ? [...selected, value]
            : selected.filter(v => v !== value);

        // فقط آرایه واقعی را به setSelected بده
        setSelected(updated);

        // فقط برای فیلترهای ثابت استفاده شود
        if (handleCheckboxFilter) {
            handleCheckboxFilter(updated, groupName);
        }
    };

    return (
        <div className="max-w-sm mx-auto">
            <label className="flex items-center gap-2 border rounded-xl px-3 py-2 w-full lg:w-54 shadow-sm bg-white">
                <Search className="h-5 w-5 opacity-50" />
                <input
                    type="search"
                    placeholder="جستجو..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full outline-none text-right"
                />
            </label>

            <ul className="my-4 space-y-2 max-h-44 overflow-y-scroll overflow-x-hidden">
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <li key={item.value}>
                            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box border px-4">
                                <label className="label">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={selected.includes(item.value)}
                                        onChange={(e) => handleCheckboxChange(item.value, e.target.checked)}
                                    />
                                    {item.label}
                                </label>
                            </fieldset>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 text-center">نتیجه‌ای یافت نشد</li>
                )}
            </ul>
        </div>
    );
}
