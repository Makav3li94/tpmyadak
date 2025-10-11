import React, { useState} from 'react'
import { useForm} from '@inertiajs/react'

import {
    Card,
    Select,
    SelectModalInput,
    TextInput
} from '@/components/index/index.js'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});
export default function Show(props) {

    const {order} = props
    const formData = {
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
    }

    const {data, setData} = useForm(formData)

    return (

            <Document>
                <Page size="A4" style={styles.page}>


                    <View style={styles.section}>
                        <Card>
                            <div class="flex gap-5 w-full">
                                <div className="basis-1/2">
                                    <div className="flex flex-col gap-2 justify-between">
                                        <TextInput name="name" value={data.name}  label="نام" disabled />
                                        <TextInput name="postal_code" value={data.postal_code} label="کدپستی" disabled/>
                                        <TextInput name="mobile" value={data.mobile}  label="موبایل" disabled/>
                                        <TextInput name="phone" value={data.phone}  label="تلفن" disabled/>
                                        <TextareaInput name='address' value={data.address} label='آدرس' disabled/>
                                        <TextareaInput name='note' value={data.note} label='نوضیحات' disabled/>
                                    </div>
                                </div>
                                <div className="basis-1/2 ">
                                    <TextInput name="created_at" value={order.created_at} label="تاریخ ثبت" disabled/>
                                    <TextInput name="created_at" value={order.updated_at} label="آخرین به روز رسانی" disabled/>
                                    <div className="flex flex-col gap-2 justify-between">
                                        <Select label='وضعیت سفارش' value={data.status} name='status' disabled >
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
                                        <Select label='وضعیت پرداخت' value={data.payment_status} name='payment_status' disabled>
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
                                                          readOnly={true}
                                                          params={{
                                                              table: 'payment_methods',
                                                              columns: 'id|title',
                                                              orderby: 'created_at.asc',
                                                              // raw_query: ' `parent_id` = 0 ',
                                                          }}
                                        />
                                        <Select label='وضعیت ارسال' value={data.shipping_status} name='shipping_status' disabled>
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
                                                          readOnly={true}
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
                    </View>
                    <View style={styles.section}>
                        <Card>
                            <div className="flex gap-5" >
                                <div className="basis-4/6">

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
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="basis-2/6">
                                    <div className="flex flex-col gap-2 justify-between">
                                        <TextInput name="name" value={data.subtotal}  label="جمع هزینه" disabled />
                                        <TextInput name="discount" value={data.discount} label="تخفیف"  disabled />
                                        <TextInput name="other_fee" value={data.other_fee}  label="سایر هزینه ها" disabled />
                                        <TextInput name="shipping" value={data.shipping}  label="ارسال" disabled />
                                        <TextInput name="shipping" value={data.tax}  label="مالیات" disabled />
                                        <TextInput name="name" value={data.total}  label="مبلغ فاکتور"  disabled />
                                    </div>
                                </div>
                            </div>

                        </Card>
                    </View>
                </Page>
            </Document>


    )
}
