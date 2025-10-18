import React, { useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { themeChange } from 'theme-change'
import { Toaster } from 'sonner'
import { showToast } from '@/utils'
import LandingIntro from "@/pages/user/auth/partials/LandingIntro.jsx";

export default function Guest({ children }) {
    const {
        props: {
            flash,
            app: { app_name, app_logo },
        },
    } = usePage()

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
        <div className="min-h-screen flex flex-col sm:justify-center items-center md:pt-6 ">
            <div className="min-h-screen  flex items-center">
                <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                    <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                        <div className='py-24 px-10'>
                            {children}
                        </div>

                        <div className=''>
                            <LandingIntro />
                        </div>
                    </div>
                </div>
            </div>

            <Toaster
                theme="system"
                richColors="true"
                toastOptions={{
                    duration: 3000,
                    dismissible: true,
                }}
            />
        </div>
    )
}
