import React, {useEffect} from 'react'
import {useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Checkbox, Modal, Select, TextInput} from '@/components/index'


export default function FormModal(props) {
    const {modalState} = props
    const formState = {
        title: '',
        cost: '',
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

    const handleReset = () => {
        modalState.setData(null)
        setData(formState)
        clearErrors()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const shippingMethod = modalState.data
        if (shippingMethod !== null) {
            put(route('admin.shipping.methods.update', shippingMethod), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.shipping.methods.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const shippingMethod = modalState.data
        if (isEmpty(shippingMethod) === false) {
            setData(shippingMethod)
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'افزودن/ویرایش متد ارسال'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                <TextInput
                    name="title"
                    value={data.title}
                    onChange={handleOnChange}
                    label="عنوان"
                    error={errors.title}
                    required={true}
                />
                <TextInput
                    name="cost"
                    value={data.cost}
                    onChange={handleOnChange}
                    label="هزینه"
                    error={errors.cost}
                    type="number"
                    min={0}
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
