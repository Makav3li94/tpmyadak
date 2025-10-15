import React, {useEffect} from 'react'
import {usePage} from "@inertiajs/react";
import {showToast} from "@/utils.js";
import {useSidebar} from "@/hooks.js";
import {themeChange} from "theme-change";
import TopHeader from "@/layouts/common/top-header.jsx";
import Header from "@/layouts/common/header.jsx";
import {Toaster} from "sonner";
import Footer from "@/layouts/common/footer.jsx";


export default function FrontLayout(props) {
    const {props: {auth, flash},} = usePage()
    const {isShowSidebar, toggleSidebar} = useSidebar(true)

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
        <div className="min-h-screen flex flex-col sm:justify-center items-center w-full">
            <TopHeader user={auth.user}/>
            <Header/>

            {props.children}

            <Footer/>
            <Toaster theme="system" richColors="true" toastOptions={{
                duration: 3000,
                dismissible: true,
            }}
            />
        </div>
    )
}
