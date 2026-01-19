import {Popover, PopoverBackdrop, PopoverButton, PopoverPanel, Radio, RadioGroup} from '@headlessui/react'
import React, {useEffect, useState} from "react";
import {useCart} from "react-use-cart";

import {ChevronUp, CheckCircleIcon} from "lucide-react";
import OrderLayout from "@/layouts/front/order-layout.jsx";
import {useForm, usePage} from "@inertiajs/react";
import Button from "@/components/daisy-ui/button.jsx";
import {useModal} from "@/hooks.js";
import FormModal from "@/pages/admin/user/form-modal.jsx";
import {showToast} from "@/utils.js";


export default function Checkout({user, paymentMethods, shippingMethods}) {

    const {props: {auth},} = usePage()
    const [hasMounted, setHasMounted] = useState(false);
    const [subtotal, setSubTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);

    const formModal = useModal()
    const [code, setCode] = useState(null);
    const [discount, setDiscount] = useState(null);
    const {
        items,
        updateItemQuantity,
        cartTotal,
        isEmpty,
    } = useCart();

    const {processing, data, setData, get, post} = useForm({
        items: items,
        address_id: '',
        payment_type: 'online',
        payment_method_id: paymentMethods[0].id,
        shipping_method_id: shippingMethods[0].id,
        subtotal:'',
        discount: discountTotal,
        discount_id: null,
        total_cost:cartTotal
    });
    const toggleFormModal = (address = null) => {
        formModal.setData(address)
        formModal.toggle()
    }

    function handleSubs() {
        let sub = items.reduce((a, v) => a = a + (v.discount === null ? v.itemTotal : (parseInt(v.price) * v.quantity)), 0)
        let dis = items.reduce((a, v) => a = a + (v.discount === null ? 0 : (parseInt(v.discount) * v.quantity)), 0)
        setData({
            ...data,
            subtotal: sub,
            discount: dis
        })
        setSubTotal(sub)
        setDiscountTotal(dis)
    }

    useEffect(() => {
        setHasMounted(false);
        handleSubs()
    }, [updateItemQuantity]);
    useEffect(() => {
        if (!hasMounted) {
            handleSubs();
        }
        setHasMounted(true);


    }, [hasMounted]);
    useEffect(() => {
    }, [discount, code])
    const handleDiscount = (event) => {
        event.preventDefault()
        if (code === '' || code.length !== 8) {
            return
        }
        if (discount !== null) {
            showToast('کد تخفیف قبلا استفاده شده.','error')
            return
        }
        axios.get(route('home.discount', code)).then(response => {
            if (response.data.status === 'success') {
                setDiscount(response.data.discount)
                setData('discount_id', response.data.discount.id)
                showToast('کد تخفیف اعمال شد.','success')
            }
            if (response.data.status === 'error') {
                setDiscount(null)
                setData('discount_id', null)
                showToast('کد تخفیف منقضی شده یا معتبر نیست.','error')
            }
        }).catch(error => {
            setDiscount(null)
            setData('discount_id', null)
            showToast('کد تخفیف منقضی شده یا معتبر نیست.','error')
            console.error(error);
        });
    }
    const handleOrder = (event) => {
        event.preventDefault()
        post(route('home.order'), {
            onSuccess: () => {
            }
        },);
    }
    return (

        <>
            <h1 className="sr-only">Order information</h1>

            <section aria-labelledby="summary-heading"
                     className=" px-4 pb-10 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16">
                <div className="mx-auto max-w-lg lg:max-w-none">
                    <h2 id="summary-heading" className="text-lg font-medium ">
                        صورتحساب
                    </h2>
                    <ul role="list"
                        className="divide-y divide-gray-200 text-sm font-medium border-gray-100 ">
                        {hasMounted && (
                            items.map((item, index) => (
                                <li key={index} className="flex items-start space-x-4 py-6">
                                    <img
                                        alt={item.title}
                                        src={`http://cdn.tpmyadak.com/prothumb/${item.image}`}
                                        // src={`https://cdn.kadooyab.com/product75/${item.image}`}
                                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                    />
                                    <div className="flex-auto space-y-1">
                                        <h3>{item.title}</h3>
                                        {/*<p className="text-gray-500">test1</p>*/}
                                        {item.size ? (
                                            <p className="text-gray-500">{item.size}</p>
                                        ) : null}
                                    </div>
                                    <p className="flex-none text-base font-medium">
                                        {parseInt(item.price).toLocaleString('en')} تومان
                                    </p>
                                </li>
                            ))
                        )}
                    </ul>
                    <form className="my-10">
                        <label htmlFor="discount-code-mobile" className="block text-sm font-medium ">
                            کد تخفیف
                        </label>
                        <div className="mt-1 flex space-x-4">
                            <div className="join">
                                <button className="btn btn-neutral join-item"
                                        disabled={(code === null || code.length === 0)}
                                        onClick={handleDiscount}>
                                    اعمال
                                </button>
                                <div>
                                    <label className="input validator join-item">
                                        <input type="text" placeholder="tpm-" required dir='ltr'
                                               onInvalid={e => e.target.setCustomValidity('لطفا کد تخفیف را به درستی کنید.')}
                                               onInput={F => F.target.setCustomValidity('')}
                                               onChange={(e) => setCode(e.target.value)} name='discount'/>
                                    </label>
                                    <div className="validator-hint hidden">کد تخفیف را به درستی وارد کنید</div>
                                </div>

                            </div>
                        </div>
                    </form>
                    <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium  lg:block">
                        <div className="flex items-center justify-between">
                            <dt className="">مجموع</dt>
                            <dd>       {subtotal.toLocaleString('en')}</dd>
                        </div>

                        <div className="flex items-center justify-between">
                            <dt className="">تخفیف</dt>
                            <dd>   {discountTotal.toLocaleString('en')}</dd>
                        </div>

                        {/*<div className="flex items-center justify-between">*/}
                        {/*    <dt className="">Taxes</dt>*/}
                        {/*    <dd>$26.80</dd>*/}
                        {/*</div>*/}

                        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                            <dt className="text-base">قابل پرداخت</dt>
                            <dd className="text-base">
                                {parseInt(cartTotal-discountTotal).toLocaleString('en')}
                            </dd>
                        </div>
                    </dl>

                    <Popover
                        className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium  bg-base-100 lg:hidden">
                        <div className="relative z-9999 border-t border-gray-200  px-4 sm:px-6">
                            <div className="mx-auto max-w-lg">
                                <PopoverButton className="flex w-full items-center py-6 font-medium">
                                    <span className="mr-auto text-base">قابل پرداخت</span>
                                    <span className="mr-2 text-base"> {parseInt(cartTotal-discountTotal).toLocaleString('en')}</span>
                                    <ChevronUp aria-hidden="true" className="h-5 w-5 text-gray-500"/>
                                </PopoverButton>
                            </div>
                        </div>

                        <PopoverBackdrop
                            transition
                            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                        />

                        <PopoverPanel
                            transition
                            className="relative transform bg-base-100 px-4 py-6 transition duration-300 ease-in-out data-[closed]:translate-y-full sm:px-6"
                        >
                            <dl className="mx-auto max-w-lg space-y-6">
                                <div className="flex items-center justify-between">
                                    <dt className="">مجموع</dt>
                                    <dd> {subtotal.toLocaleString('en')}</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                    <dt className="">تخفیف</dt>
                                    <dd> {discountTotal.toLocaleString('en')}</dd>
                                </div>

                                {/*<div className="flex items-center justify-between">*/}
                                {/*    <dt className="">Taxes</dt>*/}
                                {/*    <dd>$26.80</dd>*/}
                                {/*</div>*/}
                            </dl>
                        </PopoverPanel>
                    </Popover>
                </div>
            </section>

            <form className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:px-0 lg:pb-16" onSubmit={handleOrder}>
                <div className="mx-auto max-w-lg lg:max-w-none">
                    <section aria-labelledby="contact-info-heading">
                        <h2 id="contact-info-heading" className="text-lg font-medium ">
                            اطلاعات تحویل
                        </h2>

                    </section>

                    {(user && user.addresses && user.addresses.length > 0) ? user.addresses.map((address, i) =>

                        <div className="mt-2  bg-base-100 card-sm shadow-sm mb-2">
                            <div className="card-body">
                                <h2 className="card-title">آدرس {++i}</h2>
                                <p>{address.name}</p>
                                <p>{address.postal_code}</p>
                                {/*<p>{address.m_code}</p>*/}
                                <p>{address.mobile}</p>
                                <p>{address.phone}</p>
                                <p>{address.address}</p>
                                <div className="justify-end card-actions">
                                    <button className="btn btn-primary" disabled={data.address_id === address.id}
                                            onClick={(e) =>{
                                                e.preventDefault();
                                                setData('address_id',address.id)
                                            }}>
                                        انتخاب به عنوان گیرنده
                                    </button>
                                </div>
                                {data.address_id === address.id &&
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="h-5 w-5 text-indigo-600 absolute top-2 left-2"
                                />
                                }
                            </div>
                        </div>
                    ) : (
                        <div role="alert" className="alert alert-warning alert-dash mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current"
                                 fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            <span>آدرسی موجود نیست.</span>

                        </div>
                    )}
                    <Button className='mt-5' type="info"
                            onClick={() => toggleFormModal()}>
                        افزودن آدرس
                    </Button>
                    <div className="mt-10 border-t border-gray-200 pt-10">
                        <fieldset>
                            <legend className="text-lg font-medium ">نحوه ارسال</legend>
                            <RadioGroup
                                value={data.shipping_method_id}
                                onChange={() => setData('shipping_method_id')}
                                className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 z-0"
                            >
                                {shippingMethods.map((shippingMethod, shippingMethodIdx) => (
                                    <Radio
                                        key={shippingMethod.id}
                                        value={shippingMethod.id}
                                        aria-label={shippingMethod.title}
                                        defaultChecked={shippingMethodIdx === 0}
                                        // aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                                        className="group  relative flex cursor-pointer rounded-lg border border-gray-300 bg-base-100 p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                                    >
                                        <span className="flex flex-1">
                                            <span className="flex flex-col">
                                                <span
                                                    className="block text-sm font-medium ">{shippingMethod.title}</span>
                                                <span className="mt-2 flex items-center text-sm text-gray-500">
                                                    1 تا 3 روز
                                                </span>
                                                <span
                                                    className="mt-6 text-sm font-medium ">{shippingMethod.cost}</span>
                                            </span>
                                        </span>
                                        <CheckCircleIcon
                                            aria-hidden="true"
                                            className="h-5 w-5 text-indigo-600 [.group:not([data-checked])_&]:hidden"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                        />
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </fieldset>
                    </div>
                    <div className="mt-10 border-t border-gray-200 pt-10">
                        <h2 className="text-lg font-medium ">نحوه پرداخت</h2>

                        <fieldset className="mt-4">
                            <legend className="sr-only">متد پرداخت</legend>
                            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                                    <div key={paymentMethod.id} className="flex items-center">
                                        {paymentMethodIdx === 0 ? (
                                            <input
                                                defaultChecked
                                                id={paymentMethod.id}
                                                name="payment-type"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <input
                                                id={paymentMethod.id}
                                                name="payment-type"
                                                disabled={true}
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        )}

                                        <label htmlFor={paymentMethod.id}
                                               className="mr-3 block text-sm font-medium ">
                                            {paymentMethod.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                    <div
                        className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                        <Button disabled={data.address_id === ''} type='error' btnType='submit'>
                            ثبت سفارش و پرداخت
                        </Button>

                        {data.address_id === '' ? (
                            <>
                                {user.addresses.length === 0 ? (
                                    <p className="mt-4 text-center text-sm text-red-500 sm:mt-0 sm:text-left">
                                        لطفا ابتدا یک آدرس تحویل ثبت کنید.
                                    </p>
                                ) : (
                                    <p className="mt-4 text-center text-sm text-info/50-500 sm:mt-0 sm:text-left">
                                        لطفا آدرس تحویل را انتخاب کنید.
                                    </p>
                                )}
                            </>

                        ) : (
                            <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                                ادامه خرید ...
                            </p>
                        )}

                    </div>
                </div>
            </form>
            {formModal.isOpen && <FormModal modalState={formModal} user={user} is_user={true}/>}
        </>

    )
}
Checkout.layout = (Page) => <OrderLayout>{Page}</OrderLayout>;
