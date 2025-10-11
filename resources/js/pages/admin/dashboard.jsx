import React from 'react'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import DummyDashbord from '@/components/dummy/dashboard'

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            title={'داشبورد'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'نیم نگاه', href: null },
            ]}
        >
            <Head title="داشبورد" />

            <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-2 gap-2">
                    <div className="stats shadow flex-1 bg-base-100 border border-base-300">
                        <div className="stat">
                            <div className="stat-title">نقش</div>
                            <div className="stat-value text-primary">
                                {props.role_count}{' '}
                            </div>
                        </div>
                    </div>
                    <div className="stats shadow flex-1 bg-base-100 border border-base-300">
                        <div className="stat">
                            <div className="stat-title">کاربر</div>
                            <div className="stat-value text-primary">
                                {props.user_count}
                            </div>
                        </div>
                    </div>
                    <div className="stats shadow flex-1 bg-base-100 border border-base-300">
                        <div className="stat">
                            <div className="stat-title">هیچ</div>
                            <div className="stat-value text-primary">0</div>
                        </div>
                    </div>
                    <div className="stats shadow flex-1 bg-base-100 border border-base-300">
                        <div className="stat">
                            <div className="stat-title">هیچ</div>
                            <div className="stat-value text-primary">0</div>
                        </div>
                    </div>
                </div>
                <DummyDashbord />
            </div>
        </AuthenticatedLayout>
    )
}
