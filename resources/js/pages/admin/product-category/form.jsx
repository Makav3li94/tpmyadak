import React, {useEffect, useState} from 'react'
import {Head, Link, useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Card, Checkbox, FormFile, SelectModalInput, TextInput} from '@/components/index'
import Select2Input from "@/components/daisy-ui/select2-input.jsx";
import AuthenticatedLayout from "@/layouts/default/authenticated-layout.jsx";


export default function Form(props) {
    const {productCategory, filters} = props
    const [mounted,setMounted] = useState(false)
    const formState = {
        title: '',
        slug: '',
        image: '',
        parent_id: 0,
        filter_array: [],
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





    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isEmpty(productCategory)) {
            put(route('admin.product.categories.update', productCategory))
            return
        }
        post(route('admin.product.categories.store'))
    }

    useEffect(() => {
        if (isEmpty(productCategory) === false) {
            setData(
                {
                    title: productCategory.title,
                    slug: productCategory.slug,
                    image: productCategory.image,
                    parent_id: productCategory.parent_id,
                    parent : productCategory.parent,
                    filter_array: productCategory.def_filters,
                    status: productCategory.status,
                }
            )
        }
        setMounted(true)
    }, [productCategory])
    console.log(productCategory)
    return (
        <AuthenticatedLayout
            title={'دسته محصول'}
            breadcumbs={[
                {name: 'داشبورد', href: route('admin.dashboard')},
                {name: 'دسته محصول', href: route('admin.product.categories.index')},
                {
                    name: 'ویرایش/ساخت',
                    href: productCategory
                        ? route('admin.product.categories.edit', productCategory)
                        : route('admin.product.categories.create'),
                },
            ]}
        >
            <Head title="دسته محصول"/>
            <Card>
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
                    name="slug"
                    value={data.slug}
                    onChange={handleOnChange}
                    label="اسلاگ"
                    error={errors.slug}
                />
                {mounted &&
                    <Select2Input label="Filter" name="filter_array" isMulti options={filters}
                    error={errors.filter_array}
                    defaultValue={data.filter_array}
                    placeHolder="فیلتر ها"
                    // onChange={(e) => setData('sub_category_id', e.value)}  error={errors.sub_category_id}
                    //           onChange={setSelectedFilter}
                    onChange={(selectedOption)=>setData('filter_array',selectedOption)}
                    />
                }
                {mounted  && (
                    <>
                        <SelectModalInput
                            label="دسته"
                            value={data.parent}
                            onChange={(item) =>
                                setData({
                                    ...data,
                                    parent: item,
                                    parent_id: item ? item.id : null,
                                })
                            }
                            onRemove={() =>
                                setData({...data, parent: '', parent_id: null})
                            }
                            error={errors.parent_id}
                            params={{
                                table: 'product_categories',
                                columns: 'id|title',
                                orderby: 'created_at.asc',
                                raw_query:  '  `id` != ' + `'${data.id}'`,
                                // raw_query: ' `parent_id` = 0 ' + ' AND `id` != ' + `'${data.id}'`,
                            }}
                        />
                    </>
                )}
                <FormFile
                    label={'تصویر'}
                    onChange={(file_path) => setData('image', file_path)}
                    error={errors.image}
                    url={data.image}
                    filemimes="image/jpg,image/jpeg,image/png"
                />
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
                    <Link href={route('admin.product.categories.index')}>
                        <Button type="secondary">
                            انصراف
                        </Button>
                    </Link>
                </div>
            </form>
            </Card>
        </AuthenticatedLayout>
    )
}
