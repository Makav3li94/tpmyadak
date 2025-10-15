import React, { useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import { Pencil  } from 'lucide-react'

import {
    Pagination,
    Dropdown,
    Card
} from '@/components/index/index.js'
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";

export default function Home(props) {
    const {data: { links, data },} = props

    return (
        <UserAuthenticatedLayout>
            <Head title="سفارش" />
            <Card>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>مشتری</th>
                            <th>مبلغ کل</th>
                            <th> پرداخت</th>
                            <th> ارسال</th>
                            <th>وضعیت</th>
                            <th>تاریخ</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((order, index) => (
                            <tr key={index}>
                                <td>{order.user.name}</td>
                                <td>{parseInt(order.total).toLocaleString('en')}</td>
                                <td>{order.payment_status}</td>
                                <td>{order.shipping_status}</td>
                                <td>{order.status}</td>
                                <td>{order.created_at}</td>
                                <td className="text-right">
                                    <Dropdown>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            'admin.orders.show',
                                                            order
                                                        )
                                                    )
                                                }
                                            >
                                                <div className="flex space-x-1 items-center">
                                                    <Pencil className='w-4 h-4'/>
                                                    <div>مشاهده</div>
                                                </div>
                                            </Dropdown.Item>

                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full overflow-x-auto flex lg:justify-center">
                    <Pagination links={links}  />
                </div>
            </Card>
        </UserAuthenticatedLayout>


    )
}
