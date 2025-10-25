import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
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
import FormModal from './form-modal'

export default function Home({reviews}) {

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()
    const formModal = useModal()

    const toggleFormModal = (review = null) => {
        formModal.setData(review)
        formModal.toggle()
    }

    const handleDeleteClick = (review) => {
        confirmModal.setData(review)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.reviews.destroy', confirmModal.data.id))
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
            title={'دیدگاه'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'دیدگاه', href: route('admin.reviews.index') },
            ]}
        >
            <Head title="دیدگاه" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-review">
                            <Button size="sm" onClick={() => toggleFormModal()} type="primary">
                                افزودن
                            </Button>
                        </HasPermission>
                        <div className="flex items-center">
                            <SearchInput onChange={(e) => setSearch(e.target.value)} value={search}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>ردیف</th>
                                    <th>دیدگاه</th>
                                    <th>امتیاز</th>
                                    <th>تاریخ</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((review, index) => (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{review.title}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.created_at}</td>
                                        <td className="text-end">
                                            <Dropdown>
                                                <HasPermission p="update-review">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                review
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Pencil className='w-4 h-4'/>
                                                            <div>ویرایش</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-review">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                review
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
                    {/*<div className="w-full overflow-x-auto flex lg:justify-center">*/}
                    {/*    <Pagination links={links} params={params} />*/}
                    {/*</div>*/}
                </Card>
            </div>
            <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
