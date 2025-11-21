import {Link} from "@inertiajs/react";

export default function ProductCategories({productCategories}) {
    return (
        <section className="bg-base-100 w-full flex justify-center py-12">
            {/* -----------------------Top featured collections------ */}
            <div className="container">
                <div className="text-center">
                    <h5 className=" text-[#d8330a] text-base">
                        پربازدیدترین مجموعه‌ها
                    </h5>
                    {/* <div className="rounded-full w-3 h-3 bg-[#d8330a] text-center"></div> */}

                    <h3 className="text-2xl font-extrabold  my-4">
                        خرید بر اساس دسته بندی
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
                        {productCategories.map((productCategory,i)=>
                            <div key={i} className="flex flex-col border-[1px] border-gray-300 p-5 bg-base-100 justify-center items-center">
                                <Link href={route('home.getCategory',productCategory.slug)} title="oilfluid" className="inline-block">
                                    {productCategory.image!==null ?(
                                        <img src={route('file.show',{file:productCategory.image,dir:'category/'})} alt="oilfluid" className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"/>
                                    ):(
                                        <img  src='/thumbnail.webp' alt="oilfluid" className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"/>
                                    )}

                                </Link>
                                <div className="  mt-5">
                                    <h6 className="text-base font-blod">{productCategory.title}</h6>

                                    <ul className="pr-4">
                                        {(productCategory.children && productCategory.children.length >0) && productCategory.children.map((child,i)=>
                                        <li className="text-gray-400 list-disc hover:text-[#d8330a] hover:transition hover:duration-300 hover:ease-in py-1" key={i}>
                                            <Link href={route('home.getCategory',child.slug)} title="breakoil">
                                                {child.title}
                                            </Link>
                                        </li>
                                        )}

                                    </ul>

                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}
