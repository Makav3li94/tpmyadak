import React from 'react'
import { Head } from '@inertiajs/react'
import { BrickWallFire } from 'lucide-react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'

export default function Maintance(props) {
    return (
        <AuthenticatedLayout
            title={'در حال به روز رسانی '}
            breadcumbs={[
                { name: 'Maintance', href: route('admin.dashboard') },
                { name: 'Index', href: null },
            ]}
        >
            <Head title="در حال به روز رسانی هستیم" />

            <div>
                <div className="overflow-hidden py-40 shadow-xs sm:rounded-lg bg-base-100 text-base-content flex justify-center items-center flex-col">
                    <BrickWallFire className="text-center w-40 h-40" />
                    <div className="p-6 text-3xl">در حال به روز رسانی هستیم</div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
