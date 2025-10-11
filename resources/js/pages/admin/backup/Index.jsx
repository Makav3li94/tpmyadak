import { router, Head } from '@inertiajs/react'
import {  Trash } from 'lucide-react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
  Dropdown,
  Card,
  ModalConfirm,
  Button, SearchInput,
} from '@/components/index'
import { useModal } from '@/hooks'
import {toast} from "sonner";
import React from "react";

export default function Index({backups}) {


  const confirmModal = useModal()



  const handleDeleteClick = (backup) => {
    confirmModal.setData(backup)
    confirmModal.toggle()
  }

  const onDelete = () => {
    if (confirmModal.data !== null) {
      router.delete(`tpmauto/backup/delete/${filename}`, {
        onSuccess: () => toast.success('Backup deleted successfully'),
        onError: () => toast.error('Failed to delete backup'),
        preserveScroll: true,
      });
    }
  }
  const handleBackup = () => {
    router.post('tpmauto/backup/run', {}, {
      onSuccess: () => toast.success('Backup created successfully'),
      onError: () => toast.error('Failed to create backup'),
      preserveScroll: true,
    });
  };

  return (
      <AuthenticatedLayout
          title={'بکاپ'}
          breadcumbs={[
            { name: 'داشبورد', href: route('admin.dashboard') },
            { name: 'بکاپ', href: route('admin.backup.index') },
          ]}
      >
        <Head title="بکاپ" />

        <div>
          <Card>
            <div className="flex justify-between mb-4">
                <Button size="sm" onClick={() => handleBackup()} type="primary">
                  ساخت بکاپ
                </Button>

            </div>
            <div className="overflow-x-auto">
              <table className="table mb-4">
                <thead>
                <tr>
                  <th>نام</th>
                  <th />
                </tr>
                </thead>
                <tbody>
                {backups.length === 0 ? (
                    <p className="text-muted-foreground text-center">No backups available.</p>
                ) : (
                backups.map((backup, index) => (
                    <tr key={index}>
                      <td>
                        <div>
                          <div className="font-medium">{backup.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatSize(backup.size)} •{' '}
                            {new Date(backup.last_modified * 1000).toLocaleString()}
                          </div>
                        </div>
                      </td>

                      <td className="text-end">
                        <Dropdown>
                          <Dropdown.Item>
                          <a href={backup.download_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">دانلود</Button>
                          </a>
                          </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() =>
                                    handleDeleteClick(
                                        backup
                                    )
                                }
                            >
                              <div className="flex space-x-1 items-center">
                                <Trash className="w-4 h-4" />
                                <div>حذف</div>
                              </div>
                            </Dropdown.Item>
                        </Dropdown>
                      </td>
                    </tr>
                )))}
                </tbody>
              </table>
            </div>

          </Card>
        </div>
        <ModalConfirm
            onConfirm={onDelete}
            modalState={confirmModal}
        />
      </AuthenticatedLayout>
  )
}
function formatSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}
