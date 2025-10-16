import React, {useEffect} from 'react'
import {router} from '@inertiajs/react'
import {Head} from '@inertiajs/react'
import {Pencil, Trash} from 'lucide-react'

import {
    Pagination,
    Dropdown,
    Card
} from '@/components/index/index.js'
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home(props) {
    const {data: {links, data},} = props

    return (
        <UserAuthenticatedLayout
            title={'علاقه مندی ها'}
            breadcumbs={[
                { name: 'پنل کاربری', href: route('user.dashboard') },
                { name: 'علاقه مندی ها', href: route('user.wishlists.index') },
            ]}>
            <Head title="علاقه مندی ها"/>
            <Card>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>محصول</th>
                            <th>وضعیت</th>
                            <th>تاریخ</th>

                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{item.product.title}</td>
                                <td>
                                    {item.status?(
                                        <Badge type="success" outline={true}>خریداری شده!</Badge>
                                    ):(
                                        <Badge type="warning" outline={true}>در صف</Badge>
                                    )}
                                </td>
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
                                                <div>مشاهده محصول</div>
                                            </div>
                                        </Dropdown.Item>
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
                                                <Trash className='w-4 h-4'/>
                                                <div>حذف محصول</div>
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
                    <Pagination links={links} />
                </div>
            </Card>
        </UserAuthenticatedLayout>


    )
}
