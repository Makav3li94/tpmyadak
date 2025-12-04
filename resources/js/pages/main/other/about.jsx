import FrontLayout from "@/layouts/front/front-layout.jsx";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import {Head} from "@inertiajs/react";
import React from "react";
import ProductBrands from "@/pages/main/welcome/partials/product-brands.jsx";
const timeline = [
    {
        name: 'تاسیس شرکت',
        description:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
        date: 'فروردین 1398',
        dateTime: '2021-08',
    },
    {
        name: 'قطعه سازی',
        description:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
        date: 'اسفند 1400',
        dateTime: '2021-12',
    },
    {
        name: 'تامین بازار',
        description:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
        date: 'اردیبهشت 1401',
        dateTime: '2022-02',
    },
    {
        name: 'صادرات جهانی',
        description:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
        date: 'دی 1402',
        dateTime: '2022-12',
    },
]
const features = [
    {
        id: 1,
        role: 'بهترین قیمت',
        description:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    },
    {
        id: 2,
        role: 'بهترین کیفیت',
        description:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    },
    {
        id: 3,
        role: 'تحویل سریع',
        description:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    },
    {
        id: 3,
        role: 'پشتیبانی 24 ساعته',
        description:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ',
    },
]
export default function About({brands}) {

    return (
        <>
            <Head title='درباره ما'/>
            <Breadcrumb l1={['درباره ما', '']}/>
            <section className="relative container">
            <div className="bg-base-100">
                {/* Header */}

                <div className="isolate">
                    {/* Hero section */}
                    <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-red-100/20 pt-14">
                        <div
                            aria-hidden="true"
                            className="absolute inset-y-0 right-1/2 -z-10  w-[200%] origin-top-right skew-x-[-30deg] bg-base-100 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                        />
                        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                            <div
                                className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                                <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl lg:col-span-2 xl:col-auto">
                                    ما tpm هستیم
                                </h1>
                                <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                                    <p className="text-lg text-justify leading-8 ">
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                                        گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                                        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                                        کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                                        جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                                        ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می
                                        توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به
                                        پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته
                                        اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

                                    </p>
                                </div>
                                <img
                                    alt="tpm"
                                    src="https://tpmyadak.com/about1.jpg"
                                    className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 "
                                />
                            </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"/>
                    </div>

                    {/* Timeline section */}
                    <div className="mx-auto my-8 max-w-7xl px-6 lg:px-8">
                        <div
                            className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                            {timeline.map((item) => (
                                <div key={item.name}>
                                    <time
                                        dateTime={item.dateTime}
                                        className="flex items-center text-sm font-semibold leading-6 text-indigo-600"
                                    >
                                        <svg viewBox="0 0 4 4" aria-hidden="true" className="ml-4 h-1 w-1 flex-none">
                                            <circle r={2} cx={2} cy={2} fill="currentColor"/>
                                        </svg>
                                        {item.date}
                                        <div
                                            aria-hidden="true"
                                            className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                                        />
                                    </time>
                                    <p className="mt-6 text-lg font-semibold leading-8 tracking-tight ">{item.name}</p>
                                    <p className="mt-1 text-base leading-7 ">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ProductBrands brands={brands} isPage={true}/>

                    {/* Content section */}
                    <div className="mx-auto my-12 max-w-7xl px-6  lg:px-8">
                        <div
                            className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                            <div className="w-full lg:max-w-lg lg:flex-auto">
                                <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
                                  هدف ما : ارتقا کیفیت قطعات
                                </h2>
                                <p className="mt-6 text-xl leading-8 ">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                </p>
                                <img
                                    alt=""
                                    src="https://tpmyadak.com/about2.jpg"
                                    className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
                                />
                            </div>
                            <div className="w-full lg:max-w-xl lg:flex-auto">
                                <h3 className="sr-only">ویژگی های ما</h3>
                                <ul className="-my-8 divide-y divide-gray-100">
                                    {features.map((opening) => (
                                        <li key={opening.id} className="py-8">
                                            <dl className="relative flex flex-wrap gap-x-3">
                                                <dd className="w-full flex-none text-lg font-semibold tracking-tight ">
                                                    <div>
                                                        {opening.role}
                                                        <span aria-hidden="true" className="absolute inset-0"/>
                                                    </div>
                                                </dd>
                                                <dd className="mt-2 w-full flex-none text-base leading-7 ">{opening.description}</dd>
                                            </dl>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </section>
        </>
    )
}
About.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
