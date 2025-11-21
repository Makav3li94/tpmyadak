import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import { Modal, Button, TextInput, SelectModalInput } from '@/components/index'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";

export default function FormModal(props) {
    const { modalState ,user} = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            user_id: user.id,
            name: user.name,
            postal_code: '',
            m_code: '',
            mobile: user.mobile,
            phone: '',
            address: '',
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

    const handleReset = () => {
        modalState.setData(null)
        reset()
        clearErrors()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const address = modalState.data

        if (address !== null) {
            put(route('user.addresses.update', address.id), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('user.addresses.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const address = modalState.data
        if (isEmpty(address) === false) {
            setData({
                user_id: address.user_id,
                name: address.name,
                postal_code: address.postal_code,
                m_code: address.m_code,
                mobile: address.mobile,
                phone: address.phone,
                address: address.address,
            })
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'کاربران'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="نام و نام خانوادگی"
                    error={errors.name}
                />
                <TextInput
                    name="postal_code"
                    value={data.postal_code}
                    onChange={handleOnChange}
                    label="کدپستی"
                    error={errors.postal_code}
                    maxLength={10}
                />
                <TextInput
                    name="m_code"
                    value={data.m_code}
                    onChange={handleOnChange}
                    label="کدملی خریدار"
                    maxLength={10}
                    error={errors.m_code}
                />

                <TextInput
                    name="mobile"
                    value={data.mobile}
                    onChange={handleOnChange}
                    label="موبایل"
                    maxLength={11}
                    error={errors.mobile}
                />
                <TextInput
                    name="phone"
                    value={data.phone}
                    onChange={handleOnChange}
                    label="تلفن ثابت"
                    maxLength={11}
                    error={errors.phone}
                />
                <TextareaInput name='address' value={data.address} label='آدرس' onChange={handleOnChange}
                               error={errors.address}/>
                <div className="flex items-center space-x-2 mt-4 w-full justify-around">
                    <Button processing={processing} btnType="submit" type="primary">
                        ذخیره
                    </Button>
                    <Button onClick={handleClose} type="secondary">
                        انصراف
                    </Button>
                </div>
            </form>

        </Modal>
    )
}
