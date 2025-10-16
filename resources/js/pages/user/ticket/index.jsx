import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { Head, Link } from '@inertiajs/react'
import { Pencil, Trash } from 'lucide-react'
import { useModal } from '@/hooks.js'

import {
    Pagination,
    ModalConfirm,
    Dropdown,
    Button,
    Card
} from '@/components/index/index.js'
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home(props) {
    const {
        data: { links, data },
    } = props


    const confirmModal = useModal()

    const handleDeleteClick = (blog) => {
        confirmModal.setData(blog)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('user.tickets.toggle', confirmModal.data.id))
        }
    }


    return (
        <UserAuthenticatedLayout
            title={'تیکت ها'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'تیکت ها', href: route('admin.tickets.index') },
            ]}
        >
            <Head title="تیکت ها" />

            <div>
                <Card>
                    <div className="flex justify-end">
                            <Link href={route('user.tickets.create')}>
                                <Button size="xs" type="primary">
                                    تیکت جدید
                                </Button>
                            </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>شماره</th>
                                    <th>عنوان</th>
                                    <th>تاریخ</th>
                                    <th>تغییر</th>
                                    <th>بخش</th>
                                    <th>اهمیت</th>
                                    <th>آخرین پیام</th>
                                    <th>وضعیت</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.updated_at}</td>
                                        <td>{item.section}</td>
                                        <td>{item.priority}

                                        </td>
                                        <td>
                                            {item.answer === '0' && <Badge type="secondry" outline={true}>شما</Badge>}
                                            {item.answer === '1' && <Badge type="secondry" outline={true}>بررسی</Badge>}
                                            {item.answer === '2' && <Badge type="secondry" outline={true}>ادمین</Badge>}
                                        </td>
                                        <td>
                                            {item.status?(
                                                <Badge type="info" outline={true}>باز</Badge>
                                            ):(
                                                <Badge type="success" outline={true}>بسته</Badge>
                                            )}
                                        </td>
                                        <td className="text-right">
                                            <Dropdown>
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    'user.tickets.edit',
                                                                    item
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Pencil className='w-4 h-4'/>
                                                            <div>مشاهده</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Trash className='w-4 h-4'/>
                                                            <div>بستن تیکت</div>
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
            </div>
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
        </UserAuthenticatedLayout>
    )
}
