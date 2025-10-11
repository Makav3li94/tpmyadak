import React, {useEffect, useRef, useState} from 'react'
import {Head, Link, router, useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout.jsx'
import {Button, Card, Checkbox, SelectModalInput, TextInput} from '@/components/index/index.js'
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import {Datepicker} from "@ijavad805/react-datepicker";
import Tinymce from "@/components/Tinymce.jsx";
import ImageCropper from "@/components/ImageCropper.jsx";

export default function Form(props) {

    const {blog,publishDate} = props

    const [processing, setProcessing] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [showCropper, setShowCropper] = useState(false)
    const [image, setImage] = useState(null);
    const previewImageRef = useRef(null);
    const croppedImageRef = useRef(null);
    const inputRef = useRef(null);
    const formData = {
        title: '',
        slug: '',
        excerpt: '',
        img_cover: '',
        category_id: '',
        subcategory_id: '',
        published_at: '',
        imageFile: "",
        is_page: '',
        body: '',
        status:1,
        q1: "",
        q2: "",
        q3: "",
        a1: "",
        a2: "",
        a3: "",
    }

    const {data, setData, post,  errors, clearErrors} =
        useForm(formData)

    const handleSubmit = (e) => {
        e.preventDefault()
        data.croppedImage = croppedImageRef.current.value;
        if (isEmpty(blog) === false) {
            post(
                route('admin.blogs.update', blog),
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
            route('admin.blogs.store'),
            {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            },

        )
    }

    useEffect(() => {
        if (!isEmpty(blog)) {
            setData(
                {
                    title: blog.title,
                    slug: blog.slug,
                    excerpt: blog.excerpt,
                    imageFile: "",
                    category_id: blog.category_id,
                    subcategory_id: blog.subcategory_id,
                    published_at: publishDate,
                    is_page: blog.is_page,
                    category: blog.category,
                    subcategory: blog.sub_category,
                    body: blog.body,
                    status: blog.status,
                    q1: (blog.faq && blog.faq.q1) ? blog.faq.q1 : '',
                    q2: (blog.faq && blog.faq.q2) ? blog.faq.q2 : '',
                    q3: (blog.faq && blog.faq.q3) ? blog.faq.q3 : '',
                    a1: (blog.faq && blog.faq.a1) ? blog.faq.a1 : '',
                    a2: (blog.faq && blog.faq.a2) ? blog.faq.a2 : '',
                    a3: (blog.faq && blog.faq.q1) ? blog.faq.a3 : '',
                    _method: 'put'
                }
            )
        }
        setMounted(true)

    }, [blog])
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
    const handlePublish = (date) => {
        setData('published_at', date.format())
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        setShowCropper(false);

        setData('imageFile', e.target.files[0])

        let reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
            setShowCropper(true);
        };
        reader.readAsDataURL(inputRef.current.files[0]);

    };
    const setCroppedImage = (data) => {
        setShowCropper(false);
        previewImageRef.current.setAttribute("src", data);
        croppedImageRef.current.setAttribute("value", data);
    }
    console.log(data.imageFile)
    return (
        <AuthenticatedLayout
            title={'وبلاگ'}
            breadcumbs={[
                {name: 'داشبورد', href: route('admin.dashboard')},
                {name: 'وبلاگ', href: route('admin.blogs.index')},
                {
                    name: 'ویرایش/ساخت',
                    href: blog
                        ? route('admin.blogs.edit', blog)
                        : route('admin.blogs.create'),
                },
            ]}
        >
            <Head title="وبلاگ"/>

            <form className="flex gap-3" onSubmit={handleSubmit}>
                <div className="basis-6/8">
                    <Card>
                        <div className="flex flex-col gap-2 justify-between">
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <TextInput name="title"
                                               value={data.title}
                                               onChange={handleOnChange}
                                               label="عنوان"
                                               error={errors.title}
                                               required
                                    />
                                </div>
                                <div className="basis-1/2">
                                    <TextInput
                                        name="slug"
                                        value={data.slug}
                                        onChange={handleOnChange}
                                        label="اسلاگ"
                                        error={errors.slug}
                                    />
                                </div>
                            </div>
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <SelectModalInput
                                        label="دسته"
                                        value={data.category}
                                        onChange={(item) =>
                                            setData({
                                                ...data,
                                                category: item,
                                                category_id: item ? item.id : null,
                                            })
                                        }
                                        onRemove={() =>
                                            setData({...data, category: '', category_id: null})
                                        }
                                        error={errors.category_id}
                                        params={{
                                            table: 'blog_categories',
                                            columns: 'id|title',
                                            orderby: 'created_at.asc',
                                            raw_query: ' `parent_id` = 0 ',
                                        }}
                                    />
                                </div>
                                <div className="basis-1/2">
                                    <SelectModalInput
                                        label="زیردسته"
                                        value={data.subcategory}
                                        onChange={(item) =>
                                            setData({
                                                ...data,
                                                subcategory: item,
                                                subcategory_id: item ? item.id : null,
                                            })
                                        }
                                        onRemove={() =>
                                            setData({...data, subcategory: '', subcategory_id: null})
                                        }
                                        error={errors.subcategory_id}
                                        params={{
                                            table: 'blog_categories',
                                            columns: 'id|title',
                                            orderby: 'created_at.asc',
                                            raw_query: ' `parent_id` = ' + `'${data.category_id}'`,
                                        }}
                                    />
                                </div>
                            </div>
                            <TextareaInput
                                name='excerpt'
                                value={data.excerpt}
                                label='چکیده-متا'
                                onChange={handleOnChange}
                                error={errors.excerpt}
                            />
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <TextInput label='سوال اول' name='q1' error={errors.q1} value={data.q1}
                                               onChange={handleOnChange}/>
                                </div>
                                <div className="basis-1/2">
                                    <TextInput label='پاسخ اول' name='a1' error={errors.a1} value={data.a1}
                                               onChange={handleOnChange}/>
                                </div>
                            </div>
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <TextInput label='سوال دوم' name='q2' error={errors.q2} value={data.q2}
                                               onChange={handleOnChange}/>
                                </div>
                                <div className="basis-1/2">
                                    <TextInput label='پاسخ دوم' name='a2' error={errors.a2} value={data.a2}
                                               onChange={handleOnChange}/>
                                </div>
                            </div>
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <TextInput label='سوال سوم' name='q3' error={errors.q3} value={data.q3}
                                               onChange={handleOnChange}/>
                                </div>
                                <div className="basis-1/2">
                                    <TextInput label='پاسخ سوم' name='a3' error={errors.a3} value={data.a3}
                                               onChange={handleOnChange}/>
                                </div>
                            </div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">متن وبلاگ</legend>
                                    <Tinymce value={data.body} what='body' setData={setData}/>
                                    <p className="fieldset-label text-error">{errors.body}</p>
                                </fieldset>


                        </div>
                    </Card>
                </div>
                <div className="basis-2/8 ">
                    <Card>
                        <div className="flex flex-col gap-2 justify-between">
                            {mounted &&
                               <>
                                   {/*<FormFile*/}
                                   {/*    label={'تصویر'}*/}
                                   {/*    onChange={(file_path) => setData('img_cover', file_path)}*/}
                                   {/*    error={errors.img_cover}*/}
                                   {/*    url={image_url}*/}
                                   {/*    preview={true}*/}
                                   {/*    filemimes="image/jpg,image/jpeg,image/png"*/}
                                   {/*/>*/}
                                   <input
                                       ref={inputRef}
                                       className="form-control"
                                       id="image-file"
                                       name="image"
                                       type="file"
                                       aria-label="file example"
                                       onChange={handleImageChange}
                                   />
                                   <input type="hidden" name="imageFile" value={data.imageFile}/>
                                   <input type="hidden" ref={croppedImageRef} name="croppedImage"/>
                                   <img ref={previewImageRef} className="max-h-64" src="" alt="preview image"/>
                                   {showCropper &&
                                   <ImageCropper image={image} setCroppedImage={setCroppedImage} />
                                   }
                               </>
                            }

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">تاریخ انتشار</legend>
                                <Datepicker format={'YYYY-MM-DD'}
                                            className=''
                                            lang='fa'
                                            input={<input className="w-full input " placeholder='تاریخ انتشار'/>}
                                            value={data.published_at}
                                            onChange={(val) => {
                                                handlePublish(val)
                                            }}/>
                                {errors.published_at && <p className="fieldset-label text-error">{errors.published_at}</p>}
                            </fieldset>
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <Checkbox
                                        label="صفحه است؟"
                                        name="is_page"
                                        value={data.is_page}
                                        onChange={handleOnChange}
                                        error={errors.is_page}
                                    />
                                </div>
                                <div className="basis-1/2">
                                    <Checkbox
                                        label="فعال"
                                        name="status"
                                        value={data.status}
                                        onChange={handleOnChange}
                                        error={errors.status}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="divider"/>
                        <div className="flex items-center ">
                            <div className="flex space-x-2 w-full justify-between">
                                <Button processing={processing} btnType="submit" type="primary">
                                    ذخیره
                                </Button>
                                <Link href={route('admin.blogs.index')}>
                                    <Button type="secondary">
                                        انصراف
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </form>
        </AuthenticatedLayout>
    )
}
