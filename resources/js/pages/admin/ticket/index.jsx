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

    const handleDeleteClick = (blog) => {
        confirmModal.setData(blog)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.tickets.toggle', confirmModal.data.id))
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
            title={'تیکت ها'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'تیکت ها', href: route('admin.tickets.index') },
            ]}
        >
            <Head title="تیکت ها" />

            <div>
                <Card>
                    <div className="flex justify-between">
                        {/*<HasPermission p="create-ticket">*/}
                        {/*    <Link href={route('admin.tickets.create')}>*/}
                        {/*        <Button size="sm" type="primary">*/}
                        {/*            ارسال تیکت به کاربر*/}
                        {/*        </Button>*/}
                        {/*    </Link>*/}
                        {/*</HasPermission>*/}

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
                                    <th>شماره</th>
                                    <th>عنوان</th>
                                    <th>کاربر</th>
                                    <th>تلفن</th>
                                    <th>تاریخ</th>
                                    <th>تغییر</th>
                                    <th>بخش</th>
                                    <th>اهمیت</th>
                                    <th>وضعیت</th>
                                    <th>وضعیت</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.user.name}</td>
                                        <td>{item.user.mobile}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.updated_at}</td>
                                        <td>{item.section}</td>
                                        <td>{item.priority}</td>
                                        <td>
                                            {item.answer === '0' && <Badge type="secondry" outline={true}>کاربر</Badge>}
                                            {item.answer === '1' && <Badge type="secondry" outline={true}>منتظر</Badge>}
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
                                                <HasPermission p="update-ticket">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    'admin.tickets.show',
                                                                    item
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
                                                <HasPermission p="delete-ticket">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                item
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
