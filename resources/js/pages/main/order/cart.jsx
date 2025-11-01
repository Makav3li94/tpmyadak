import React, {useEffect, useState} from "react";
import {useCart} from "react-use-cart";
import {Link} from "@inertiajs/react";
import {CheckIcon, CircleQuestionMark, ClockIcon, Minus, Plus, XIcon} from "lucide-react";
import {Button} from "@/components/index/index.js";
import {numLatinToAr} from "@/utils.js";
import OrderLayout from "@/layouts/front/order-layout.jsx";

export default function Cart(props) {
    const [hasMounted, setHasMounted] = useState(false);
    const [subtotal, setSubTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const {
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        isEmpty,
    } = useCart();

    function handleSubs() {
        let sub = items.reduce((a, v) => a = a + (v.discount === null ? v.itemTotal : (parseInt(v.price) * v.quantity)), 0)
        let dis = items.reduce((a, v) => a = a + (v.discount === null ? 0 : (v.itemTotal - parseInt(v.price) * v.quantity)), 0)
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

    console.log(items)
    return (
           <>
               <h1 className="sr-only">سبد خرید</h1>
               <section aria-labelledby="summary-heading"
                        className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16">
                   <h2 id="cart-heading" className="sr-only">
                       محصولات موجود در سبد
                   </h2>

                   <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                       {hasMounted && (
                           items.map((item, index) => (
                               <li key={index} className="flex py-6 sm:py-10   bg-base-100 card-sm shadow-sm ">
                                   <div className="flex-shrink-0">
                                       <img
                                           alt={item.title}
                                           src={route('file.show',item.image)}
                                           // src={`https://cdn.kadooyab.com/product75/${item.image}`}
                                           className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                       />
                                   </div>

                                   <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                       <div
                                           className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                           <div>
                                               <div className="flex justify-between">
                                                   <h3 className="text-sm">
                                                       <Link href={item.sku}
                                                             className="font-medium text-gray-700 hover:text-gray-800">
                                                           {item.title}
                                                       </Link>
                                                   </h3>
                                               </div>
                                               <div className="mt-1 flex text-sm">
                                                   <p className="text-gray-500">test1</p>
                                                   {item.size ? (
                                                       <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{item.size}</p>
                                                   ) : null}
                                               </div>
                                               <p className="mt-1 text-sm font-medium text-gray-900">
                                                   {parseInt(item.price).toLocaleString('en')} تومان
                                               </p>
                                           </div>

                                           <div className="mt-4 sm:mt-0 sm:pr-9">
                                               <div className="absolute left-0 top-20">
                                                   <ul className="action flex items-center list-unstyled justify-center gap-3 ">
                                                       <li className="edit">
                                                           <Button type='success' className="btn-xs"
                                                                   onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                           >
                                                               <Plus className="fs-6_5  align-middle "/>
                                                           </Button>
                                                       </li>

                                                       <li className="edit">
                                                           {parseInt(item.quantity).toLocaleString('en')}
                                                       </li>
                                                       <li className="edit">
                                                           <Button type='warning' className="btn-xs"
                                                                   onClick={(e) => updateItemQuantity(item.id, item.quantity - 1)}
                                                           >
                                                               <Minus className="fs-6_5  align-middle "/>
                                                           </Button>
                                                       </li>

                                                   </ul>
                                               </div>
                                               <div className="absolute left-0 top-0">
                                                   <button type="button" onClick={() => removeItem(item.id)}
                                                           className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                       <span className="sr-only">حذف</span>
                                                       <XIcon aria-hidden="true" className="h-5 w-5"/>
                                                   </button>
                                               </div>
                                           </div>
                                       </div>

                                       <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                           {item.stock ? (
                                               <CheckIcon aria-hidden="true"
                                                          className="h-5 w-5 flex-shrink-0 text-green-500"/>
                                           ) : (
                                               <ClockIcon aria-hidden="true"
                                                          className="h-5 w-5 flex-shrink-0 text-gray-300"/>
                                           )}

                                           <span>{item.stock ? 'موحود در انبار' : `ارسال تا 7 روز`}</span>
                                       </p>
                                   </div>
                               </li>
                           ))
                       )}

                   </ul>
               </section>

               {/* Order summary */}
               <section
                   aria-labelledby="summary-heading"
                   className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:px-0 lg:pb-16"
               >
                   <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                       خلاصه سبد
                   </h2>
                   {hasMounted && (
                       <dl className="mt-6 space-y-4">
                           <div className="flex items-center justify-between">
                               <dt className="text-sm text-gray-600">مجموع</dt>
                               <dd className="text-sm font-medium text-gray-900">
                                   {subtotal.toLocaleString('en')}
                               </dd>
                           </div>
                           <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                               <dt className="flex items-center text-sm text-gray-600">
                                   <span>تخفیف</span>
                                   {/*<a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">*/}
                                   {/*    <span className="sr-only">Learn more about how shipping is*/}
                                   {/*        calculated</span>*/}
                                   {/*    <CircleQuestionMark aria-hidden="true" className="h-5 w-5"/>*/}
                                   {/*</a>*/}
                               </dt>
                               <dd className="text-sm font-medium text-gray-900">
                                   {discountTotal.toLocaleString('en')}
                               </dd>
                           </div>
                           {/*<div className="flex items-center justify-between border-t border-gray-200 pt-4">*/}
                           {/*    <dt className="flex text-sm text-gray-600">*/}
                           {/*        <span>Tax estimate</span>*/}
                           {/*        <a href="#"*/}
                           {/*           className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">*/}
                           {/*            <span className="sr-only">Learn more about how tax is calculated</span>*/}
                           {/*            <CircleQuestionMark aria-hidden="true" className="h-5 w-5"/>*/}
                           {/*        </a>*/}
                           {/*    </dt>*/}
                           {/*    <dd className="text-sm font-medium text-gray-900">$8.32</dd>*/}
                           {/*</div>*/}
                           <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                               <dt className="text-base font-medium text-gray-900">قابل پرداخت</dt>
                               <dd className="text-base font-medium text-gray-900">
                                   {numLatinToAr(parseInt(cartTotal).toLocaleString('en'))}
                               </dd>
                           </div>
                       </dl>
                   )}
                   <div className="mt-6">
                       <Link href={route('home.checkout')}
                             className="block text-center w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                       >
                           رفتن به صفحه صورتحساب
                       </Link>
                   </div>
               </section>
           </>
    )
}
Cart.layout = (Page) => <OrderLayout>{Page}</OrderLayout>;
