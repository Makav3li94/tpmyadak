import React, {useEffect} from 'react'
import {useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Checkbox, FormFile, Modal, TextInput} from '@/components/index'


export default function FormModal(props) {
    const {modalState} = props
    const formState = {
        title: '',
        alias: '',
        slug: '',
        image: '',
        url: '',
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
        const brand = modalState.data
        if (brand !== null) {
            put(route('admin.suppliers.update', brand), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.suppliers.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const brand = modalState.data
        if (isEmpty(brand) === false) {
            setData(brand)
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'دسته وبلاگ'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                <div className="flex gap-3">
                    <div class="basis-1/2">
                        <TextInput
                            name="title"
                            value={data.title}
                            onChange={handleOnChange}
                            label="عنوان"
                            error={errors.title}
                            required
                        />

                    </div>
                    <div className="basis-1/2">
                        <TextInput
                            name="alias"
                            value={data.alias}
                            onChange={handleOnChange}
                            label="نام تجاری"
                            error={errors.alias}
                        />
                    </div>
                </div>
                <TextInput
                    name="slug"
                    value={data.slug}
                    onChange={handleOnChange}
                    label="اسلاگ"
                    error={errors.slug}
                />
                <TextInput
                    name="url"
                    value={data.url}
                    onChange={handleOnChange}
                    label="لینک"
                    error={errors.url}
                />
                <div className="flex gap-3">
                    <div className="basis-1/2">
                        <TextInput
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                            label="ایمیل"
                            error={errors.email}
                        />

                    </div>
                    <div className="basis-1/2">
                        <TextInput
                            name="تلفن"
                            value={data.phone}
                            onChange={handleOnChange}
                            label="تلفن"
                            error={errors.phone}
                        />
                    </div>
                </div>


                <TextInput
                    name="address"
                    value={data.address}
                    onChange={handleOnChange}
                    label="آدرس"
                    error={errors.address}
                />
                <FormFile
                    label={'تصویر'}
                    onChange={(file_path) => setData('image', file_path)}
                    error={errors.image}
                    url={data.image}
                    filemimes="image/jpg,image/jpeg,image/png"
                />
                <Checkbox
                    label="فعال"
                    name="status"
                    value={data.status}
                    onChange={handleOnChange}
                    error={errors.status}
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
