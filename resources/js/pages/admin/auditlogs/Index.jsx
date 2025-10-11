import { router, Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
  Card,
  Button
} from '@/components/index'
import React from "react";

export default function Index({logs}) {


  return (
      <AuthenticatedLayout
          title={'لاگ کاربر'}
          breadcumbs={[
            { name: 'داشبورد', href: route('admin.dashboard') },
            { name: 'لاگ کاربر', href: route('admin.audit-logs.index') },
          ]}
      >
        <Head title="لاگ کاربر" />

        <div>
          <Card>

            {logs.data.length === 0 ? (
                <p className="text-muted-foreground text-center">No activity logs.</p>
            ) : (
                logs.data.map((log) => (
                    <div
                        key={log.id}
                        className="border px-4 py-3 rounded-md bg-muted/50 hover:bg-muted/70 transition"
                    >
                      <div className="font-medium text-sm text-foreground">
                        {log.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {log.causer?.name ?? 'System'} • {new Date(log.created_at).toLocaleString()}
                        {log.subject_type ? ` • ${log.subject_type.split('\\').pop()}` : ''}
                      </div>
                      {log.properties && Object.keys(log.properties).length > 0 && (
                          <pre className="mt-2 rounded bg-muted p-2 text-xs overflow-auto max-h-48">
                      {JSON.stringify(log.properties, null, 2)}
                    </pre>
                      )}
                    </div>
                ))
            )}

            {/* Pagination */}
            {logs.links.length > 1 && (
                <div className="flex justify-center pt-6 flex-wrap gap-2">
                  {logs.links.map((link, i) => (
                      <Button
                          key={i}
                          disabled={!link.url}
                          variant={link.active ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => router.visit(link.url || '', { preserveScroll: true })}
                      >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                      </Button>
                  ))}
                </div>
            )}
          </Card>
        </div>
      </AuthenticatedLayout>
  )
}
