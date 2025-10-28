/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import {Head, Link} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";
import Badge from "@/components/daisy-ui/badge.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Show({order}) {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(0);
    useEffect(() => {
        if (order.status === 'new') setStep(0)
        if (order.status === 'verify') setStep(1)
        if (order.status === 'pending') setStep(2)
        if (order.status === 'processing') setStep(3)
        if (order.status === 'processing' && order.shipping_status === 'sending') setStep(4)
        if (order.status === 'done') setStep(5)
        setMounted(true)
    }, [])
    console.log(order)
    return (
        <UserAuthenticatedLayout
            title={'سفارش'}
            breadcumbs={[
                {name: 'پنل کاربری', href: route('user.dashboard')},
                {name: 'سفارش', href: route('user.orders.index')},
            ]}>
            <Head title="سفارش"/>
            <div className="bg-gray-50">
                <div className="mx-auto max-w-2xl pt-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                        <div className="flex sm:items-baseline sm:space-x-4">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">سفارش
                                #54879</h1>
                            <a href="#"
                               className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block">
                                مشاهده فاکتور
                                <span aria-hidden="true"> &larr;</span>
                            </a>
                        </div>
                        <p className="text-sm text-gray-600">
                            تاریخ ثبت{' '}
                            <time dateTime="2021-03-22" className="font-medium text-gray-900" dir="ltr">
                                {order.created_at}
                            </time>
                        </p>
                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden">
                            مشاهده فاکتور
                            <span aria-hidden="true"> &larr;</span>
                        </a>
                    </div>

                    {/* Products */}
                    <div className="mt-6">
                        <h2 className="sr-only">کالاهای سفارش</h2>

                        <div className="space-y-8">
                            {order.details.map((item, i) => (
                                <div key={i}
                                     className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                                    <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                                        <div className="sm:flex lg:col-span-7">
                                            <div
                                                className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                                                <img
                                                    alt={item.title}
                                                    src={route('file.show', item.product.image)}
                                                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                                />
                                            </div>

                                            <div className="mt-6 sm:ml-6 sm:mt-0">
                                                <h3 className="text-base font-medium text-gray-900">
                                                    <Link
                                                        href={route('home.getProduct', item.product.sku)}>{item.title}</Link>
                                                </h3>
                                                <p className="mt-2 text-sm font-medium text-gray-900">${item.amount.toLocaleString('en')}</p>
                                            </div>
                                        </div>

                                        <div className="mt-6 lg:col-span-5 lg:mt-0">
                                            <dl className="grid grid-cols-2 gap-x-6 text-sm">
                                                <div>
                                                    <dt className="font-medium text-gray-900">آدرس تحویل</dt>
                                                    <dd className="mt-3 text-gray-500">
                                                        <span className="block">{order.address}</span>
                                                        <span className="block">{order.postal_code}</span>
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="font-medium text-gray-900">اطلاعات گیرنده</dt>
                                                    <dd className="mt-3 space-y-3 text-gray-500">
                                                        <p>{order.name}</p>
                                                        <p>{order.mobile}</p>
                                                        <p>{order.phone}</p>

                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>


                                </div>
                            ))}
                            {mounted &&
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
                                    <h4 className="sr-only">
                                        وضعیت سفارش

                                    </h4>
                                    <p className="text-sm font-medium text-gray-900">
                                        {/*{product.status} on <time dateTime={product.datetime}>{product.date}</time>*/}
                                        {/*{order.status}*/}
                                        وضعیت سفارش
                                        {order.status === 'hold' &&  <Badge className="mr-2" type="error" outline={true}>معلق</Badge> }
                                        {order.status === 'canceled' &&  <Badge className="mr-2" type="error" outline={true}>کنسل شده</Badge> }
                                        {order.status === 'refunded' &&  <Badge className="mr-2" type="error" outline={true}>مرجوع</Badge> }
                                    </p>
                                    <div aria-hidden="true" className="mt-6">
                                        <div className="overflow-hidden rounded-full bg-gray-200">
                                            <div style={{width: `calc((${step} * 2 + 1) / 12 * 100%)`}}
                                                 className="h-2 rounded-full bg-indigo-600"/>
                                        </div>
                                        <div
                                            className="mt-6 hidden grid-cols-6 text-sm font-medium text-gray-600 sm:grid">
                                            <div className="text-indigo-600">ثبت</div>
                                            <div
                                                className={classNames(step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                                                تایید
                                            </div>
                                            <div
                                                className={classNames(step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                                                صف پردازش
                                            </div>
                                            <div
                                                className={classNames(step > 2 ? 'text-indigo-600' : '', 'text-center')}>
                                                پردازش
                                            </div>
                                            <div
                                                className={classNames(step > 3 ? 'text-indigo-600' : '', 'text-center')}>
                                                ارسال
                                            </div>
                                            <div className={classNames(step > 4 ? 'text-indigo-600' : '', 'text-left')}>
                                                تکمیل
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Billing */}
                    <div className="mt-16">
                        <h2 className="sr-only">وضعیت پرداخت</h2>
                        {order.payment_status==='paid' ? (
                            <div className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
                                <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                                    <div>
                                        <dt className="font-medium text-gray-900">متد پرداخت</dt>
                                        <dd className="mt-3 text-gray-500">
                                            <span className="block">درگاه</span>
                                            <span className="block">یکجا</span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-900">رهگیری پرداخت</dt>
                                        <dd className="-ml-4 -mt-1 flex flex-wrap">
                                            <div className="ml-4 mt-4 flex-shrink-0">

                                                <p className="sr-only">کارت بانکی</p>
                                            </div>
                                            <div className="ml-4 mt-4">
                                                <p className="text-gray-900">{order.transaction.verify_code}</p>
                                                <p className="text-gray-600" dir='ltr'>{order.transaction.created_at}</p>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>

                                <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
                                    <div className="flex items-center justify-between pb-4">
                                        <dt className="text-gray-600">مجموع</dt>
                                        <dd className="font-medium text-gray-900">{order.subtotal.toLocaleString('en')}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">ارسال</dt>
                                        <dd className="font-medium text-gray-900">{order.shipping.toLocaleString('en')}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">مالیات</dt>
                                        <dd className="font-medium text-gray-900">0</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <dt className="font-medium text-gray-900">کل پرداختی</dt>
                                        <dd className="font-medium text-indigo-600">{order.total.toLocaleString('en')}</dd>
                                    </div>
                                </dl>
                            </div>
                        ):(
                            <div role="alert" className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>عدم پرداخت-لطفا مجددا سفارش را ثبت کنید</span>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </UserAuthenticatedLayout>
    )
}
