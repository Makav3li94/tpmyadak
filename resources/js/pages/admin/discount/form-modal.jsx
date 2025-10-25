import React, {useEffect, useState} from 'react'
import {useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Checkbox, FormFile, Modal, SelectModalInput, TextInput} from '@/components/index'
import Select2Input from "@/components/daisy-ui/select2-input.jsx";
import {Datepicker} from "@ijavad805/react-datepicker";


export default function FormModal(props) {
    const [mounted, setMounted] = useState(false)
    const {modalState} = props
    const formState = {
        title: '',
        user_id: '',
        product_category_id: '',
        code: 'tpm-',
        percentage: '',
        max_limit: '',
        max_minus: '',
        active_at: '',
        expire_at: '',
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
        const discount = modalState.data
        if (discount !== null) {
            put(route('admin.discounts.update', discount), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.discounts.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const discount = modalState.data
        if (isEmpty(discount) === false) {
            setData(discount)
        }
        setMounted(true)
    }, [modalState])
    const handleActive = (date) => {
        setData('active_at', date.format())
    }
    const handleExpite = (date) => {
        setData('expire_at', date.format())
    }
    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'دسته وبلاگ'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                <TextInput
                    name="title"
                    value={data.title}
                    onChange={handleOnChange}
                    label="عنوان"
                    error={errors.title}
                />
                <div className="flex gap-3">
                    <div className="basis-1/2">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">تاریخ انتشار</legend>
                            <Datepicker format={'YYYY-MM-DD'}
                                        className=''
                                        lang='fa'
                                        input={<input className="w-full input " placeholder='تاریخ شروع'/>}
                                        value={data.active_at}
                                        onChange={(val) => {
                                            handleActive(val)
                                        }}/>
                            {errors.active_at && <p className="fieldset-label text-error">{errors.active_at}</p>}
                        </fieldset>
                    </div>
                    <div className="basis-1/2">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">تاریخ انقضا</legend>
                            <Datepicker format={'YYYY-MM-DD'}
                                        className=''
                                        lang='fa'
                                        input={<input className="w-full input " placeholder='تاریخ انقضا'/>}
                                        value={data.expire_at}
                                        onChange={(val) => {
                                            handleExpite(val)
                                        }}/>
                            {errors.expire_at && <p className="fieldset-label text-error">{errors.expire_at}</p>}
                        </fieldset>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="basis-1/2">
                        {mounted && (
                            <SelectModalInput label="اختصاص به کاربر" value={data.user} onChange={(item) =>
                                setData({
                                    ...data,
                                    user: item,
                                    user_id: item ? item.id : null,
                                })
                            } onRemove={() => setData({...data, user: '', user_id: null})}
                                              error={errors.user_id}
                                              params={{
                                                  table: 'users',
                                                  columns: 'id|name',
                                              }}
                            />
                        )}
                    </div>
                    <div className="basis-1/2">
                        {mounted && (
                            <SelectModalInput label="اختصاص به دسته" value={data.product_category} onChange={(item) =>
                                setData({
                                    ...data,
                                    product_category: item,
                                    product_category_id: item ? item.id : null,
                                })
                            } onRemove={() => setData({...data, product_category: '', product_category_id: null})}
                                              error={errors.product_category_id}
                                              params={{
                                                  table: 'product_categories',
                                                  columns: 'id|title',
                                              }}
                            />
                        )}
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="basis-1/2">
                        <TextInput name="code" value={data.code} onChange={handleOnChange} dir="ltr"     maxLength={9}
                                   label="کدتخفیف" placeHolder="tpm-12345" error={errors.code} required/>
                    </div>
                    <div className="basis-1/2">
                        <TextInput type='number' name="percentage" value={data.percentage} onChange={handleOnChange} dir="ltr"
                                   label="درصد تخفیف" min={1} max={100} error={errors.percentage}/>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="basis-1/2">
                        <TextInput type='number' name="max_limit" value={data.max_limit} onChange={handleOnChange}
                                   label="حداکثر استفاده" min={1} error={errors.max_limit} required/>
                    </div>
                    <div className="basis-1/2">
                        <TextInput type='number' name="max_minus" value={data.max_minus} onChange={handleOnChange}
                                   label="سقف تخفیف" error={errors.max_minus}/>
                    </div>
                </div>




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
