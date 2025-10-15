import React, {useEffect} from 'react'
import {router} from '@inertiajs/react'
import {Head} from '@inertiajs/react'
import {Pencil} from 'lucide-react'

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
        <UserAuthenticatedLayout>
            <Head title="تراکنش"/>
            <Card>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>سفارش</th>
                            <th>مبلغ</th>
                            <th>وضعیت</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((transaction, index) => (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{transaction.order.id}</td>
                                <td>{parseInt(transaction.price).toLocaleString('en')}</td>
                                <td>
                                    {transaction.status?(
                                        <Badge type="success" outline={true}>موفق</Badge>
                                    ):(
                                        <Badge type="error" outline={true}>ناموفق</Badge>
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
                    <Pagination links={links} />
                </div>
            </Card>
        </UserAuthenticatedLayout>


    )
}
