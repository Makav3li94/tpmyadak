import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head, Link } from '@inertiajs/react'
import { Pencil, Trash } from 'lucide-react'
import { useModal } from '@/hooks.js'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout.jsx'
import HasPermission from '@/components/common/has-permission.jsx'
import {
    Pagination,
    ModalConfirm,
    SearchInput,
    Dropdown,
    Button,
    Card
} from '@/components/index/index.js'
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()

    const handleDeleteClick = (order) => {
        confirmModal.setData(order)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.orders.destroy', confirmModal.data.id))
        }
    }

    const params = { q: search }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    return (
        <AuthenticatedLayout
            title={'سفارش'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'سفارش', href: route('admin.orders.index') },
            ]}
        >
            <Head title="سفارش" />

            <div>
                <Card>
                    <div className="flex justify-between">
                        <HasPermission p="create-order">
                            <Link href={route('admin.orders.create')}>
                                <Button size="sm" type="primary">
                                    سفارش جدید
                                </Button>
                            </Link>
                        </HasPermission>

                        <div className="flex items-center">
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>گیرنده</th>
                                    <th>مبلغ کل</th>
                                    <th> پرداخت</th>
                                    <th> ارسال</th>
                                    <th>وضعیت سفارش</th>
                                    <th>وضعیت پرداخت</th>
                                    <th>تاریخ</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.user.name}</td>
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
                                                <HasPermission p="update-order">
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
                                                            <div>ویرایش</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-order">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                order
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Trash className='w-4 h-4'/>
                                                            <div>حذف</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full overflow-x-auto flex lg:justify-center">
                        <Pagination links={links} params={params} />
                    </div>
                </Card>
            </div>
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
        </AuthenticatedLayout>
    )
}
