import React, {useEffect, useState} from "react";
import {useCart} from "react-use-cart";

import {Link, router, useForm, usePage} from "@inertiajs/react";
import FrontLayout from "@/layouts/front/front-layout.jsx";


export default function CheckPayment({verify_code, order, message}) {

    const [counter, setCounter] = useState(10);
    useEffect(() => {
        const id = setInterval(() => {
            setCounter(prev => {
                if (prev <= 1) {
                    clearInterval(id);
                    router.visit(route('user.orders.show', order.id));
                    return 0;
                }
                return prev - 1;
            });
        }, 1000); // هر 1 ثانیه

        return () => clearInterval(id); // cleanup
    }, []);

    const {emptyCart} = useCart();
    useEffect(() => {
        emptyCart()
    }, []);

    return (

        <div className="mx-auto max-w-3xl my-12 ">
            <div className="max-w-xl p-5 border-1 border-gray-300">
                <h1 className="text-base font-medium text-indigo-600">
                    {verify_code===0 ? 'پرداخت ناموفق' : 'پرداخت موفق'}
                </h1>
                <p className="mt-2 text-4xl font-bold tracking-tight">
                    {verify_code===0 ? 'برای پرداخت مجدد از قسمت سفارشات اقدام کنید.' : 'سفارش شما ثبت شد.'}
                </p>

                <dl className="mt-12 text-sm font-medium">
                    <dt className="text-gray-900">کدپیگیری سفارش</dt>
                    <dd className="mt-2 text-indigo-600">{order.id}</dd>
                </dl>
                <dl className="mt-12 text-sm font-medium">
                    <dt className="text-gray-900">کدپیگیری پرداخت</dt>
                    <dd className="mt-2 text-indigo-600">{verify_code === 0 ? '---' : verify_code}</dd>
                </dl>
                <p className="text-center mt-5">انتقال به پیگیری سفارش در {counter} ثانیه</p>
                <Link href={route('user.orders.show',order.id)} className='btn btn-success text-center w-full mt-4'>
                    جهت انتقال سریعتر کلیک کنید
                </Link>
            </div>

            {/*<section aria-labelledby="order-heading" className="mt-10 border-t border-gray-200">*/}
            {/*    <h2 id="order-heading" className="sr-only">*/}
            {/*        Your order*/}
            {/*    </h2>*/}

            {/*    <h3 className="sr-only">Items</h3>*/}
            {/*    {products.map((product) => (*/}
            {/*        <div key={product.id} className="flex space-x-6 border-b border-gray-200 py-10">*/}
            {/*            <img*/}
            {/*                alt={product.imageAlt}*/}
            {/*                src={product.imageSrc}*/}
            {/*                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"*/}
            {/*            />*/}
            {/*            <div className="flex flex-auto flex-col">*/}
            {/*                <div>*/}
            {/*                    <h4 className="font-medium text-gray-900">*/}
            {/*                        <a href={product.href}>{product.name}</a>*/}
            {/*                    </h4>*/}
            {/*                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>*/}
            {/*                </div>*/}
            {/*                <div className="mt-6 flex flex-1 items-end">*/}
            {/*                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">*/}
            {/*                        <div className="flex">*/}
            {/*                            <dt className="font-medium text-gray-900">Quantity</dt>*/}
            {/*                            <dd className="ml-2 text-gray-700">{product.quantity}</dd>*/}
            {/*                        </div>*/}
            {/*                        <div className="flex pl-4 sm:pl-6">*/}
            {/*                            <dt className="font-medium text-gray-900">Price</dt>*/}
            {/*                            <dd className="ml-2 text-gray-700">{product.price}</dd>*/}
            {/*                        </div>*/}
            {/*                    </dl>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}

            {/*    <div className="sm:ml-40 sm:pl-6">*/}
            {/*        <h3 className="sr-only">Your information</h3>*/}

            {/*        <h4 className="sr-only">Addresses</h4>*/}
            {/*        <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">*/}
            {/*            <div>*/}
            {/*                <dt className="font-medium text-gray-900">Shipping address</dt>*/}
            {/*                <dd className="mt-2 text-gray-700">*/}
            {/*                    <address className="not-italic">*/}
            {/*                        <span className="block">Kristin Watson</span>*/}
            {/*                        <span className="block">7363 Cynthia Pass</span>*/}
            {/*                        <span className="block">Toronto, ON N3Y 4H8</span>*/}
            {/*                    </address>*/}
            {/*                </dd>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <dt className="font-medium text-gray-900">Billing address</dt>*/}
            {/*                <dd className="mt-2 text-gray-700">*/}
            {/*                    <address className="not-italic">*/}
            {/*                        <span className="block">Kristin Watson</span>*/}
            {/*                        <span className="block">7363 Cynthia Pass</span>*/}
            {/*                        <span className="block">Toronto, ON N3Y 4H8</span>*/}
            {/*                    </address>*/}
            {/*                </dd>*/}
            {/*            </div>*/}
            {/*        </dl>*/}

            {/*        <h4 className="sr-only">Payment</h4>*/}
            {/*        <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">*/}
            {/*            <div>*/}
            {/*                <dt className="font-medium text-gray-900">Payment method</dt>*/}
            {/*                <dd className="mt-2 text-gray-700">*/}
            {/*                    <p>Apple Pay</p>*/}
            {/*                    <p>Mastercard</p>*/}
            {/*                    <p>*/}
            {/*                        <span aria-hidden="true">••••</span>*/}
            {/*                        <span className="sr-only">Ending in </span>1545*/}
            {/*                    </p>*/}
            {/*                </dd>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <dt className="font-medium text-gray-900">Shipping method</dt>*/}
            {/*                <dd className="mt-2 text-gray-700">*/}
            {/*                    <p>DHL</p>*/}
            {/*                    <p>Takes up to 3 working days</p>*/}
            {/*                </dd>*/}
            {/*            </div>*/}
            {/*        </dl>*/}

            {/*        <h3 className="sr-only">Summary</h3>*/}

            {/*        <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">*/}
            {/*            <div className="flex justify-between">*/}
            {/*                <dt className="font-medium text-gray-900">Subtotal</dt>*/}
            {/*                <dd className="text-gray-700">$36.00</dd>*/}
            {/*            </div>*/}
            {/*            <div className="flex justify-between">*/}
            {/*                <dt className="flex font-medium text-gray-900">*/}
            {/*                    Discount*/}
            {/*                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">STUDENT50</span>*/}
            {/*                </dt>*/}
            {/*                <dd className="text-gray-700">-$18.00 (50%)</dd>*/}
            {/*            </div>*/}
            {/*            <div className="flex justify-between">*/}
            {/*                <dt className="font-medium text-gray-900">Shipping</dt>*/}
            {/*                <dd className="text-gray-700">$5.00</dd>*/}
            {/*            </div>*/}
            {/*            <div className="flex justify-between">*/}
            {/*                <dt className="font-medium text-gray-900">Total</dt>*/}
            {/*                <dd className="text-gray-900">$23.00</dd>*/}
            {/*            </div>*/}
            {/*        </dl>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>

    )
}
CheckPayment.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
