import React, {useEffect, useState} from 'react'
import {usePage} from "@inertiajs/react";
import {showToast} from "@/utils.js";
import SidebarNavUser from "@/layouts/user/partials/sidebar-nav-user.jsx";
import {Toaster} from "sonner";
import {useSidebar} from "@/hooks.js";
import {Menu} from "lucide-react";
import NotificationMenu from "@/layouts/default/partials/notification-menu.jsx";
import UserProfileMenu from "@/layouts/default/partials/user-profile-menu.jsx";
import {themeChange} from "theme-change";
import TopHeader from "@/layouts/common/top-header.jsx";
import Header from "@/layouts/common/header.jsx";
import {Breadcrumb} from "@/components/index/index.js";
import HeaderSingle from "@/layouts/common/header-single.jsx";


export default function UserAuthenticatedLayout({
                                                    children,
                                                    title = '',
                                                    breadcumbs = [],
                                                }
) {
    const {props: {auth, flash},} = usePage()
    const {isShowSidebar, toggleSidebar} = useSidebar(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (flash.message !== null) {
            showToast(flash.message.message, flash.message.type)
        }
    }, [flash])

    useEffect(() => {
        themeChange(false)
        setMounted(true)
        // 👆 false parameter is required for react project
    }, [])
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center w-full">
            <TopHeader user={auth.user}/>
            <Header/>
            <HeaderSingle/>
            <div class="container mx-auto relative my-5">
                    <main className={`transition ${isShowSidebar ? 'lg:mr-64' : 'ml-0 '}`}>
                        <nav className="bg-base-100 c-shadow">
                            <div className="mx-auto px-4 py-2">
                                <div className="flex justify-between">
                                    <div className="-mr-2 flex items-center space-x-2">
                                        <button
                                            onClick={() => toggleSidebar()}
                                            className="inline-flex items-center justify-center lg:hidden  p-2 rounded-md text-base-content focus:outline-hidden transition duration-150 ease-in-out btn btn-ghost"
                                        >
                                            <Menu className="h-5 w-5"/>
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center gap-3">


                                        <div className="h-full flex items-center">
                                            <NotificationMenu/>
                                        </div>
                                        <div className="h-full flex items-center">
                                            <UserProfileMenu/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div className="p-6">
                            <div className="flex flex-row justify-between items-center">
                                <Breadcrumb>
                                    {breadcumbs.map((b, i) => (
                                        <Breadcrumb.Item key={i} r={b.href}>{b.name}</Breadcrumb.Item>
                                    ))}
                                </Breadcrumb>
                                <h3 className="text-lg font-medium">{title}</h3>

                            </div>
                            <div className="mt-6">{children}</div>
                        </div>
                        <div className="mb-4"></div>
                    </main>
                    <SidebarNavUser user={auth.user} show={isShowSidebar} setShow={toggleSidebar}/>
                <Toaster theme="system" richColors="true" toastOptions={{
                    duration: 3000,
                    dismissible: true,
                }}
                />
            </div>
        </div>
    )
}
