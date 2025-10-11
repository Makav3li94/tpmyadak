import React, {useEffect} from 'react'
import {useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Checkbox, Modal, Select, TextInput} from '@/components/index'


export default function FormModal(props) {
    const {modalState} = props
    const formState = {
        title: '',
        type: 'radio',
        sort: '',
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
            put(route('admin.attribute.groups.update', brand), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.attribute.groups.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const brand = modalState.data
        if (isEmpty(brand) === false) {
            setData(brand)
        }
    }, [modalState])
    console.log(data)
    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'گروه ویژگی'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                <TextInput
                    name="title"
                    value={data.title}
                    onChange={handleOnChange}
                    label="عنوان"
                    error={errors.title}
                    required
                />
                <TextInput
                    name="sort"
                    value={data.sort}
                    onChange={handleOnChange}
                    label="چینش"
                    error={errors.sort}
                    type="number"
                    min={0}
                />
                <Select
                    label='نوع'
                    value={data.type}
                    onChange={(e)=>setData('type',e.target.value)}
                    error={errors.type}
                    name='type'>
                        <option value='radio' key='type' selected>
                            radio
                        </option>
                        <option value='select' key='type'>
                            select
                        </option>
                        <option value='checkbox' key='type'>
                            checkbox
                        </option>
                </Select>
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
