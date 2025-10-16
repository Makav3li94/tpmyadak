import React, {useEffect, useState} from 'react'
import {Head, Link, useForm} from '@inertiajs/react'

import {Button, Card, Select, TextInput} from '@/components/index/index.js'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";

export default function Form(props) {

    const [processing, setProcessing] = useState(false)
    const {data, setData, errors, post} = useForm({
        title: "",
        description: "",
        section: "پشتیبانی",
        priority: "عادی",
    });


    const handleSubmit = (e) => {
        e.preventDefault()
        post(
            route('user.tickets.store'),
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
        <UserAuthenticatedLayout
            title={'مشاهده تیکت'}
            breadcumbs={[
                {name: 'داشبورد', href: route('user.dashboard')},
                {name: 'تیکت', href: route('user.tickets.index')},
                {
                    name: 'ویرایش/ساخت تیکت',
                    href:  route('user.tickets.create'),
                },
            ]}
        >
            <Head title="مشاهده تیکت"/>

            <div className="flex flex-col gap-3">

                <Card>


                        <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                            <TextInput name="title"
                                       value={data.title}
                                       onChange={handleOnChange}
                                       label="عنوان"
                                       error={errors.title}
                                       required
                            />
                            <Select label='دپارتمان' value={data.section} name='section'  onChange={handleOnChange}>
                                <option key='section'>انتخاب کنید</option>
                                <option value='مالی' key='section'>مالی</option>
                                <option value='مدیریت' key='section'>مدیریت</option>
                                <option value='فروش' key='section'>فروش</option>
                                <option value='پشتیبانی' key='section'>پشتیبانی</option>
                            </Select>
                            <Select label='فوریت' value={data.priority} name='priority' onChange={handleOnChange} >
                                <option key='priority'>انتخاب کنید</option>
                                <option value='عادی' key='priority'>عادی</option>
                                <option value='مهم' key='priority'>مهم</option>
                                <option value='خیلی مهم' key='priority'>خیلی مهم</option>
                            </Select>
                            <TextareaInput
                                name='description'
                                value={data.description}
                                label=' متن تیکت:'
                                onChange={handleOnChange}
                                error={errors.description}
                            />

                            <div className="flex items-center ">
                                <div className="flex space-x-2 w-full justify-around">
                                    <Button processing={processing} btnType="submit" type="primary">
                                        ذخیره
                                    </Button>
                                    <Link href={route('user.tickets.index')}>
                                        <Button type="secondary">
                                            انصراف
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                        </form>
                </Card>


            </div>
        </UserAuthenticatedLayout>
    )
}
