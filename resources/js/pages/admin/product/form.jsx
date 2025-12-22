import React, {useEffect, useState} from 'react'
import {Head, Link, useForm, usePage} from '@inertiajs/react'
import {isEmpty} from 'lodash'

import {Button, Card, Checkbox, SelectModalInput, TextInput} from '@/components/index'
import AuthenticatedLayout from "@/layouts/default/authenticated-layout.jsx";
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import Tinymce from "@/components/Tinymce.jsx";
import {Datepicker} from "@ijavad805/react-datepicker";
import ImgDropzone from "@/components/ImgDropzone.jsx";
import Select2Input from "@/components/daisy-ui/select2-input.jsx";


export default function Form(props) {
    const {product, startDate, endDate, productCategories, attrGroups, prFiles = [],carModels,def_models} = props
    const {props: { auth },} = usePage()
    const [mounted, setMounted] = useState(false)
    const [hasNewFile, setHasNewFile] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [attrGroupArr, setAttrGroupArr] = useState([]);
    const [specGroupArr, setSpecGroupArr] = useState([]);
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [files, setFiles] = useState(prFiles)
    const formState = {
        title: '',
        slug: '',
        alias: '',
        sku: '',
        product_category_id: '',
        car_model_id: [],
        brand_id: '',
        supplier_id: '',
        tax_id: '',
        excerpt: '',
        about: '',
        description: '',
        price: '',
        cost: '',
        real_price: '',
        discount: '',
        date_start: '',
        date_end: '',
        status_promotion: 0,
        stock: '',
        minimum: '',
        kind: 0,
        status: '',
        approve: '',
        images: [],
        product_group_attrs: [],
        product_group_specs: [],
        product_group_cat_attrs: [],
        filter_array: '',
    }

    const {data, setData, post,  processing, errors} = useForm(formState)
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
        if (!isEmpty(product)) {
            post(route('admin.products.update', product))
            return
        }
        post(route('admin.products.store'))
    }

    useEffect(() => {
        if (!mounted && isEmpty(product) === false) {
            setData(
                {
                    title: product.title,
                    slug: product.slug,
                    alias: product.alias,
                    sku: product.sku,
                    product_category_id: product.product_category_id,
                    car_model_id: product.def_models,
                    brand_id: product.brand_id,
                    supplier_id: product.supplier_id,
                    tax_id: product.tax_id,
                    excerpt: product.excerpt,
                    about: product.about,
                    description: product.description,
                    price: product.price,
                    cost: product.cost,
                    real_price: product.real_price,
                    discount: product.discount,
                    minimum: product.minimum,
                    stock: product.stock,
                    date_start: startDate,
                    date_end: endDate,
                    status_promotion: product.status_promotion,
                    image: product.image,
                    parent_id: product.parent_id,
                    parent: product.parent,
                    filter_array: product.def_filters,
                    status: product.status,
                    category: product.category,
                    brand: product.brand,
                    supplier: product.supplier,
                    tax: product.tax,
                    kind: 0,
                    _method: "PUT"
                }
            )
            if (product.specs && product.specs.length > 0){
                setSpecGroupArr(product.specs.map(it => ({title: it.title, value: it.value})))
            }
            if (product.attributes && product.attributes.length > 0){
                setAttrGroupArr(product.attributes.map(it => ({attribute_group_id: it.attribute_group_id, title: it.title,add_price:it.add_price})))
            }
            if (product.filters && product.filters.length > 0){
                setCategoryFilters(product.filters.map(it => ({id: it.pivot.filter_id, title: it.title,value:it.pivot.value})))
            }else {
                handCatAndFilter(product.product_category_id,true).then(r => console.log(r))
            }
        }
        setMounted(true)
    }, [product])
    const handleDateStart = (date) => {
        setData('date_start', date.format())
    }
    const handleDateEnd = (date) => {
        setData('date_end', date.format())
    }

    const addInput = (groupId) => {
        setAttrGroupArr(s => {
            return [
                ...s,
                {
                    attribute_group_id: groupId,
                    title: "",
                    add_price: ""
                }
            ];
        });
    };

    const removeInput = (groupId) => {
        let tempArr= attrGroupArr;
        let removeFromTempArr=      tempArr.filter(a => a.attribute_group_id === groupId)
        let KeepSameTempArr=   tempArr.filter(a => a.attribute_group_id !== groupId)
        removeFromTempArr = removeFromTempArr.slice(0, -1)
        tempArr=[...KeepSameTempArr,...removeFromTempArr]
        setAttrGroupArr(tempArr)
        setData('product_group_attrs', tempArr);
    }
    const handleAddChange = (e, type, index) => {
        e.preventDefault();

        if (type === 'title') {
            setAttrGroupArr(s => {
                const newArr = s.slice();
                newArr[index].title = e.target.value;
                return newArr;
            });
        } else {
            setAttrGroupArr(s => {
                const newArr = s.slice();
                newArr[index].add_price = e.target.value;
                return newArr;
            });
        }

        setData('product_group_attrs', attrGroupArr);
    };


    const addInputSpec = () => {
        setSpecGroupArr(s => {
            return [
                ...s,
                {
                    title: "",
                    value: ""
                }
            ];
        });
    };

    const removeInputSpec = () => {
        setSpecGroupArr(specGroupArr.slice(0, -1))
        setData('product_group_specs', specGroupArr.slice(0, -1));
    }
    const handleAddChangeSpec = (e, type, index) => {
        e.preventDefault();
        if (type === 'title') {
            setSpecGroupArr(s => {
                const newArr = s.slice();
                newArr[index].title = e.target.value;
                return newArr;
            });
        } else {
            setSpecGroupArr(s => {
                const newArr = s.slice();
                newArr[index].value = e.target.value;
                return newArr;
            });
        }

        setData('product_group_specs', specGroupArr);
    };
    const handleAddChangeCatAttrs = (e, type, index) => {
        e.preventDefault();
        if (type === 'title') {
            setCategoryFilters(s => {
                const newArr = s.slice();
                newArr[index].title = e.target.value;
                return newArr;
            });
        } else {
            setCategoryFilters(s => {
                const newArr = s.slice();
                newArr[index].value = e.target.value;
                return newArr;
            });
        }

        setData('product_group_cat_attrs', categoryFilters);
    };

    useEffect(() => {
        if (hasNewFile) {
            setData('images', files)
        }
    }, [files, setFiles,hasNewFile]);
    const handleNew = () => {
        setHasNewFile(true)
        setShowDelete(true)
    }

    const handCatAndFilter = async (selectedOption,isDef=false) => {
        // setCategoryFilters([])
        if (!isDef)setData('product_category_id', selectedOption)


        await axios.get(route('admin.getCategoryFiltersAjax',!isDef ?selectedOption.value : selectedOption), {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: auth.jwt_prefix + auth.jwt_token,
            },
        }).then((res) => {
            setCategoryFilters(res.data)
            }
        )

    }
    useEffect(() => {

    }, [categoryFilters]);
    return (
        <AuthenticatedLayout title={' محصول'} breadcumbs={[
            {name: 'داشبورد', href: route('admin.dashboard')},
            {name: ' محصول', href: route('admin.products.index')},
            {
                name: 'ویرایش/ساخت',
                href: product
                    ? route('admin.products.edit', product)
                    : route('admin.products.create'),
            },]}>
            <Head title=" محصول"/>
            <Card>
                <form className="form-control space-y-2.5" onSubmit={handleSubmit}>
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/2">
                            <TextInput name="title" value={data.title} onChange={handleOnChange} label="عنوان"
                                       error={errors.title} required/>
                        </div>
                        <div className="basis-1/2">
                            <TextInput name="slug" value={data.slug} onChange={handleOnChange} label="اسلاگ"
                                       error={errors.slug}/>
                        </div>
                    </div>
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/2">
                            <TextInput name="alias" value={data.alias} onChange={handleOnChange} label="نام کوتاه"
                                       error={errors.alias} required/>
                        </div>
                        <div className="basis-1/2">
                            <TextInput type='text' maxLenght={10} name="sku" value={data.sku} onChange={handleOnChange} label="کد اسکو"
                                       error={errors.sku}/>
                        </div>
                    </div>
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/3">
                            {mounted &&
                                <Select2Input label="دسته" name="product_category_id" options={productCategories}
                                              error={errors.product_category_id}
                                              placeHolder="دسته"
                                              defaultValue={data.category ? [{
                                                  value: data.category.id,
                                                  label: data.category.title
                                              }] : ''}
                                              onChange={(selectedOption) => handCatAndFilter(selectedOption)}
                                />
                            }
                        </div>
                        <div className="basis-1/3">
                            {mounted &&
                                <Select2Input label="مدل ماشین" name="car_model_id" isMulti options={carModels}
                                              error={errors.car_model_id}
                                              defaultValue={data.car_model_id}
                                              placeHolder="ماشین ها"
                                    // onChange={(e) => setData('sub_category_id', e.value)}  error={errors.sub_category_id}
                                    //           onChange={setSelectedFilter}
                                              onChange={(selectedOption)=>setData('car_model_id',selectedOption)}
                                />
                            }
                        </div>
                        <div className="basis-1/3">
                            {mounted && (
                                <SelectModalInput label="برند محصول" value={data.brand} onChange={(item) =>
                                    setData({
                                        ...data,
                                        brand: item,
                                        brand_id: item ? item.id : null,
                                    })
                                }
                                                  onRemove={() => setData({...data, brand: '', brand_id: null})}
                                                  error={errors.brand_id}
                                                  params={{
                                                      table: 'brands',
                                                      columns: 'id|title',
                                                  }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/2">
                            {mounted && (
                                <SelectModalInput label="تامین کننده" value={data.supplier}
                                                  onChange={(item) =>
                                                      setData({
                                                          ...data,
                                                          supplier: item,
                                                          supplier_id: item ? item.id : null,
                                                      })
                                                  }
                                                  onRemove={() => setData({...data, supplier: '', supplier_id: null})}
                                                  error={errors.supplier_id}
                                                  params={{
                                                      table: 'suppliers',
                                                      columns: 'id|title',
                                                  }}
                                />
                            )}
                        </div>
                        <div className="basis-1/2">
                            {mounted && (
                                <SelectModalInput label="مالیات" value={data.tax}
                                                  onChange={(item) =>
                                                      setData({
                                                          ...data,
                                                          tax: item,
                                                          tax_id: item ? item.id : null,
                                                      })
                                                  }
                                                  onRemove={() => setData({...data, tax: '', tax_id: null})}
                                                  error={errors.tax_id}
                                                  params={{
                                                      table: 'taxes',
                                                      columns: 'id|title',
                                                      orderby: 'created_at.asc',
                                                  }}
                                />
                            )}
                        </div>
                    </div>
                    <TextareaInput name='excerpt' value={data.excerpt} label='چکیده-متا' onChange={handleOnChange}
                                   error={errors.excerpt}/>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">معرفی محصول</legend>
                        <Tinymce value={data.about} what='about' setData={setData}/>
                        <p className="fieldset-label text-error">{errors.about}</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">بررسی تخصصی</legend>
                        <Tinymce value={data.description} what='description' setData={setData}/>
                        <p className="fieldset-label text-error">{errors.description}</p>
                    </fieldset>
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/2">
                            <TextInput name="price" value={data.price} onChange={handleOnChange} label="قیمت"
                                       error={errors.price} required/>
                        </div>
                        <div className="basis-1/2">
                            <TextInput name="cost" value={data.cost} onChange={handleOnChange} label="قیمت تمام شده"
                                       error={errors.cost}/>
                        </div>
                    </div>
                    <Checkbox label="تخفیف و زمانبندی" name="status_promotion" value={data.status_promotion}
                              onChange={handleOnChange} error={errors.status_promotion}/>
                    {data.status_promotion &&
                        <>
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <TextInput name="real_price" value={data.real_price} onChange={handleOnChange}
                                               label="قیمت اصلی" error={errors.real_price} required/>
                                </div>
                                <div className="basis-1/2">
                                    <TextInput name="discount" value={data.discount} onChange={handleOnChange}
                                               label="تخفیف" error={errors.discount}/>
                                </div>
                            </div>
                            <div className="flex  gap-12 w-full">
                                <div className="basis-1/2">
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">تاریخ شروع</legend>
                                        <Datepicker format={'YYYY-MM-DD'}
                                                    className=''
                                                    lang='fa'
                                                    input={<input className="w-full input " placeholder='تاریخ شروع'/>}
                                                    value={data.date_start}
                                                    onChange={(val) => {
                                                        handleDateStart(val)
                                                    }}/>
                                        {errors.date_start &&
                                            <p className="fieldset-label text-error">{errors.date_start}</p>}
                                    </fieldset>
                                </div>
                                <div className="basis-1/2">
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">تاریخ پایان</legend>
                                        <Datepicker format={'YYYY-MM-DD'}
                                                    className=''
                                                    lang='fa'
                                                    input={<input className="w-full input " placeholder='تاریخ پایان'/>}
                                                    value={data.date_end}
                                                    onChange={(val) => {
                                                        handleDateEnd(val)
                                                    }}/>
                                        {errors.date_end &&
                                            <p className="fieldset-label text-error">{errors.date_end}</p>}
                                    </fieldset>
                                </div>
                            </div>
                        </>
                    }
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/2">
                            <TextInput name="minimum" value={data.minimum} onChange={handleOnChange} type="number"
                                       label="حداقل خرید" error={errors.minimum} required min={1}/>
                        </div>
                        <div className="basis-1/2">
                            <TextInput name="stock" value={data.stock} onChange={handleOnChange} type="number"
                                       label="موجودی" error={errors.stock} min={0}/>
                        </div>
                    </div>
                    <div className="flex  gap-12 w-full">
                        <div className="basis-1/2">
                            <Checkbox label="تایید" name="approve" value={data.approve}
                                      onChange={handleOnChange} error={errors.approve}/>
                        </div>
                        <div className="basis-1/2">
                            <Checkbox label="فعال" name="status" value={data.status}
                                      onChange={handleOnChange} error={errors.status}/>
                        </div>
                    </div>
                    {/*{mounted &&*/}
                    {/*    <Select2Input label="Filter" name="filter_array" isMulti options={filters}*/}
                    {/*                  error={errors.filter_array}*/}
                    {/*                  defaultValue={data.filter_array}*/}
                    {/*                  placeHolder="فیلتر ها"*/}
                    {/*                  onChange={(selectedOption)=>setData('filter_array',selectedOption)}*/}
                    {/*    />*/}
                    {/*}*/}

                    {mounted &&
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">تصاویر ( تصویر اول شاخص میشود)</legend>
                            <ImgDropzone files={files} setFiles={setFiles} handleNew={handleNew}/>
                            {errors.images && <span className="text-error">{errors.images}</span>}
                            {[...Array(10)].map((x, i) =>
                                (errors['images.' + i] != null && errors['images.' + i]) &&
                                <p className="label">{errors['images.' + i]}</p>
                            )}
                        </fieldset>
                    }
                    <div className="divider"/>
                    {/*attrGroups*/}
                    {mounted &&  attrGroups.map((attrGroup, i) => {

                        return (
                            <div className="" key={i}>
                                <h4>{attrGroup.title}</h4>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="pb-2 fw-medium flex justify-between items-center gap-5">

                                        <div>
                                            <button type="button" className="btn btn-sm  btn-error me-3 text-white"
                                                    onClick={() => removeInput(attrGroup.id)}>-
                                            </button>
                                            <button type="button" className="btn btn-sm btn-success  text-white"
                                                    onClick={() => addInput(attrGroup.id)}>+
                                            </button>

                                        </div>
                                    </label>


                                </div>
                                {mounted &&  attrGroupArr.map((item, i) => {

                                    return (
                                        <>
                                            {item.attribute_group_id === attrGroup.id &&
                                                <div className="flex gap-3 justify-between items-center" key={i}>
                                                    <div hidden>
                                                        <TextInput name="attribute_group_id[]" value={item.id}
                                                                   label="group_id"  min={1}
                                                                   onChange={(e) => handleAddChange(e, 'attribute_group_id', i)}/>
                                                    </div>
                                                    <div className="basis-1/2">
                                                        <TextInput name="attribute_group_title[]" value={item.title}
                                                                   label="title" required min={1}
                                                                   onChange={(e) => handleAddChange(e, 'title', i)}/>

                                                    </div>
                                                    <div className="basis-1/2">
                                                        <TextInput name="attribute_group_value[]" value={item.add_price}
                                                                   label="add_price" required min={1}
                                                                   onChange={(e) => handleAddChange(e, 'add_price', i)}/>

                                                    </div>
                                                </div>
                                            }
                                        </>

                                    )
                                })}
                                {errors.product_group_attrs &&
                                    <p className=" text-red-600 invalid-feedback ">
                                        لطفا گروه ویژگی ها ره به درستی کامل کنید.
                                    </p>
                                }
                            </div>
                        )
                    })}

                    <div className="divider"/>
                    <div className="" >
                        <h4>خصوصیت ها</h4>
                        <div className="flex justify-between items-center mb-4">
                            <label className="pb-2 fw-medium flex justify-between items-center gap-5">

                                <div>
                                    <button type="button" className="btn btn-sm  btn-error me-3 text-white"
                                            onClick={() => removeInputSpec()}>-
                                    </button>
                                    <button type="button" className="btn btn-sm btn-success  text-white"
                                            onClick={() => addInputSpec()}>+
                                    </button>

                                </div>
                            </label>


                        </div>
                        {mounted &&  specGroupArr.map((item, i) => {
                            return (
                                <div className="flex gap-3 justify-between items-center">
                                    <div className="basis-1/2">
                                        <TextInput name="specs_title[]" value={item.title}
                                                   label="title" required min={1}
                                                   onChange={(e) => handleAddChangeSpec(e, 'title', i)}/>

                                    </div>
                                    <div className="basis-1/2">
                                        <TextInput name="specs_value[]" value={item.value}
                                                   label="value" required min={1}
                                                   onChange={(e) => handleAddChangeSpec(e, 'value', i)}/>

                                    </div>
                                </div>

                            )
                        })}
                        {errors.product_group_specs &&
                            <p className=" text-red-600 invalid-feedback ">
                                لطفا خصوصیت ها ره به درستی کامل کنید.
                            </p>
                        }
                    </div>
                    <div className="" >
                        <h4>دسته ویژگی ها</h4>
                        {mounted &&  categoryFilters.map((item, i) => {
                            return (
                                <div key={i} className="flex gap-3 justify-between items-center">
                                    <div className="basis-1/2" hidden>
                                        <TextInput name="cat_attrs_filter_ids[]" value={item.id}
                                                   label="title" required min={1}
                                                   onChange={(e) => handleAddChangeCatAttrs(e, 'id', i)}/>

                                    </div>
                                    <div className="basis-1/2">
                                        <TextInput name="cat_attrs_title[]" value={item.title}
                                                   label="title" required min={1}
                                                   onChange={(e) => handleAddChangeCatAttrs(e, 'title', i)}/>

                                    </div>
                                    <div className="basis-1/2">
                                        <TextInput name="cat_attrs_[]" value={item.value}
                                                   label="value" required min={1}
                                                   onChange={(e) => handleAddChangeCatAttrs(e, 'value', i)}/>

                                    </div>
                                </div>
                            )
                        })}
                        {errors.product_group_specs &&
                            <p className=" text-red-600 invalid-feedback ">
                                لطفا خصوصیت ها ره به درستی کامل کنید.
                            </p>
                        }
                    </div>

                    <div className="divider"/>
                    <div className="flex items-center space-x-2 mt-4 justify-around">
                        <Button processing={processing} btnType="submit" type="primary">
                            ذخیره
                        </Button>
                        <Link href={route('admin.products.index')}>
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
