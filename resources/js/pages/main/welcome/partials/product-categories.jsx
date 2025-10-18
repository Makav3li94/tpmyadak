import {Link} from "@inertiajs/react";

export default function ProductCategories({productCategories}) {
    return (
        <section className="bg-base-200 w-full flex justify-center py-12">
            {/* -----------------------Top featured collections------ */}
            <div className="container">
                <div className="text-center">
                    <h5 className=" text-[#ff2d37] text-base">
                        پربازدیدترین مجموعه‌ها
                    </h5>
                    {/* <div className="rounded-full w-3 h-3 bg-[#ff2d37] text-center"></div> */}

                    <h3 className="text-2xl font-extrabold  my-4">
                        خرید بر اساس دسته بندی
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-2 xl:gap-x-5 mt-12">
                        {productCategories.map((productCategory,i)=>
                            <div className="flex lg:col-span-4 px-3 border-[1px] border-gray-300 p-5 mb-4 bg-base-100" key={i}>
                                <Link href="#" title="oilfluid" className="inline-block">
                                    <img src={route('file.show',productCategory.image)} alt="oilfluid" className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"/>
                                </Link>
                                <div className="pr-5 text-right">
                                    <h6 className="text-base font-blod">{productCategory.title}</h6>

                                    <ul className="pr-4">
                                        {(productCategory.children && productCategory.children.length >0) && productCategory.children.map((child,i)=>
                                        <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1" key={i}>
                                            <Link href="#" title="breakoil">
                                                {child.title}
                                            </Link>
                                        </li>
                                        )}

                                    </ul>
                                    <Link
                                        href="#"
                                        title="more"
                                        className="bg-[#333333] text-[white] py-2 px-3 rounded-md hover:bg-[#ff2d37] transition duration-300 ease-in inline-block my-5"
                                    >
                                        مشاهده همه
                                    </Link>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}
