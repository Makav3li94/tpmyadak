import {Head, router} from '@inertiajs/react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {Button, Card} from '@/components/index'
import React from "react";

export default function Index({errLogs}) {


    return (
        <AuthenticatedLayout
            title={'لاگ خطا'}
            breadcumbs={[
                {name: 'داشبورد', href: route('admin.dashboard')},
                {name: 'لاگ خطا', href: route('admin.audit-logs.index')},
            ]}
        >
            <Head title="لاگ خطا"/>

            <div>
                <Card>

                    {errLogs.length === 0 ? (
                        <p className="text-muted-foreground text-center">همه چی آرومه !</p>
                    ) : (
                        errLogs.map((log, index) => (
                            <div
                                key={index}
                                className="border px-4 py-3 rounded-md bg-muted/50 hover:bg-muted/70 transition"
                            >
                                <div className="font-medium text-sm text-foreground">
                                    {log.env}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {log.type}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {log.timestamp}
                                </div>

                                <pre className="mt-2 rounded bg-muted p-2 text-xs overflow-auto max-h-48">
                {log.message}
                    </pre>
                            </div>
                        ))
                    )}


                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
