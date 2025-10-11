import React, { useEffect } from 'react'
import GuestLayout from '@/layouts/default/guest-layout'
import { Head, useForm } from '@inertiajs/react'

import { TextInput, Checkbox, Button } from '@/components/index'

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        identity: '',
        password: '',
        remember: '',
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            post(route('admin.store'))
        }
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('admin.store'))
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <TextInput
                        type="text"
                        label="ایمیل"
                        name="identity"
                        placeholder="user@your-site.com"
                        value={data.identity}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        autoFocus={true}
                        onChange={onHandleChange}
                        error={errors.email}
                    />
                </div>

                <div>
                    <TextInput
                        type="password"
                        label="رمزعبور"
                        name="password"
                        placeholder="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={onHandleChange}
                        error={errors.password}
                        onKeyDownCapture={handleKeyDown}
                    />
                </div>

                <div className="mt-2">
                    <Checkbox
                        label="به خاطر بسپار"
                        name="remember"
                        value={data.remember}
                        onChange={onHandleChange}
                        error={errors.remember}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button
                        onClick={submit}
                        processing={processing}
                        type={'primary'}
                    >
                        ورود
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
