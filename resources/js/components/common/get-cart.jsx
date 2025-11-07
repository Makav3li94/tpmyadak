import React, {useEffect, useState} from 'react';
import {motion} from "motion/react"
import {useCart} from "react-use-cart";
import {ShoppingCart, Plus, Minus} from "lucide-react";
import {Link} from "@inertiajs/react";
import {Button} from "@/components/index/index.js";

const GetCart = ({isMobile = false}) => {
    const {
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        isEmpty,
    } = useCart();
    const [hoverCart, setHoverCart] = useState(false)
    return (
        <motion.div className={`flex border-[1.5px] relative border-gray-300 rounded-md  ${!isMobile && 'px-3'}`} onHoverStart={event => {
            setHoverCart(true)
        }} onTap={event => {
            setHoverCart(!hoverCart)
        }} onHoverEnd={event => {
            setHoverCart(false)
        }}>
            <div className="btn md:btn-ghost">
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary  -top-2 -right-3">{totalUniqueItems}</span>
                    <ShoppingCart className="w-5 h-5 "/>
                </div>

            </div>
            {!isMobile &&
                <>
                    <span className=" tracking-[0.5px] px-3 py-2">
                        سبد خرید
                    </span>
                    <span className="text-[#d8330a] font-bold py-2">
                        {cartTotal} تومان
                    </span>
                </>
            }
            {/* ------------ drop down shopping basket big screen------------ */}
            {hoverCart &&
                <motion.div
                    style={{overflow: "hidden"}}
                    initial={{height: 0}}
                    animate={{height: "auto"}}
                    transition={{duration: 0.5}}
                    exit={{height: 0}}
                    key={"container"}
                    className="border-1 border-gray-300 group-hover:max-h-64  lg:w-[180%] w-  absolute top-full right-2 translate-x-2 z-50 mt-1  bg-white"
                >
                    {items.map((item, index) => (
                        <div className="flex flex-col items-center text-gray-600 justify-between
                                         pt-3 pb-4 border-b border-gray-300 px-3" key={index}>
                            <div className="flex flex-col lg:flex-row w-full justify-around items-center">
                                <span
                                    className="flex-1 w-full  text-sm text-gray-500 hover:text-[#d8330a] transition duration-300 ease-in  ">
                                    {item.title}
                                </span>
                                <Link href="#" title="product01">
                                    <img src={route('file.show', item.image)} alt="محصول انتخابی"
                                         className="w-24 "/>
                                </Link>
                            </div>
                            <div className="flex w-full justify-between items-center">

                                <span className="text-gray-500 ">{item.quantity + ' عدد'} </span>
                                <span className="text-gray-500    ">
                                    {parseInt(item.price).toLocaleString('en')} تومان
                                </span>
                                <div className="">
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
                            </div>

                        </div>
                    ))}
                    {items.length >0 ?(
                        <div className="flex justify-between px-3 py-2">
                            <span className="text-[#d8330a] font-bold py-2">
                                مبلغ کل: {cartTotal} تومان
                            </span>
                            <Link href={route('home.cart')} className="btn btn-success text-base-100 hover:text-[#d8330a]" title="checkout">
                                تکمیل خرید

                            </Link>
                        </div>
                    ):(
                        <div role="alert" className="alert w-64 sm:w-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>سبد خرید خالی است.</span>
                        </div>
                    )}

                </motion.div>
            }
        </motion.div>
    );
};

export default GetCart;
