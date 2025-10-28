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
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home(props) {
    const {data: { links, data },} = props

    return (
        <UserAuthenticatedLayout
            title={'سفارش'}
            breadcumbs={[
                { name: 'پنل کاربری', href: route('user.dashboard') },
                { name: 'سفارش', href: route('user.orders.index') },
            ]}>
            <Head title="سفارش" />
            <Card>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>مبلغ کل</th>
                            <th> پرداخت</th>
                            <th> ارسال</th>
                            <th>وضعیت سفارش</th>
                            <th>تاریخ</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((order, index) => (
                            <tr key={index}>
                                <td>{parseInt(order.total).toLocaleString('en')}</td>
                                <td>
                                    {order.payment_status==='unpaid'&&  <Badge type="Error" outline={true}>عدم پرداخت</Badge>}
                                    {order.payment_status==='partial'&&  <Badge type="Error" outline={true}>قسطی</Badge>}
                                    {order.payment_status==='paid'&&  <Badge type="Error" outline={true}>پرداخت شده</Badge>}
                                    {order.payment_status==='refund'&&  <Badge type="Error" outline={true}>مرجوعی</Badge>}
                                </td>
                                <td>
                                    {order.shipping_status==='refunded'&&  <Badge type="Error" outline={true}>مرجوعی</Badge>}
                                    {order.shipping_status==='done'&&  <Badge type="success" outline={true}>تحویل شده</Badge>}
                                    {order.shipping_status==='sending'&&  <Badge type="primary" outline={true}>درحال ارسال</Badge>}
                                    {order.shipping_status==='not_sent'&&  <Badge type="info" outline={true}>ارسال نشده</Badge>}
                                </td>
                                <td>
                                    {order.status==='new'&&  <Badge type="primary" outline={true}>انتظار تایید</Badge>}
                                    {order.status==='pending'&&  <Badge type="accent" outline={true}>درصف پردازش</Badge>}
                                    {order.status==='hold'&&  <Badge type="secondary" outline={true}>معلق</Badge>}
                                    {order.status==='verify'&&  <Badge type="success" outline={true}>تایید شده</Badge>}
                                    {order.status==='processing'&&  <Badge type="info" outline={true}>درحال پردازش</Badge>}
                                    {order.status==='done'&&  <Badge type="success" outline={true}>تکمیل شده</Badge>}
                                    {order.status==='canceled'&&  <Badge type="Warning" outline={true}>کنسل شده</Badge>}
                                    {order.status==='refunded'&&  <Badge type="Error" outline={true}>مرجوعی</Badge>}
                                </td>
                                <td>{order.created_at}</td>
                                <td className="text-right">
                                    <Dropdown>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            'user.orders.show',
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
