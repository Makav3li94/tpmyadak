import React, {useEffect} from 'react'
import {usePage} from "@inertiajs/react";
import {showToast} from "@/utils.js";
import {themeChange} from "theme-change";
import {CartProvider} from "react-use-cart";
import OrderHeader from "@/layouts/common/order-header.jsx";
import {Toaster} from "sonner";


export default function OrderLayout({children}) {
    const {props: {auth, flash},} = usePage()

    useEffect(() => {
        if (flash.message !== null) {
            showToast(flash.message.message, flash.message.type)
        }
    }, [flash])

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])
    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col sm:justify-center items-center w-full">
                    <div className="bg-white">
                        {/* Background color split screen for large screens */}
                        <div aria-hidden="true" className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block"/>
                        <div aria-hidden="true" className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block"/>
                        <OrderHeader/>


                        <div
                            className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48 mt-28 sm:mt-16">
                            {children}
                        </div>
                    </div>

            </div>
            <Toaster theme="system" richColors="true" toastOptions={{duration: 3000, dismissible: true,}}/>
        </CartProvider>
    )
}
