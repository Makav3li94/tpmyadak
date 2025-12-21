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
import Form from './form.jsx'
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home(props) {
    const {
        data: { links, data }
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()

    const handleDeleteClick = (ProductCategory) => {
        confirmModal.setData(ProductCategory)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.product.categories.destroy', confirmModal.data.id))
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
            title={'دسته محصول'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'دسته محصول', href: route('admin.product.categories.index') },
            ]}
        >
            <Head title="دسته محصول" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-product-category">
                            <Link href={route('admin.product.categories.create')}>
                                <Button size="sm" type="primary">
                                    دسته جدید
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
                                <th>تصویر</th>
                                <th>سردسته</th>
                                <th>وضعیت</th>
                                <th />
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((ProductCategory, index) => (
                                <tr key={ProductCategory.id}>
                                    <td>{++index}</td>
                                    <td>{ProductCategory.title}</td>
                                    <td>
                                        {ProductCategory.image?(
                                            <img src={route('file.show',{file:ProductCategory.image,dir:'category/'})} className="w-12" alt="-"/>
                                        ):(
                                            '-'
                                        )}

                                    </td>
                                    <td>{ProductCategory.parent ? ProductCategory.parent.title : 'ندارد'}</td>
                                    <td>
                                        {ProductCategory.status?(
                                            <Badge type="success" outline={true}>فعال</Badge>
                                        ):(
                                            <Badge type="error" outline={true}>معلق</Badge>
                                        )}
                                    </td>
                                    <td className="text-end">
                                        <Dropdown>
                                            <HasPermission p="update-product-category">
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        router.visit(
                                                            route(
                                                                'admin.product.categories.edit',
                                                                ProductCategory
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
                                            <HasPermission p="delete-product-category">
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            ProductCategory
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
