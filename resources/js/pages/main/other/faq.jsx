import FrontLayout from "@/layouts/front/front-layout.jsx";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import {Head} from "@inertiajs/react";
import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
const faqs = [
    {
        question: "لورم ایپسوم متن ساختگی با تولید سادگی ؟",
        answer:
            "چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، ",
    },
    {
        question: "لورم ایپسوم متن ساختگی با تولید سادگی ؟",
        answer:
            "چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، ",
    },
    {
        question: "لورم ایپسوم متن ساختگی با تولید سادگی ؟",
        answer:
            "چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، ",
    },
    {
        question: "لورم ایپسوم متن ساختگی با تولید سادگی ؟",
        answer:
            "چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، ",
    },
    {
        question: "لورم ایپسوم متن ساختگی با تولید سادگی ؟",
        answer:
            "چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، ",
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
