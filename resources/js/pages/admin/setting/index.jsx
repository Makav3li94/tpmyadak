import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    Card,
    TextInput,
    Button,
    FormFile,
    TextareaInput,
} from '@/components/index'

const extractValue = (set, key) => {
    const find = set.find((s) => s.key === key)
    if (isEmpty(find) === false) {
        if (find.type === 'image') {
            return find?.url
        }
        return find?.value
    }
    return ''
}

export default function Setting(props) {
    const { setting } = props

    const app_logo_url = extractValue(setting, 'app_logo')
    const { data, setData, post, processing, errors } = useForm({
        app_name: extractValue(setting, 'app_name'),
        app_logo: '',
    })

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('admin.setting.update'))
    }

    return (
        <AuthenticatedLayout
            title={'تنظیمات'}
            breadcumbs={[
                { name: 'داشبورد', href: route('admin.dashboard') },
                { name: 'تنظیمات', href: route('admin.setting.index') },
            ]}
        >
            <Head title="تنظیمات" />

            <div>
                <Card>
                    <div className="text-xl font-bold mb-4 text-base-content">
                        تنظیمات
                    </div>
                    <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                    <TextInput
                        name="app_name"
                        value={data.app_name}
                        onChange={handleOnChange}
                        label="نام سایت"
                        error={errors.app_name}
                    />
                    <FormFile
                        label={'App Logo'}
                        onChange={(file_path) => setData('app_logo', file_path)}
                        error={errors.app_logo}
                        url={app_logo_url}
                        filemimes="image/jpg,image/jpeg,image/png"
                    />

                    <div className="mt-4">
                        <Button processing={processing} btnType="submit" type="primary">
                            ویرایش
                        </Button>
                    </div>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
