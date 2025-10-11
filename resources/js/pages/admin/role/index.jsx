import React, { useEffect, useState } from 'react'
import { router, Head, Link } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Pencil, Trash } from 'lucide-react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import HasPermission from '@/components/common/has-permission'
import {
    Pagination,
    ModalConfirm,
    SearchInput,
    Dropdown,
    Button,
    Card,
} from '@/components/index'
import { useModal } from '@/hooks'

export default function Index(props) {
    const {
        data: { links, data },
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
            router.delete(route('admin.roles.destroy', confirmModal.data.id))
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
            title={'نقش ها'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'نقش ها', href: route('admin.roles.index') },
            ]}
        >
            <Head title="نقش ها" />

            <div>
                <Card>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <SearchInput onChange={(e) => setSearch(e.target.value)} value={search}/>
                        </div>
                        <HasPermission p="create-role">
                            <Link href={route('admin.roles.create')}>
                                <Button size="sm" type="primary">
                                    افزودن
                                </Button>
                            </Link>
                        </HasPermission>


                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>نام</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((role) => (
                                    <tr key={role.id}>
                                        <td>{role.name}</td>
                                        <td className="text-right">
                                            <Dropdown>
                                                <HasPermission p="update-role">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    'admin.roles.edit',
                                                                    role
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {/* <div className="flex space-x-1 items-center"> */}
                                                        <Pencil className="w-4 h-4" />
                                                        <div>ویرایش</div>
                                                        {/* </div> */}
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-role">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                role
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Trash className="w-4 h-4" />
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
                        <Pagination
                            links={links}
                            params={params}
                        />
                    </div>
                </Card>
            </div>
            <ModalConfirm
                modalState={confirmModal}
                onConfirm={onDelete}
            />
        </AuthenticatedLayout>
    )
}
