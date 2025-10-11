import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { ClipboardCopy, Eye, Pencil, Trash } from 'lucide-react'

import { formatDateTime, showToast } from '@/utils.js'
import AuthenticatedLayout from '@/layouts/default/authenticated-layout.jsx'
import {
    Pagination,
    ModalConfirm,
    SearchInput,
    Button,
    Card,
} from '@/components/index/index.js'
import { useModal } from '@/hooks.js'
import FormModal from './form-modal.jsx'

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()
    const formModal = useModal()

    const toggleFormModal = (link = null) => {
        formModal.setData(link)
        formModal.toggle()
    }

    const handleDeleteClick = (link) => {
        confirmModal.setData(link)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.shortlink.link.destroy', confirmModal.data.id))
        }
    }

    const handleCopyToClipboard = (link) => {
        showToast('copied to clipboard', 'success')
        navigator.clipboard.writeText(route('admin.shortlink.redirect', link))
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
            title={'شورتلینک'}
            breadcumbs={[
                { name: 'ماژول', href: route('admin.dashboard') },
                { name: 'شورتلینک', href: route('admin.shortlink.link.index') },
            ]}
        >
            <Head title="Shortlink" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div className="flex flex-col md:flex-row gap-1">
                            <Button
                                size="sm"
                                onClick={() => toggleFormModal()}
                                type="primary"
                            >
                                ساخت
                            </Button>
                            <a
                                className="btn btn-soft btn-secondary"
                                href={route('admin.shortlink.home')}
                                target="_blank"
                            >
                                صفحه اصلی
                            </a>
                        </div>
                        <div className="">
                            <div className="w-full">
                                <SearchInput
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>نام</th>
                                    <th>لینک</th>
                                    <th>مالک</th>
                                    <th>بازدید</th>
                                    <th>آخرین بازدید</th>
                                    <th className="min-w-[150px]" />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((link, index) => (
                                    <tr key={link.id}>
                                        <td>{link.name}</td>
                                        <td>
                                            <div
                                                className="flex flex-row gap-1"
                                                onClick={() =>
                                                    handleCopyToClipboard(link)
                                                }
                                            >
                                                {route(
                                                    'shortlink.redirect',
                                                    link
                                                )}
                                                <ClipboardCopy className="h-5 w-5" />
                                            </div>
                                        </td>
                                        <td>
                                            {link.user ? link.user.name : ''}
                                        </td>
                                        <td>{link.visit_count}</td>
                                        <td>
                                            {formatDateTime(
                                                link.last_visited_at
                                            )}
                                        </td>
                                        <td className="text-end">
                                            <div className="flex flex-row gap-1">
                                                <Button
                                                    onClick={() =>
                                                        router.visit(
                                                            route(
                                                                'shortlink.link.show',
                                                                link
                                                            )
                                                        )
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <Eye className="h-4 w-4" />
                                                    </div>
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        toggleFormModal(link)
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <Pencil className="h-4 w-4" />
                                                    </div>
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleDeleteClick(link)
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <Trash className="h-4 w-4" />
                                                    </div>
                                                </Button>
                                            </div>
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
                onConfirm={onDelete}
                modalState={confirmModal}
            />
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
