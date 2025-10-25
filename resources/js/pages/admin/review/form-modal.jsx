import React, {useEffect} from 'react'
import {useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Checkbox, Modal, Select, TextInput} from '@/components/index'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";


export default function FormModal(props) {
    const {modalState} = props
    const formState = {
        title: '',
        review: '',
        rating: '',
        approve: '',
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
        const review = modalState.data
        if (review !== null) {
            put(route('admin.reviews.update', review.id), {
                onSuccess: () => handleClose(),
            })
            return
        }
        // post(route('admin.reviews.store'), {
        //     onSuccess: () => handleClose(),
        // })
    }
    useEffect(() => {
        const review = modalState.data
        if (isEmpty(review) === false) {
            setData(review)
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'افزودن/ویرایش دیدگاه'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                <TextInput
                    name="title"
                    value={data.title}
                    onChange={handleOnChange}
                    label="عنوان"
                    error={errors.title}
                    required={true}
                />
                <TextareaInput
                    name="review"
                    value={data.review}
                    onChange={handleOnChange}
                    label="دیدگاه"
                    error={errors.review}
                    required={true}
                />
                <TextInput
                    type="number"
                    min={1}
                    max={5}
                    name="rating"
                    value={data.rating}
                    onChange={handleOnChange}
                    label="امتیاز"
                    error={errors.rating}
                    required={true}
                />
                <Checkbox
                    label="فعال"
                    name="approve"
                    value={data.approve}
                    onChange={handleOnChange}
                    error={errors.approve}
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
