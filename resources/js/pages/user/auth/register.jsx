import React, { useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

import GuestLayout from '@/layouts/default/guest-layout'
import { TextInput, Button } from '@/components/index'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
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

    const submit = (e) => {
        e.preventDefault()

        post(route('register'))
    }

    return (
        <GuestLayout>
            <Head title="ثبت نام" />
            <h2 className='text-2xl font-semibold mb-2 text-center'>ثبت نام</h2>
            <form onSubmit={submit}>
                <div>
                    <TextInput
                        label="نام"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={onHandleChange}
                        error={errors.name}
                    />
                </div>

                <div>
                    <TextInput
                        label="ایمیل"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onHandleChange}
                        error={errors.email}
                    />
                </div>

                <div>
                    <TextInput
                        label="رمزعبور"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onHandleChange}
                        error={errors.password}
                    />
                </div>

                <div>
                    <TextInput
                        label="تایید رمز"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                        error={errors.password_confirmation}
                    />
                </div>


                    <Button
                        onClick={submit}
                        processing={processing}
                        type={'primary'}
                        className={"btn mt-2 w-full btn-primary"}
                    >
                        ثبت نام
                    </Button>
                    <div className='text-center mt-4'>قبلا ثبت نام کردید ؟
                        <Link href={route('login')}>
                    <span
                        className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">وارد</span>
                        </Link> شوید.


                </div>
            </form>
        </GuestLayout>
    )
}
