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
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Home(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()
    const formModal = useModal()

    const toggleFormModal = (transaction = null) => {
        formModal.setData(transaction)
        formModal.toggle()
    }

    const handleDeleteClick = (transaction) => {
        confirmModal.setData(transaction)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.transactions.destroy', confirmModal.data.id))
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
            title={'تراکنش'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'تراکنش', href: route('admin.transactions.index') },
            ]}
        >
            <Head title="تراکنش" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-transaction">
                            <Button disabled
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
                                    <th>کاربر</th>
                                    <th>سفارش</th>
                                    <th>مبلغ</th>
                                    <th>وضعیت</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((transaction, index) => (
                                    <tr key={transaction.id}>
                                        <td>{++index}</td>
                                        <td>{transaction.user.name}</td>
                                        <td>{transaction.order.id}</td>
                                        <td>{parseInt(transaction.price).toLocaleString('en')}</td>

                                        <td>
                                            {transaction.status?(
                                                <Badge type="success" outline={true}>موفق</Badge>
                                            ):(
                                                <Badge type="error" outline={true}>ناموفق</Badge>
                                            )}
                                        </td>
                                        <td className="text-end">
                                            <Dropdown>
                                                <HasPermission p="update-transaction">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                transaction
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Pencil className='w-4 h-4'/>
                                                            <div>ویرایش</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-transaction">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                transaction
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
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
