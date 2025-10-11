import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import { Modal, Button, TextInput, Checkbox } from '@/components/index/index.js'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            link: '',
            code: '',
            bot_protection: '',
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

    const handleSubmit = () => {
        const link = modalState.data
        if (link !== null) {
            put(route('admin.shortlink.link.update', link), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.shortlink.link.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const link = modalState.data
        if (isEmpty(link) === false) {
            setData({
                name: link.name,
                link: link.real_link,
                code: link.code,
                bot_protection: link.bot_protection,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'شورتلینک'}
        >
            <div className="form-control space-y-2.5">
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="نام"
                    error={errors.name}
                />

                <TextInput
                    name="link"
                    value={data.link}
                    onChange={handleOnChange}
                    label="URL"
                    error={errors.link}
                />
                {!isEmpty(modalState.data) && (
                    <TextInput
                        name="code"
                        value={data.code}
                        onChange={handleOnChange}
                        label="کد"
                        error={errors.code}
                    />
                )}
                <Checkbox
                    name="bot_protection"
                    value={+data.bot_protection === 1}
                    onChange={handleOnChange}
                    label="Bot Protection"
                    error={errors.bot_protection}
                />
            </div>
            <div className="flex items-center space-x-2 mt-4 justify-around">
                <Button
                    onClick={handleSubmit}
                    processing={processing}
                    type="primary"
                >
                    ساخت
                </Button>
                <Button
                    onClick={handleClose}
                    type="secondary"
                >
                    انصراف
                </Button>
            </div>
        </Modal>
    )
}
