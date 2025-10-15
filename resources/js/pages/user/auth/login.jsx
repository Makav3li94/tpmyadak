import React, {useEffect} from 'react'
import GuestLayout from '@/layouts/default/guest-layout'
import {Head, Link, useForm} from '@inertiajs/react'

import {TextInput, Checkbox, Button} from '@/components/index'
import LandingIntro from "@/pages/user/auth/partials/LandingIntro.jsx";

export default function Login({status}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
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
            post(route('login'))
        }
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('login'))
    }

    return (
        <GuestLayout>
            <Head title="ورود"/>

            <h2 className='text-2xl font-semibold mb-2 text-center'>ورود</h2>
            <form onSubmit={submit}>

                <div className="mb-4">
                    <TextInput
                        type="text"
                        label="ایمیل"
                        name="email"
                        placeholder="user@your-site.com"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        autoFocus={true}
                        onChange={onHandleChange}
                        error={errors.email}
                    />
                </div>
                <div className="mb-4">
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
                <div className='text-right text-primary'>
                    <Link href={route('password.request')}>
                        <span
                            className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">فراموشی رمز عبور</span></Link>
                </div>


                <Button
                    onClick={submit}
                    processing={processing}
                    type={'primary'}
                    className={"btn mt-2 w-full btn-primary"}
                >
                    ورود
                </Button>
                <div className='text-center mt-4'>اکانت ندارید ؟
                    <Link href={route('register')}>
                    <span
                        className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">ثبت نام</span>
                </Link> کنید.

                </div>
            </form>


        </GuestLayout>
    )
}
