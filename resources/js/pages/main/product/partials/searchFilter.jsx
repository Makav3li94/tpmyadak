import React, {useState} from "react";
import {Search} from "lucide-react";

export default function SearchFilter({ data = [], groupName = "", setSelected,handleCheckboxFilter }) {
    const [query, setQuery] = useState("");


    const filteredData = data.filter((item) => {
        const label = item?.label || "";
        return label.toLowerCase().includes(query.toLowerCase().trim());
    });
    const handleCheckboxChange = (value, checked) => {
        // setSelected((prev = []) => {
        //     return checked
        //         ? [...prev, value]
        //         : prev.filter((v) => v !== value);
        // });
        setSelected((prev) => {
            const updated = checked
                ? [...prev, value]
                : prev.filter((v) => v !== value);

            // اگه پدر بخواد از بیرون کنترل کنه:
            handleCheckboxFilter?.(updated,groupName);

            return updated;
        });
    };

    return (
        <div className="max-w-sm mx-auto ">

            <label className="flex items-center gap-2 border rounded-xl px-3 py-2 w-54 shadow-sm bg-white">
                <Search className="h-5 w-5 opacity-50" />
                <input
                    type="search"
                    placeholder="جستجو..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full outline-none text-right"
                />
            </label>

            <ul className="mt-4 space-y-2">
                {filteredData.length > 0 ? (
                    filteredData.map((item,i) => (
                        <li key={item.value} >
                            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box  border px-4 ">
                                <label className="label" key={i}>
                                    <input type="checkbox" name={`${groupName}[]`} className="checkbox"
                                           onChange={(e) =>
                                               handleCheckboxChange(item.value, e.target.checked)
                                           }
                                           value={item.value}/>
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
