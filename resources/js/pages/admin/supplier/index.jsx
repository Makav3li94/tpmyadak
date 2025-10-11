import React, {useEffect, useState} from 'react'
import {Head, router} from '@inertiajs/react'
import {usePrevious} from 'react-use'
import {Pencil, Trash} from 'lucide-react'
import {useModal} from '@/hooks'

import HasPermission from '@/components/common/has-permission'
import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {Button, Card, Dropdown, ModalConfirm, Pagination, SearchInput} from '@/components/index'
import FormModal from './form-modal'
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home(props) {
    const {
        data: {links, data},
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()
    const formModal = useModal()

    const toggleFormModal = (brand = null) => {
        formModal.setData(brand)
        formModal.toggle()
    }

    const handleDeleteClick = (brand) => {
        confirmModal.setData(brand)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.suppliers.destroy', confirmModal.data.id))
        }
    }

    const params = {q: search}
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                {q: search},
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    return (
        <AuthenticatedLayout
            title={'تامین کننده'}
            breadcumbs={[
                {name: 'داشبورد', href: route('admin.dashboard')},
                {name: 'تامین کننده', href: route('admin.suppliers.index')},
            ]}
        >
            <Head title="تامین کننده"/>

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-supplier">
                            <Button
                                size="sm"
                                onClick={() => toggleFormModal()}
                                type="primary"
                            >
                                افزودن
                            </Button>
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
                                <th>وضعیت</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((supplier, index) => (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{supplier.title}</td>
                                    <td>
                                        {supplier.image ? (
                                            <img src={route('file.show', supplier.image)} className="w-12" alt="-"/>
                                        ) : (
                                            '-'
                                        )}

                                    </td>
                                    <td>
                                        {supplier.status ? (
                                            <Badge type="success" outline={true}>فعال</Badge>
                                        ) : (
                                            <Badge type="error" outline={true}>معلق</Badge>
                                        )}
                                    </td>
                                    <td className="text-end">
                                        <Dropdown>
                                            <HasPermission p="update-supplier">
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        toggleFormModal(
                                                            supplier
                                                        )
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <Pencil className='w-4 h-4'/>
                                                        <div>ویرایش</div>
                                                    </div>
                                                </Dropdown.Item>
                                            </HasPermission>
                                            <HasPermission p="delete-supplier">
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            supplier
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
                        <Pagination links={links} params={params}/>
                    </div>
                </Card>
            </div>
            <ModalConfirm onConfirm={onDelete} modalState={confirmModal}/>
            <FormModal modalState={formModal}/>
        </AuthenticatedLayout>
    )
}
