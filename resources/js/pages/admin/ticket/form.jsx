import React, {useEffect, useState} from 'react'
import {Head, Link, useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout.jsx'
import {Button, Card} from '@/components/index/index.js'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import Badge from "@/components/daisy-ui/badge.jsx";

export default function Form(props) {

    const {ticket} = props

    const [processing, setProcessing] = useState(false)
    const formData = {
        title: '',
    }

    const {data, setData, post, errors, clearErrors} =
        useForm(formData)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEmpty(ticket) === false) {
            post(
                route('admin.faq.update', ticket),
                {
                    onStart: () => setProcessing(true),
                    onFinish: (e) => {
                        setProcessing(false)
                    },
                }
            )
            return
        }
        post(
            route('admin.ticket.store'),
            {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            },
        )
    }

    useEffect(() => {
        if (!isEmpty(ticket)) {
            setData(
                {
                    title: ticket.title,

                    _method: 'put'
                }
            )
        }

    }, [ticket])
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
            title={'مشاهده تیکت'}
            breadcumbs={[
                {name: 'داشبورد', href: route('admin.dashboard')},
                {name: 'تیکت', href: route('admin.tickets.index')},
                {
                    name: 'ویرایش/ساخت تیکت',
                    href: ticket
                        ? route('admin.tickets.show', ticket)
                        : route('admin.tickets.create'),
                },
            ]}
        >
            <Head title="مشاهده تیکت"/>

            <div className="flex flex-col gap-3">
                <Card>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>عنوان</th>
                                <th>کاربر</th>
                                <th>تلفن</th>
                                <th>تاریخ</th>
                                <th>تغییر</th>
                                <th>بخش</th>
                                <th>اهمیت</th>
                                <th>وضعیت</th>
                                <th>وضعیت</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr key={ticket.id}>
                                <td>{ticket.title}</td>
                                <td>{ticket.user.name}</td>
                                <td>{ticket.user.mobile}</td>
                                <td>{ticket.created_at}</td>
                                <td>{ticket.updated_at}</td>
                                <td>{ticket.section}</td>
                                <td>{ticket.priority}</td>
                                <td>
                                    {ticket.answer === '0' && <Badge type="secondry" outline={true}>کاربر</Badge>}
                                    {ticket.answer === '1' && <Badge type="secondry" outline={true}>منتظر</Badge>}
                                    {ticket.answer === '2' && <Badge type="secondry" outline={true}>ادمین</Badge>}
                                </td>
                                <td>
                                    {ticket.status?(
                                        <Badge type="info" outline={true}>باز</Badge>
                                    ):(
                                        <Badge type="success" outline={true}>بسته</Badge>
                                    )}
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>

                </Card>
                <Card>
                    {/*<div className="flex flex-col gap-2 justify-between">*/}
                    {/*    <div className="flex  gap-12 w-full">*/}
                    {/*        <div className="basis-1/2">*/}
                    {/*            <TextInput name="title"*/}
                    {/*                       value={data.title}*/}
                    {/*                       onChange={handleOnChange}*/}
                    {/*                       label="عنوان"*/}
                    {/*                       error={errors.title}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div className="basis-1/2">*/}
                    {/*            <TextInput*/}
                    {/*                name="slug"*/}
                    {/*                value={data.slug}*/}
                    {/*                onChange={handleOnChange}*/}
                    {/*                label="اسلاگ"*/}
                    {/*                error={errors.slug}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}


                    {/*    <fieldset className="fieldset">*/}
                    {/*        <legend className="fieldset-legend">متن وبلاگ</legend>*/}
                    {/*        <Tinymce value={data.body} what='body' setData={setData}/>*/}
                    {/*        <p className="fieldset-label text-error">{errors.body}</p>*/}
                    {/*    </fieldset>*/}


                    {/*</div>*/}
                    {ticket.faqs.map((item) => (


                        <ul className="list-unstyled p-3">
                            {item.question && (
                                <div className="chat chat-start">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS chat bubble component"
                                                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
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
                                                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
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
                    {ticket.status === '1' && (
                        <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                            <TextareaInput
                                name='reply'
                                value={data.reply}
                                label=' پاسخ به تیکت:'
                                onChange={handleOnChange}
                                error={errors.reply}
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
        </AuthenticatedLayout>
    )
}
