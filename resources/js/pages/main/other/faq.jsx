import FrontLayout from "@/layouts/front/front-layout.jsx";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import {Head} from "@inertiajs/react";
import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
const faqs = [
    {
        question: "شرایط الزامی جهت تعویض و یا عودت کالا چیست؟",
        answer:
            "امکان تعویض و باز پس گیری کالا تا یک هفته پس از دریافت محصول خریداری شده ,  امکان پذیر میباشد که شرایط آن به شرح ذیل است :\n" +
            "•\tعدم نیاز مشتری به کالای خریداری شده.\n" +
            "•\tعدم تطابق محصول دریافت شده  با کالای سفارش داده شده .\n" +
            "•\tجهت عودت ضروری است تا بسته بندی محصول باز نشده باشد .\n ",
    },
    {
        question: "هزینه عودت کالا با کیست؟",
        answer:
            "•\tهزینه ارسال بازگشت کالا توسط مشتری پرداخت می‌شود . در غیر این صورت ما تعهدی نسبت به تحویل گرفتن اجناس نخواهیم داشت . ",
    },
    {
        question: "در صورت مرجوعی مبلغ واریزی کی برگشت داده میشود؟",
        answer:
            "•\tپس از تایید دلایل عودت کالا توسط کارشناسان ما ، مبلغ کالا و یا محصول جایگزین ظرف 1 الی 3 روز کاری به مشتری پرداخت و تحویل خواهد شد . ",
    },
    {
        question: "به شهرستان ها هم ارسال دارید ؟",
        answer:
            "فروشگاه اینترنتی TPM با ارسال به تمامی نقاط ایران توسط شرکت پست و شرکت های حمل و نقل بین شهری از قبیل تیپاکس و .. قابلیت ارسال به همه شهر ها و روستا های ایران را داشته و کلیه مشتریان عزیز در همه نقاط کشور از سرویس ارسال ما بهره مند خواهند بود. ",
    },
    {
        question: "امکان ارسال سریع در تهران وجود دارد ؟",
        answer:
            "فقط در شهر تهران با تقبل هزینه ارسال سریع توسط مشتری و هماهنگی لازم با واحد پشیبانی و در بازه زمانی 9 الی 17 (به جز روزهای تعطیل) خرید انجام شود.",
    },
    // More questions...
]
export default function Faq() {

    return (
        <>
            <Head title='سوالات متداول'/>
            <Breadcrumb l1={['سوالات متداول', '']}/>
            <section className="relative container">
                <div className="bg-base-100">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                            <h2 className="text-2xl font-bold leading-10 tracking-tight ">سوالات متداول مشتریان TPMYADAK</h2>
                            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                                {faqs.map((faq) => (
                                    <Disclosure key={faq.question} as="div" className="py-6">
                                        <dt>
                                            <DisclosureButton className="group flex w-full items-start justify-between text-left ">
                                                <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                                                    <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </dt>
                                        <DisclosurePanel as="dd" className="mt-2 pr-12">
                                            <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
Faq.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
