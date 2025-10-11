import React, {useEffect, useState} from 'react'
import {useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Modal, SelectModalInput, TextInput} from '@/components/index'


export default function FormModal(props) {
    const {modalState} = props
    const [mounted, setMounted] = useState(false)
    const formState = {
        title: '',
        slug: '',
        car_brand_id: '',
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
        const carModel = modalState.data
        if (carModel !== null) {
            put(route('admin.car.models.update', carModel), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.car.models.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const carModel = modalState.data
        if (isEmpty(carModel) === false) {
            setData(carModel)
        }
    }, [modalState])
    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'افزودن/ویرایش مدل خودرو'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                {mounted && (
                    <>
                        <SelectModalInput
                            label="مدل خودرو"
                            value={data.car_brand}
                            onChange={(item) =>
                                setData({
                                    ...data,
                                    car_brand: item,
                                    car_brand_id: item ? item.id : null,
                                })
                            }
                            onRemove={() =>
                                setData({...data, car_brand: '', car_brand_id: null})
                            }
                            error={errors.car_brand_id}
                            params={{
                                table: 'car_brands',
                                columns: 'id|title',
                                // raw_query: ' `parent_id` = 0 ' + ' AND `id` != ' + `'${data.id}'`,
                            }}
                        />
                    </>
                )}
                <TextInput
                    name="title"
                    value={data.title}
                    onChange={handleOnChange}
                    label="عنوان"
                    error={errors.title}
                    required={true}
                />
                <TextInput
                    name="slug"
                    value={data.slug}
                    onChange={handleOnChange}
                    label="اسلاگ"
                    error={errors.slug}
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
