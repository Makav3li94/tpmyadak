import React, {useEffect, useState} from 'react'
import {Head, Link, router, useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout.jsx'
import {
    Button,
    Card,
    Dropdown,
    ModalConfirm,
    SearchInput,
    Select,
    SelectModalInput,
    TextInput
} from '@/components/index/index.js'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import HasPermission from "@/components/common/has-permission.jsx";
import {Pencil, Trash} from "lucide-react";
import {useModal} from "@/hooks.js";
import FormModal from './form-modal'
export default function Show(props) {

    const {order} = props
    const confirmModal = useModal()
    const [processing, setProcessing] = useState(false)
    const [mounted, setMounted] = useState(false)
    const formModal = useModal()
    const formData = {
        user_id: '',
        user: '',
        name: '',
        postal_code: '',
        order_address: '',
        mobile: '',
        phone: '',
        address_id: '',
        address: '',
        payment_method_id: '',
        payment_method: '',
        shipping_method_id: '',
        shipping_method: '',
        payment_status: '',
        shipping_status: '',
        note: '',
        status: '',
        subtotal:'',
        discount:'',
        other_fee:'',
        shipping:'',
        tax:'',
        total:'',
    }

    const {data, setData, post, errors, clearErrors} =
        useForm(formData)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEmpty(order) === false) {
            post(
                route('admin.orders.update', order),
                {
                    onStart: () => setProcessing(true),
                    onFinish: (e) => {
                        setProcessing(false)
                    },
                }
            )

        }
    }

    useEffect(() => {
        if (!mounted && !isEmpty(order)) {
            setData(
                {
                    user_id: order.user_id,
                    user: order.user,
                    name: order.name,
                    postal_code: order.postal_code,
                    mobile: order.mobile,
                    phone: order.phone,
                    address_id: order.address_id,
                    address: order.address,
                    payment_method_id: order.payment_method_id,
                    payment_method: order.payment_method,
                    payment_status: order.payment_status,
                    shipping_method_id: order.shipping_method_id,
                    shipping_method: order.shipping_method,
                    shipping_status: order.shipping_status,
                    note: order.note,
                    status: order.status,
                    subtotal:order.subtotal,
                    discount:order.discount,
                    other_fee:order.other_fee,
                    shipping:order.shipping,
                    tax:order.tax,
                    total:order.total,
                    _method: 'put'
                }
            )
        }
        setMounted(true)

    }, [order])
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


    const toggleFormModal = (orderDetail = null) => {
        formModal.setData(orderDetail)
        formModal.toggle()
    }
    const handleDeleteClick = (orderDetail) => {
        confirmModal.setData(orderDetail)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('admin.order.details.destroy', confirmModal.data.id))
        }
    }
    function findSumUsingReduce(cart, key){
        return cart.reduce((s, item) => s + item[key], 0)
    }
    useEffect(() => {
        if (mounted && order.details) {
            const cart = order.details;
            setData({
                ...data,
                subtotal: findSumUsingReduce(cart, 'total_price'),
                discount:data.discount === 0 ?findSumUsingReduce(cart, 'discount') :data.discount,
                tax:data.tax === 0 ?findSumUsingReduce(cart, 'tax') :data.tax,
                total: (data.subtotal+ data.other_fee + data.shipping + data.tax - data.discount),
            })

        }
    }, [mounted])
    return (
        <AuthenticatedLayout
            title={'سفارش'}
            breadcumbs={[
                {name: 'داشبورد', href: route('admin.dashboard')},
                {name: 'سفارش', href: route('admin.orders.index')},
                {
                    name: 'ویرایش/ساخت',
                    href: order
                        ? route('admin.orders.show', order)
                        : route('admin.orders.create'),
                },
            ]}
        >
            <Head title="سفارش"/>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <Card>
                    <div class="flex gap-5 w-full">
                        <div className="basis-1/2">
                            <div className="flex flex-col gap-2 justify-between">
                                <TextInput name="name" value={data.name} onChange={handleOnChange} label="نام"
                                           error={errors.name} required/>
                                <TextInput name="postal_code" value={data.postal_code} onChange={handleOnChange}
                                           label="کدپستی" error={errors.postal_code}/>
                                <TextInput name="mobile" value={data.mobile} onChange={handleOnChange} label="موبایل"
                                           error={errors.mobile}/>
                                <TextInput name="phone" value={data.phone} onChange={handleOnChange} label="تلفن"
                                           error={errors.phone}/>
                                <TextareaInput name='address' value={data.address} label='آدرس'
                                               onChange={handleOnChange}
                                               error={errors.address}/>
                                <TextareaInput name='note' value={data.note} label='نوضیحات' onChange={handleOnChange}
                                               error={errors.note}/>
                            </div>
                        </div>
                        <div className="basis-1/2 ">
                            <TextInput name="created_at" value={order.created_at} label="تاریخ ثبت" disabled/>
                            <TextInput name="created_at" value={order.updated_at} label="آخرین به روز رسانی" disabled/>
                            <div className="flex flex-col gap-2 justify-between">
                                <Select label='وضعیت سفارش' value={data.status} onChange={handleOnChange}
                                        error={errors.status} name='status' required>
                                    <option key='status'>انتخاب کنید</option>
                                    <option value='new' key='status'>جدید</option>
                                    <option value='pending' key='status'>در حال بررسی</option>
                                    <option value='hold' key='status'>در انتظار</option>
                                    <option value='verify' key='status'>تایید شده</option>
                                    <option value='processing' key='status'>در حال انجام</option>
                                    <option value='done' key='status'>پایان یافته</option>
                                    <option value='canceled' key='status'>لغو شده</option>
                                    <option value='refunded' key='status'>مرجوعی</option>
                                </Select>
                                <Select label='وضعیت پرداخت' value={data.payment_status} onChange={handleOnChange}
                                        error={errors.payment_status} name='payment_status' required>
                                    <option key='payment_status'>انتخاب کنید</option>
                                    <option value='partial' key='payment_status'>قسطی</option>
                                    <option value='paid' key='payment_status'>پرداخت شده</option>
                                    <option value='refund' key='payment_status'>مرجوعی</option>
                                    <option value='unpaid' key='payment_status'>پرداخت نشده</option>
                                </Select>

                                <SelectModalInput label="متد پرداخت" value={data.payment_method}
                                                  onChange={(item) =>
                                                      setData({
                                                          ...data,
                                                          payment_method: item,
                                                          payment_method_id: item ? item.id : null,
                                                      })
                                                  }
                                                  onRemove={() =>
                                                      setData({...data, payment_method: '', payment_method_id: null})
                                                  }
                                                  error={errors.payment_method_id}
                                                  params={{
                                                      table: 'payment_methods',
                                                      columns: 'id|title',
                                                      orderby: 'created_at.asc',
                                                      // raw_query: ' `parent_id` = 0 ',
                                                  }}
                                />
                                <Select label='وضعیت ارسال' value={data.shipping_status} onChange={handleOnChange}
                                        error={errors.shipping_status} name='shipping_status' required>
                                    <option key='shipping_status'>انتخاب کنید</option>
                                    <option value='sending' key='shipping_status'>در حال ارسال</option>
                                    <option value='done' key='shipping_status'>تحویل شده</option>
                                    <option value='refunded' key='shipping_status'>مرجوعی</option>
                                    <option value='not_sent' key='shipping_status'>ارسال نشده</option>
                                </Select>
                                <SelectModalInput label="متد ارسال" value={data.shipping_method}
                                                  onChange={(item) =>
                                                      setData({
                                                          ...data,
                                                          shipping_method: item,
                                                          shipping_method_id: item ? item.id : null,
                                                      })
                                                  }
                                                  onRemove={() =>
                                                      setData({...data, shipping_method: '', shipping_method_id: null})
                                                  }
                                                  error={errors.shipping_method_id}
                                                  params={{
                                                      table: 'shipping_methods',
                                                      columns: 'id|title',
                                                      orderby: 'created_at.asc',
                                                      // raw_query: ' `parent_id` = 0 ',
                                                  }}
                                />


                            </div>


                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex gap-5" >
                        <div className="basis-4/6">
                            <div className="flex justify-between">
                                <HasPermission p="create-order">
                                    <Button size="sm" type="info"  onClick={() => toggleFormModal()}>
                                        افزودن محصول به سفارش
                                    </Button>
                                </HasPermission>

                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>محصول</th>
                                        <th> تعداد</th>
                                        <th> قیمت</th>
                                        <th>مالیات</th>
                                        <th>ویژگی</th>
                                        <th />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order.details && order.details.map((item, index) => (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{item.title}</td>
                                            <td>{item.unit}</td>
                                            <td>{parseInt(item.total_price).toLocaleString('en')}</td>
                                            <td>{item.tax}</td>
                                            <td>{item.attribute}</td>
                                            <td className="text-right">
                                                <Dropdown>

                                                    <HasPermission p="update-order">
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                toggleFormModal(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <div className="flex space-x-1 items-center">
                                                                <Trash className='w-4 h-4'/>
                                                                <div>ویرایش</div>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </HasPermission>
                                                    <HasPermission p="delete-order">
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                handleDeleteClick(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <div className="flex space-x-1 items-center">
                                                                <Trash className='w-4 h-4'/>
                                                                <div>حذف از سفارش</div>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </HasPermission>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="basis-2/6">
                            <div className="flex flex-col gap-2 justify-between">
                                <TextInput name="name" value={data.subtotal} onChange={handleOnChange} label="جمع هزینه"
                                           error={errors.subtotal} required/>
                                <TextInput name="discount" value={data.discount} onChange={handleOnChange}
                                           label="تخفیف" error={errors.discount}/>
                                <TextInput name="other_fee" value={data.other_fee} onChange={handleOnChange} label="سایر هزینه ها"
                                           error={errors.other_fee}/>
                                <TextInput name="shipping" value={data.shipping} onChange={handleOnChange} label="ارسال"
                                           error={errors.shipping}/>
                                <TextInput name="shipping" value={data.tax} onChange={handleOnChange} label="مالیات"
                                           error={errors.tax}/>
                                <TextInput name="name" value={data.total} onChange={handleOnChange} label="مبلغ فاکتور"
                                           error={errors.total} required/>
                            </div>
                        </div>
                    </div>

                </Card>
                <Card>

                    <div className="divider"/>
                    <div className="flex items-center ">
                        <div className="flex space-x-2 w-full justify-around">
                            <Button processing={processing} btnType="submit" type="primary">
                                ذخیره
                            </Button>
                            <Link href={route('admin.invoice.show',order)}>
                                <Button type="info">
                                    فاکتور
                                </Button>
                            </Link>
                            <Link href={route('admin.orders.index')}>
                                <Button type="secondary">
                                    انصراف
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </form>
            {formModal.isOpen && <FormModal modalState={formModal} orderId={order.id}/>}
            {confirmModal.isOpen &&  <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />}
        </AuthenticatedLayout>
    )
}
