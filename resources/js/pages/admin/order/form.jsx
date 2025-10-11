import React, {useState} from 'react'
import {Head, Link, useForm} from '@inertiajs/react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout.jsx'
import {Button, Card, Select, SelectModalInput, TextInput} from '@/components/index/index.js'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import {isEmpty} from "lodash";

export default function Form() {

    const [processing, setProcessing] = useState(false)
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
        note: '',
        status: '',

    }

    const {data, setData, post, errors, clearErrors} =
        useForm(formData)

    const handleSubmit = (e) => {
        e.preventDefault()

        post(
            route('admin.orders.store'),
            {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            },
        )
    }

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

    return (
        <AuthenticatedLayout
            title={'سفارش'}
            breadcumbs={[
                {name: 'داشبورد', href: route('admin.dashboard')},
                {name: 'سفارش', href: route('admin.orders.index')},
                {
                    name: 'ویرایش/ساخت',
                    href: route('admin.orders.create')
                },
            ]}
        >
            <Head title="سفارش"/>
            <Card>
                <form className="form-control space-y-2.5" onSubmit={handleSubmit}>

                    <div className="flex flex-col gap-2 justify-between">
                        <div className="flex  gap-12 w-full">
                            <div className="basis-1/2">
                                <SelectModalInput label="مشتری" value={data.user}
                                                  onChange={(item) =>
                                                      setData({
                                                          ...data,
                                                          user: item,
                                                          user_id: item ? item.id : null,
                                                      })
                                                  }
                                                  onRemove={() =>
                                                      setData({...data, user: '', user_id: null})
                                                  }
                                                  error={errors.user_id}
                                                  params={{
                                                      table: 'users',
                                                      columns: 'id|name',
                                                      orderby: 'created_at.asc',
                                                      // raw_query: ' `parent_id` = 0 ',
                                                  }}
                                />
                            </div>
                            <div className="basis-1/2">
                                <SelectModalInput label="آدرس" value={data.address}  readOnly={isEmpty(data.user)}
                                                  onChange={(item) =>
                                                      setData({
                                                          ...data,
                                                          address: item,
                                                          address_id: item ? item.id : null,
                                                          name:item.name,
                                                          postal_code:item.postal_code,
                                                          order_address:item.address,
                                                          mobile:item.mobile,
                                                          phone:item.phone,
                                                      })
                                                  }
                                                  onRemove={() =>
                                                      setData({...data, address: '', address_id: null})
                                                  }
                                                  error={errors.address_id}
                                                  params={{
                                                      table: 'addresses',
                                                      columns: 'id|name|mobile|phone|postal_code|address',
                                                      orderby: 'created_at.asc',
                                                      raw_query: ' `user_id` = ' + `'${data.user.id}'`,
                                                  }}
                                />
                            </div>
                        </div>
                        {!isEmpty(data.address) &&
                        <>
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <TextInput
                                        name="name"
                                        value={data.address.name}
                                        onChange={handleOnChange}
                                        label="نام و نام خانوادگی گیرنده"
                                        error={errors.name}
                                    />
                                </div>
                                <div className="basis-1/2">
                                    <TextInput
                                        name="name"
                                        value={data.address.postal_code}
                                        onChange={handleOnChange}
                                        label="کد پستی"
                                        error={errors.postal_code}
                                    />
                                </div>
                            </div>
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <TextInput
                                        name="mobile"
                                        value={data.address.mobile}
                                        onChange={handleOnChange}
                                        label="تلفن همراه گیرنده"
                                        error={errors.name}
                                    />
                                </div>
                                <div className="basis-1/2">
                                    <TextInput
                                        name="phone"
                                        value={data.address.phone}
                                        onChange={handleOnChange}
                                        label="تلفن ثابت"
                                        error={errors.phone}
                                    />
                                </div>
                            </div>
                            <TextareaInput name='order_address' value={data.address.address} label='آدرس' onChange={handleOnChange}
                                           error={errors.order_address}/>
                        </>

                        }
                        <div className="flex  gap-12 w-full">
                            <div className="basis-1/2">
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
                            </div>
                            <div className="basis-1/2">
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

                    <TextareaInput
                        name='note'
                        value={data.note}
                        label='توضیحات'
                        onChange={handleOnChange}
                        error={errors.note}
                    />

                    <Select label='وضعیت' value={data.status} onChange={handleOnChange}
                            error={errors.status} name='status' required>

                        <option  key='status'>انتخاب کنید</option>
                        <option value='new' key='status'>جدید</option>
                        <option value='pending' key='status'>در حال بررسی</option>
                        <option value='hold' key='status'>در انتظار</option>
                        <option value='verify' key='status'>تایید شده</option>
                        <option value='processing' key='status'>در حال انجام</option>
                        <option value='done' key='status'>پایان یافته</option>
                        <option value='canceled' key='status'>لغو شده</option>
                        <option value='refunded' key='status'>مرجوعی</option>
                    </Select>

                    <div className="divider"/>
                    <div className="flex items-center ">
                        <div className="flex space-x-2 w-full justify-between">
                            <Button processing={processing} btnType="submit" type="primary">
                                ذخیره
                            </Button>
                            <Link href={route('admin.orders.index')}>
                                <Button type="secondary">
                                    انصراف
                                </Button>
                            </Link>
                        </div>
                    </div>
                    </div>
                </form>
            </Card>

        </AuthenticatedLayout>
    )
}
