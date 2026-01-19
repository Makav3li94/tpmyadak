import React, {useEffect, useState} from 'react'
import {Head, Link, useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Card} from '@/components/index/index.js'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";

export default function Form(props) {

    const {ticket} = props

    const {data, setData,processing, errors, post} = useForm({
        question: "",
    });


    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("user.faq.store", ticket.id), data, {forceFormData: true,});
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
                    href: ticket
                        ? route('user.tickets.show', ticket)
                        : route('user.tickets.create'),
                },
            ]}
        >
            <Head title="مشاهده تیکت"/>

            <div className="flex flex-col gap-3">

                <Card>

                    {ticket && ticket.faqs.map((item) => (


                        <ul className="list-unstyled p-3">
                            {item.question && (
                                <div className="chat chat-start">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS chat bubble component"
                                                src="http://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                                            />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {ticket.user.name}
                                        <time className="text-xs opacity-50">{item.created_at}</time>
                                    </div>
                                    <div className="chat-bubble">{item.question}</div>
                                    <div className="chat-footer opacity-50">Delivered</div>
                                </div>
                            )}

                            {item.reply && (
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS chat bubble component"
                                                src="http://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                                            />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        پشتیبان
                                        <time className="text-xs opacity-50">        {item.reply_date}</time>
                                    </div>
                                    <div className="chat-bubble">{item.reply}</div>
                                    <div className="chat-footer opacity-50">Seen at 12:46</div>
                                </div>
                            )}
                        </ul>
                    ))}
                    <div className="divider"/>
                    {((ticket && ticket.status === '1') || !ticket) && (
                        <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                            <TextareaInput
                                name='question'
                                value={data.question}
                                label=' پاسخ به تیکت:'
                                onChange={handleOnChange}
                                error={errors.question}
                            />

                            <div className="flex items-center ">
                                <div className="flex space-x-2 w-full justify-around">
                                    <Button processing={processing} btnType="submit" type="primary">
                                        ذخیره
                                    </Button>
                                    <Link href={route('admin.tickets.index')}>
                                        <Button type="secondary">
                                            انصراف
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                        </form>
                    )}
                </Card>


            </div>
        </UserAuthenticatedLayout>
    )
}
