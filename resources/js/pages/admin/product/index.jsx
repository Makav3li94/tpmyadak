import React, { useEffect, useState } from 'react'
import {router, Head, Link} from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Pencil, Trash } from 'lucide-react'
import { useModal } from '@/hooks'

import HasPermission from '@/components/common/has-permission'
import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    Pagination,
    ModalConfirm,
    SearchInput,
    Button,
    Dropdown,
    Card
} from '@/components/index'
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home(props) {
    const {
        data: { links, data }
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()


    const handleDeleteClick = (product) => {
        confirmModal.setData(product)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.products.destroy', confirmModal.data.id))
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
            title={' محصول'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: ' محصول', href: route('admin.products.index') },
            ]}
        >
            <Head title=" محصول" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-product">
                            <Link href={route('admin.products.create')}>
                                <Button size="sm" type="primary">
                                    محصول جدید
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
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>ردیف</th>
                                    <th>عنوان</th>
                                    {/*<th>تصویر</th>*/}
                                    <th>تاریخ</th>
                                    <th>قیمت</th>
                                    <th>وضعیت</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{++index}</td>
                                        <td>{product.title}</td>
                                        {/*<td>*/}
                                        {/*    {product.image?(*/}
                                        {/*        <img src={route('file.show',product.image)} className="w-12" alt="-"/>*/}
                                        {/*    ):(*/}
                                        {/*        '-'*/}
                                        {/*    )}*/}

                                        {/*</td>*/}
                                        <td>{product.created_at}</td>
                                        <td>{parseInt(product.price).toLocaleString('en')}</td>
                                        <td>
                                            {product.status?(
                                                <Badge type="success" outline={true}>فعال</Badge>
                                            ):(
                                                <Badge type="error" outline={true}>معلق</Badge>
                                            )}
                                        </td>
                                        <td className="text-end">
                                            <Dropdown>
                                                <HasPermission p="update-product">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    'admin.products.edit',
                                                                    product
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
                                                <HasPermission p="delete-product">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                product
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
            <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
        </AuthenticatedLayout>
    )
}
