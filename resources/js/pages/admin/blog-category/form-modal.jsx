import React, {useEffect} from 'react'
import {useForm} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Modal, Button, TextInput, FormFile, Checkbox, SelectModalInput} from '@/components/index'


export default function FormModal(props) {
    const {modalState} = props
    const formState = {
        title: '',
        slug: '',
        image: '',
        parent_id: '',
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
        const blogCategory = modalState.data
        if (blogCategory !== null) {
            put(route('admin.blog.categories.update', blogCategory), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('admin.blog.categories.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const blogCategory = modalState.data
        if (isEmpty(blogCategory) === false) {
            setData(blogCategory)
        }
    }, [modalState])
    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'دسته وبلاگ'}>
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
                {data.parent_id !== 0 && (
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
                                setData({ ...data, parent: '', parent_id: null })
                            }
                            error={errors.parent_id}
                            params={{
                                table: 'blog_categories',
                                columns: 'id|title',
                                orderby: 'created_at.asc',
                                raw_query: ' `parent_id` = 0 '+ ' AND `id` != ' + `'${data.id}'`,
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
                        <Button onClick={handleClose} type="secondary">
                            انصراف
                        </Button>
                </div>
            </form>
        </Modal>
    )
}
