import React, {useEffect, useState} from 'react'
import {Head, Link, router, useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Card, ModalConfirm, Select, SelectModalInput, TextInput} from '@/components/index'

import FormModal from './form-modal'
import {useModal} from "@/hooks.js";
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";

export default function Index(props) {
    const {user,addresses} = props
    const formModal = useModal()
    const confirmModal = useModal()





    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('user.addresses.destroy', confirmModal.data.id))
        }
    }


    const toggleFormModal = (address = null) => {
        formModal.setData(address)
        formModal.toggle()
    }
    const handleDeleteClick = (address) => {
        confirmModal.setData(address)
        confirmModal.toggle()
    }
    console.log(formModal)
    return (
        <UserAuthenticatedLayout
            title={'مشتری'}
            breadcumbs={[
                {name: 'داشبورد', href: route('user.dashboard')},
                {name: 'مشتری', href: route('user.addresses.index')},

            ]}
        >
            <Head title="مشتری"/>
            <div class="flex flex-col gap-5">
                <Card>
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/1 ">
                            <h3 className="text-lg mb-4">لیست آدرس ها</h3>
                            {(addresses && addresses.length > 0) ? addresses.map((address, i) =>

                                <div className="card  bg-base-100 card-sm shadow-sm mb-4" key={i}>
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

                                <Button className='mt-5'  type="info" onClick={() => toggleFormModal()}>
                                    افزودن آدرس
                                </Button>
                        </div>

                    </div>


                </Card>
            </div>
            {formModal.isOpen && <FormModal modalState={formModal} user={user}/>}
            {confirmModal.isOpen &&  <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />}
        </UserAuthenticatedLayout>
    )
}
