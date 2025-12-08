import FrontLayout from "@/layouts/front/front-layout.jsx";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import {Head} from "@inertiajs/react";
import React from "react";
export default function Contact() {

    return (
        <>
            <Head title='تماس با ما'/>
            <Breadcrumb l1={['تماس با ما', '']}/>
            <section className="relative container">
            <div className="bg-base-100 py-24 sm:py-32">
                <div className="w-full h-full bg-base-100 dark:bg-gray-800">
                    <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 pb-12">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight ">در تماس باشید</h2>
                                <p className="mt-4 leading-7 text-justify">
                                    با تماس تلفنی (از ساعت 8 الی 20 در روزهای شنبه تا چهارشنبه و 8 الی 14 روزهای پنجشنبه  به جز روزهای تعطیل) شما میتوانید از خدمات پشتیبانی , شامل مشاوره جهت خرید , نحوه ارسال و ثبت سفارش تلفنی بهره مند شوید
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">فروش</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:collaborate@example.com" className="font-semibold text-indigo-600">
                                                   sales.tpmyadak.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>021-88582172</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">پشتیبانی</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:collaborate@example.com" className="font-semibold text-indigo-600">
                                                    support.tpmyadak.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>021-88582172</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">انتقادات و پیشنهادات</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:collaborate@example.com" className="font-semibold text-indigo-600">
                                                    Criticism .tpmyadak.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>021-88582172</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">مدیریت</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:collaborate@example.com" className="font-semibold text-indigo-600">
                                                    management.tpmyadak.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>021-88582172</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-16 lg:grid-cols-3">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight ">دفاتر ما</h2>
                                <p className="mt-4 leading-7 ">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">تهران</h3>
                                    <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                        <p>تهران ، شهرک غرب، بلوار دریا ، </p>
                                        <p>خ گلها، خ توحید یک، پلاک 101</p>
                                    </address>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">روسیه</h3>
                                    <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                        <p>886 Walter Street</p>
                                        <p>New York, NY 12345</p>
                                    </address>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">دبی</h3>
                                    <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                        <p>7363 Cynthia Pass</p>
                                        <p>Toronto, ON N3Y 4H8</p>
                                    </address>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">چین</h3>
                                    <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                        <p>726 Mavis Island</p>
                                        <p>Chicago, IL 60601</p>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>
    )
}
Contact.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
