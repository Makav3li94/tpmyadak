import React, {useEffect} from 'react'
import {Head} from '@inertiajs/react'

import {
    Card
} from '@/components/index/index.js'
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home({notifications}) {

    return (
        <UserAuthenticatedLayout
            title={'اعلان ها'}
            breadcumbs={[
                { name: 'پنل کاربری', href: route('user.dashboard') },
                { name: 'اعلان ها', href: route('user.transactions.index') },
            ]}>
            <Head title="اعلان ها"/>
            <Card>

                {notifications.map((notification, index) => (
                    <div role="alert" className="alert alert-vertical sm:alert-horizontal"  key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <h3 className="font-bold">New message!</h3>
                            <div className="text-xs">You have 1 unread message</div>
                        </div>
                        <button className="btn btn-sm">See</button>
                    </div>

                ))}
            </Card>
        </UserAuthenticatedLayout>


    )
}
