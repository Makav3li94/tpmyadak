import React, {useEffect} from 'react'
import {useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Modal, SelectModalInput, TextInput} from '@/components/index'

export default function FormModal(props) {
    const {modalState, orderId} = props
    const orderDetail = modalState.data
    const {data, setData, post, put, processing, errors, reset, clearErrors} =
        useForm({
            order_id: orderId,
            product_id: '',
            product: '',
            title: '',
            amount: '',
            unit: '',
            total_price: '',
            discount: 0,
            tax: 0,
            attribute: '',
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

        if (orderDetail !== null) {
            put(route('admin.order.details.update', orderDetail), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.order.details.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const orderDetail = modalState.data
        if (isEmpty(orderDetail) === false) {
            setData({
                order_id: orderDetail.order_id,
                product_id: orderDetail.product_id,
                title: orderDetail.title,
                amount: orderDetail.amount,
                unit: orderDetail.unit,
                total_price: orderDetail.total_price,
                tax: orderDetail.tax,
                attribute: orderDetail.attribute,
            })
        }
    }, [modalState])
    useEffect(() => {
        setData('total_price',(data.amount * data.unit))
    }, [data.unit])
    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'ایتم صفارش'}>
            <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                <SelectModalInput label="محصول" value={data.product}
                                  onChange={(item) =>
                                      setData({
                                          ...data,
                                          product: item,
                                          amount: item.price,
                                          title: item.title,
                                          unit: item.minimum,
                                          discount: (item.discount !== null && item.discount !==0) ? item.discount : 0,
                                          total_price: item.minimum * item.price,
                                          product_id: item ? item.id : null,
                                      })
                                  }
                                  onRemove={() =>
                                      setData({...data, product: '', product_id: null})
                                  }
                                  error={errors.product_id}
                                  params={{
                                      table: 'products',
                                      columns: 'id|title|price|minimum|discount',
                                      orderby: 'created_at.asc',
                                      // raw_query: ' `parent_id` = 0 ',
                                  }}
                />
                {(data.product || !isEmpty(orderDetail)) &&
                    <>
                        <TextInput
                            name="title"
                            value={data.title}
                            onChange={handleOnChange}
                            label="عنوان"
                            error={errors.title}
                        />
                        <TextInput
                            name="amount"
                            value={data.amount}
                            onChange={handleOnChange}
                            label="قیمت محصول"
                            error={errors.amount}
                        />
                        <TextInput
                            name="unit"
                            value={data.unit}
                            onChange={handleOnChange}
                            label="تعداد"
                            type='number'
                            min={1}
                            error={errors.unit}
                        />
                    </>
                }
                <TextInput
                    name="total_price"
                    value={data.total_price}
                    onChange={handleOnChange}
                    label="قبمت کل"
                    type='number'
                    readOnly
                    min={data.total_price}
                    error={errors.total_price}
                />
                <TextInput
                    name="tax"
                    value={data.tax}
                    onChange={handleOnChange}
                    label="مالیات"
                    type='number'
                    min={0}
                    error={errors.tax}
                />
                <TextInput
                    name="attribute"
                    value={data.attribute}
                    onChange={handleOnChange}
                    label="ویژگی(سایز،رنگ و ... )"
                    error={errors.attribute}
                />
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
