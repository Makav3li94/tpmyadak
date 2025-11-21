import React, {useEffect, useState} from 'react'
import {Head, Link, router, useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Card,  TextInput} from '@/components/index'

import {useModal} from "@/hooks.js";
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";

export default function Form(props) {
    const {user} = props
    const formModal = useModal()
    const confirmModal = useModal()
    const formState = {
        name: '',
        email: '',
        password: '',
        role_id: null,
        ref_id: '',
        mobile: '',
    }

    const {data, setData, post, put, processing, errors, clearErrors} =
        useForm(formState)
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
            put(route('user.profile.update', user))
    }

    useEffect(() => {
        if (isEmpty(user) === false) {
            setData(
                {
                    name: user.name,
                    email: user.email,
                    // role_id: user.role_id,
                    // ref_id: user.ref_id,
                    mobile: user.mobile,
                    status: user.status,
                }
            )
        }
    }, [user])


    return (
        <UserAuthenticatedLayout
            title={'مشتری'}
            breadcumbs={[
                {name: 'داشبورد', href: route('user.dashboard')},
                {name: 'مشتری', href: route('user.profile.edit',user)},

            ]}
        >
            <Head title="مشتری"/>
            <div class="flex flex-col gap-5">
                <Card>
                    <form className="form-control space-y-2.5 w-full " onSubmit={handleSubmit}>
                        <div className="flex  gap-12 w-full">
                            <div className="basis-1/2">
                                <TextInput
                                    name="name"
                                    value={data.name}
                                    onChange={handleOnChange}
                                    label="نام و نام خانوادگی"
                                    error={errors.name}
                                />

                            </div>
                            <div className="basis-1/2">
                                <TextInput
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    label="ایمیل"
                                    error={errors.email}
                                />
                            </div>
                        </div>

                        <div className="flex  gap-12 w-full">

                            <div className="basis-1/2">
                                <TextInput
                                    name="mobile"
                                    value={data.mobile}
                                    onChange={handleOnChange}
                                    label="موبایل"
                                    error={errors.mobile}
                                />
                            </div>
                            <div className="basis-1/2">
                                <TextInput
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                    label="رمز عبور"
                                    error={errors.password}
                                />
                            </div>
                        </div>

                        {/*<div className="flex items-center space-x-2 mt-4 justify-around">*/}
                        {/*    <Button processing={processing} btnType="submit" type="primary">*/}
                        {/*        ذخیره*/}
                        {/*    </Button>*/}
                        {/*    <Link href={route('user.dashboard')}>*/}
                        {/*        <Button type="secondary">*/}
                        {/*            انصراف*/}
                        {/*        </Button>*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </form>
                </Card>
            </div>
        </UserAuthenticatedLayout>
    )
}
