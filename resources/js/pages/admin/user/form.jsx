import React, {useEffect, useState} from 'react'
import {Head, Link, router, useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Card, ModalConfirm, Select, SelectModalInput, TextInput} from '@/components/index'
import AuthenticatedLayout from "@/layouts/default/authenticated-layout.jsx";

import FormModal from './form-modal'
import {useModal} from "@/hooks.js";

export default function Form(props) {
    const {user} = props
    const formModal = useModal()
    const confirmModal = useModal()
    const formState = {
        name: '',
        email: '',
        password: '',
        role_id: null,
        role: '',
        familiarity_id: '',
        ref_id: '',
        mobile: '',
        status: '',
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
        if (!isEmpty(user)) {
            put(route('admin.users.update', user))
            return
        }
        post(route('admin.users.store'))
    }
    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.addresses.destroy', confirmModal.data.id))
        }
    }
    useEffect(() => {
        if (isEmpty(user) === false) {
            setData(
                {
                    name: user.name,
                    email: user.email,
                    // role_id: user.role_id,
                    familiarity_id: user.familiarity_id,
                    familiarity: user.familiarity,
                    // ref_id: user.ref_id,
                    mobile: user.mobile,
                    status: user.status,
                }
            )
        }
    }, [user])

    const toggleFormModal = (address = null) => {
        formModal.setData(address)
        formModal.toggle()
    }
    const handleDeleteClick = (address) => {
        confirmModal.setData(address)
        confirmModal.toggle()
    }
    return (
        <AuthenticatedLayout
            title={'مشتری'}
            breadcumbs={[
                {name: 'داشبورد', href: route('admin.dashboard')},
                {name: 'مشتری', href: route('admin.users.index')},
                {
                    name: 'ویرایش/ساخت',
                    href: user
                        ? route('admin.users.edit', user)
                        : route('admin.users.create'),
                },
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
                                <SelectModalInput
                                    label="دسته"
                                    value={data.familiarity}
                                    onChange={(item) =>
                                        setData({
                                            ...data,
                                            familiarity: item,
                                            familiarity_id: item ? item.id : null,
                                        })
                                    }
                                    onRemove={() =>
                                        setData({...data, familiarity: '', familiarity_id: null})
                                    }
                                    error={errors.familiarity_id}
                                    params={{
                                        table: 'familiarities',
                                        columns: 'id|title',
                                        orderby: 'created_at.asc',
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex  gap-12 w-full">
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
                            <div className="basis-1/2">
                                <TextInput
                                    name="mobile"
                                    value={data.mobile}
                                    onChange={handleOnChange}
                                    label="موبایل"
                                    error={errors.mobile}
                                />
                            </div>
                        </div>
                        <div className="flex  gap-12 w-full">
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
                            <div className="basis-1/2">
                                <Select label='وضعیت' value={data.status} onChange={handleOnChange}
                                        error={errors.status} name='status' required>
                                    <option value='active' key='status'>فعال</option>
                                    <option value='suspend' key='status'>معلق</option>
                                    <option value='pending' key='status'>انتظار</option>
                                </Select>
                            </div>
                        </div>


                        <div className="flex items-center space-x-2 mt-4 justify-around">
                            <Button processing={processing} btnType="submit" type="primary">
                                ذخیره
                            </Button>
                            <Link href={route('admin.product.categories.index')}>
                                <Button type="secondary">
                                    انصراف
                                </Button>
                            </Link>
                        </div>
                    </form>
                </Card>
                {isEmpty(user) === false &&
                <Card>
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/2">
                            <h3 className="text-lg mb-4">لیست آدرس ها</h3>
                            {(user && user.addresses && user.addresses.length > 0) ? user.addresses.map((address, i) =>

                                <div className="card w-96 bg-base-100 card-sm shadow-sm">
                                    <div className="card-body">
                                        <h2 className="card-title">آدرس {++i}</h2>
                                        <p>{address.name}</p>
                                        <p>{address.postal_code}</p>
                                        {/*<p>{address.m_code}</p>*/}
                                        <p>{address.mobile}</p>
                                        <p>{address.phone}</p>
                                        <p>{address.address}</p>
                                        <div className="justify-end card-actions">
                                            <button className="btn btn-primary"
                                                    onClick={() =>
                                                        toggleFormModal(
                                                            address
                                                        )
                                                    }
                                            >ویرایش
                                            </button>
                                            <button className="btn btn-error" onClick={() =>
                                                        handleDeleteClick(
                                                            address
                                                        )}>حذف</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div role="alert" className="alert alert-warning alert-dash mt-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current"
                                         fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                    </svg>
                                    <span>آدرسی موجود نیست.</span>

                                </div>
                            )}

                                <Button className='mt-5' processing={processing} btnType="submit" type="info"
                                        onClick={() => toggleFormModal()}
                                >
                                    افزودن آدرس
                                </Button>
                        </div>

                    </div>


                </Card>
                }
            </div>
            {formModal.isOpen && <FormModal modalState={formModal} user={user}/>}
            {confirmModal.isOpen &&  <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />}
        </AuthenticatedLayout>
    )
}
