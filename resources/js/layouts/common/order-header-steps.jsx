import React, {useEffect, useState} from "react";
import {Redo2} from "lucide-react";
import logo from "../../../images/logo.png"
import {Button} from "@/components/index/index.js";
const steps = [
    {name: 'سبدخرید', href: route('home.cart'), status: route().current() === 'home.cart' ? 'current' :'complete'},
    {name: 'صورت حساب', href: route('home.checkout'), status: route().current() === 'home.checkout' ? 'current' :'complete'},
    {name: 'ثبت سفارش', href: '#', status: 'upcoming'},
]
import {ChevronLeft} from "lucide-react";
import {Link} from "@inertiajs/react";
export default function OrderHeaderSteps(props) {
    return (
        <nav aria-label="Progress" className="hidden sm:block">
            <ol role="list" className="flex space-x-4">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className="flex items-center">
                        {step.status === 'current' ? (
                            <Link href={step.href} aria-current="page" className="text-indigo-600">
                                {step.name}
                            </Link>
                        ) : (
                            <Link href={step.href}>{step.name}</Link>
                        )}

                        {stepIdx !== steps.length - 1 ? (
                            <ChevronLeft aria-hidden="true" className="mr-4 h-5 w-5 text-gray-300"/>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
