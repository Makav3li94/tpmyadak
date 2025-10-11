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
            router.delete(route('admin.blogs.destroy', confirmModal.data.id))
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
            title={'وبلاگ'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'وبلاگ', href: route('admin.blogs.index') },
            ]}
        >
            <Head title="وبلاگ" />

            <div>
                <Card>
                    <div className="flex justify-between">
                        <HasPermission p="create-blog">
                            <Link href={route('admin.blogs.create')}>
                                <Button size="sm" type="primary">
                                    بلاگ جدید
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
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>عنوان</th>
                                    <th>تصویر</th>
                                    <th>بازدید</th>
                                    <th>انتشار</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((blog, index) => (
                                    <tr key={index}>
                                        <td>{blog.title}</td>
                                        <td>      <img src={route('file.show',blog.img_cover)} className="w-12" alt="-"/></td>
                                        <td>{blog.total_view}</td>
                                        <td>{blog.published_at}</td>
                                        <td className="text-right">
                                            <Dropdown>
                                                <HasPermission p="update-blog">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    'admin.blogs.edit',
                                                                    blog
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
                                                <HasPermission p="delete-blog">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                blog
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
