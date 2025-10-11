import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import { TextInput, Button, Modal } from '@/components/index'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            label: '',
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
        const permission = modalState.data
        if (permission !== null) {
            put(route('admin.permissions.update', permission), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.permissions.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const permission = modalState.data
        if (isEmpty(permission) === false) {
            setData({
                name: permission.name,
                label: permission.label,
            })
            return
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'Permission'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="عنوان"
                    placeholder="عنوان دسترسی"
                    error={errors.name}
                />
                <TextInput
                    name="label"
                    value={data.label}
                    onChange={handleOnChange}
                    label="لیبل"
                    placeholder="لیبل دسترسی"
                    error={errors.label}
                />

                <div className="flex items-center space-x-2 mt-4 justify-around">
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
