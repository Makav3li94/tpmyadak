import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { Pencil, Trash } from 'lucide-react'
import { useModal } from '@/hooks'

import HasPermission from '@/components/common/has-permission'
import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    ModalConfirm,
    Button,
    Dropdown,
    Card
} from '@/components/index'
import FormModal from './form-modal'
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home({sliders}) {



    const confirmModal = useModal()
    const formModal = useModal()

    const toggleFormModal = (slider = null) => {
        formModal.setData(slider)
        formModal.toggle()
    }

    const handleDeleteClick = (slider) => {
        confirmModal.setData(slider)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.sliders.destroy', confirmModal.data.id))
        }
    }



    return (
        <AuthenticatedLayout
            title={'اسلایدر'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'اسلایدر', href: route('admin.sliders.index') },
            ]}
        >
            <Head title="اسلایدر" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-slider">
                            <Button size="sm" onClick={() => toggleFormModal()} type="primary">
                                افزودن
                            </Button>
                        </HasPermission>

                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>ردیف</th>
                                    <th>تصویر</th>
                                    <th>وضعیت</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {sliders.map((slider, index) => (
                                    <tr key={slider.id}>
                                        <td>{++index}</td>
                                        <td>
                                            {slider.image?(
                                                <img src={route('file.show',{file:slider.image,dir:'slider/'})} className="w-12" alt="-"/>
                                            ):(
                                                '-'
                                            )}

                                        </td>
                                        <td>
                                            {slider.status?(
                                                <Badge type="success" outline={true}>فعال</Badge>
                                            ):(
                                                <Badge type="error" outline={true}>معلق</Badge>
                                            )}
                                        </td>
                                        <td className="text-end">
                                            <Dropdown>
                                                <HasPermission p="update-slider">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                slider
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Pencil className='w-4 h-4'/>
                                                            <div>ویرایش</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-slider">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                slider
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
                </Card>
            </div>
            <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
