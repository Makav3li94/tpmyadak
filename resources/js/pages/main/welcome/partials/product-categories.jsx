import categories01 from "../../../../../images/cate1.jpg";
import categories02 from "../../../../../images/cate2.jpg";
import categories03 from "../../../../../images/cate3.jpg";
export default function ProductCategories(props) {
    return (
        <section className="bg-white w-full flex justify-center ">
            {/* -----------------------Top featured collections------ */}
            <div className="container">
                <div className="text-center">
                    <h5 className=" text-[#ff2d37] text-base">
                        پربازدیدترین مجموعه‌ها
                    </h5>
                    {/* <div className="rounded-full w-3 h-3 bg-[#ff2d37] text-center"></div> */}

                    <h3 className="text-2xl font-extrabold text-[#333333] my-4">
                        خرید بر اساس دسته بندی
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-2 xl:gap-x-5 mt-12">
                        <div className="flex lg:col-span-4 px-3 border-[1px] border-gray-300 p-5 mb-4">
                            <a href="#" title="oilfluid" className="inline-block">
                                <img
                                    src={categories01}
                                    alt="oilfluid"
                                    className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"
                                />
                            </a>
                            <div className="pr-5 text-right">
                                <h6 className="text-base font-blod">روغن ماشین</h6>

                                <ul className="pr-4">
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="breakoil">
                                            روغن ترمز
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="oil">
                                            روغن فرمان
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="hydrolicoil">
                                            روغن هیدرولیک
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="engineoil">
                                            روغن موتور
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="hydrolicoil">
                                            روغن هیدرولیک
                                        </a>
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    title="more"
                                    className="bg-[#333333] text-[white] py-2 px-3 rounded-md hover:bg-[#ff2d37] transition duration-300 ease-in inline-block my-5"
                                >
                                    بیشتر بخوانید
                                </a>
                            </div>
                        </div>
                        <div className="flex lg:col-span-4 px-3 border-[1px] border-gray-300 p-5 mb-4 ">
                            <a href="#" title="oilfluid" className="inline-block">
                                <img
                                    src={categories02}
                                    alt="oilfluid"
                                    className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"
                                />
                            </a>
                            <div className="pr-5 text-right">
                                <h6 className="text-base font-blod">دستگاه های هوشمند</h6>

                                <ul className="pr-3">
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="breakoil">
                                            بلوتوث
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="oil">
                                            مانیتورها
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="hydrolicoil">
                                            ساعت هوشمند
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="engineoil">
                                            پورت یو اس بی{" "}
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="hydrolicoil">
                                            دوربین هوشمند{" "}
                                        </a>
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    title="more"
                                    className="bg-[#333333] text-[white] py-2 px-3 rounded-md hover:bg-[#ff2d37] transition duration-300 ease-in inline-block my-5"
                                >
                                    بیشتر بخوانید
                                </a>
                            </div>
                        </div>
                        <div className="flex lg:col-span-4 px-3 border-[1px] border-gray-300 p-5 mb-4 ">
                            <a href="#" title="oilfluid" className="inline-block">
                                <img
                                    src={categories03}
                                    alt="oilfluid"
                                    className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"
                                />
                            </a>
                            <div className="pr-5 text-right">
                                <h6 className="text-base font-blod">تایر و لاستیک</h6>

                                <ul className="pr-4">
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="tire">
                                            تایر
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="chain">
                                            زنجیر چرخ
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="tireaccessories">
                                            لوازم جانبی{" "}
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="wheels">
                                            لاستیک{" "}
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="wheelsacc">
                                            لوازم جانبی لاستیک{" "}
                                        </a>
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    title="more"
                                    className="bg-[#333333] text-[white] py-2 px-3 rounded-md hover:bg-[#ff2d37] transition duration-300 ease-in inline-block my-5"
                                >
                                    بیشتر بخوانید
                                </a>
                            </div>
                        </div>
                        <div className="flex lg:col-span-4 px-3 border-[1px] border-gray-300 p-5 mb-4">
                            <a href="#" title="oilfluid" className="inline-block">
                                <img
                                    src={categories01}
                                    alt="oilfluid"
                                    className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"
                                />
                            </a>
                            <div className="pr-5 text-right">
                                <h6 className="text-base font-blod">روغن ماشین</h6>

                                <ul className="pr-4">
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="breakoil">
                                            روغن ترمز
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="oil">
                                            روغن فرمان
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="hydrolicoil">
                                            روغن هیدرولیک
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="engineoil">
                                            روغن موتور
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] hover:transition hover:duration-300 hover:ease-in py-1">
                                        <a href="#" title="hydrolicoil">
                                            روغن هیدرولیک
                                        </a>
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    title="more"
                                    className="bg-[#333333] text-[white] py-2 px-3 rounded-md hover:bg-[#ff2d37] transition duration-300 ease-in inline-block my-5"
                                >
                                    بیشتر بخوانید
                                </a>
                            </div>
                        </div>
                        <div className="flex lg:col-span-4 px-3 border-[1px] border-gray-300 p-5 mb-4 ">
                            <a href="#" title="oilfluid" className="inline-block">
                                <img
                                    src={categories02}
                                    alt="oilfluid"
                                    className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"
                                />
                            </a>
                            <div className="pr-5 text-right">
                                <h6 className="text-base font-blod">دستگاه های هوشمند</h6>

                                <ul className="pr-3">
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="breakoil">
                                            بلوتوث
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="oil">
                                            مانیتورها
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="hydrolicoil">
                                            ساعت هوشمند
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="engineoil">
                                            پورت یو اس بی{" "}
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="hydrolicoil">
                                            دوربین هوشمند{" "}
                                        </a>
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    title="more"
                                    className="bg-[#333333] text-[white] py-2 px-3 rounded-md hover:bg-[#ff2d37] transition duration-300 ease-in inline-block my-5"
                                >
                                    بیشتر بخوانید
                                </a>
                            </div>
                        </div>
                        <div className="flex lg:col-span-4 px-3 border-[1px] border-gray-300 p-5 mb-4 ">
                            <a href="#" title="oilfluid" className="inline-block">
                                <img
                                    src={categories03}
                                    alt="oilfluid"
                                    className="lg:w-[130px] lg:h-[160px] xl:w-[170px] xl:h-[200px] hover:scale-105"
                                />
                            </a>
                            <div className="pr-5 text-right">
                                <h6 className="text-base font-blod">تایر و لاستیک</h6>

                                <ul className="pr-4">
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="tire">
                                            تایر
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="chain">
                                            زنجیر چرخ
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="tireaccessories">
                                            لوازم جانبی{" "}
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="wheels">
                                            لاستیک{" "}
                                        </a>
                                    </li>
                                    <li className="text-gray-400 list-disc hover:text-[#ff2d37] transition duration-300 ease-in py-1">
                                        <a href="#" title="wheelsacc">
                                            لوازم جانبی لاستیک{" "}
                                        </a>
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    title="more"
                                    className="bg-[#333333] text-[white] py-2 px-3 rounded-md hover:bg-[#ff2d37] transition duration-300 ease-in inline-block my-5"
                                >
                                    بیشتر بخوانید
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
