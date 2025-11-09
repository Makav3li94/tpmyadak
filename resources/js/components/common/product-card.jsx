import {Link, usePage} from '@inertiajs/react'
import {Button} from "@/components/index/index.js";
import {Heart, Star} from "lucide-react";
import Badge from "@/components/daisy-ui/badge.jsx";
export default function ProductCard({product,i,handleWish,handleAdd}) {
    return (
        <div key={i} className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
            {/*<span className="label-product label-new">New </span>*/}
            <Button title="favourite" type='ghost' className="btn-xs absolute top-8 right-6 z-1"
                    onClick={() => {
                        handleWish(product.id)
                    }}>
                <Heart className="w-6 h-6 text-error"/>
            </Button>
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                    alt='product'
                    src={`http://127.0.0.1:8000/storage/prothumb/${product.image}`}
                    // src={`https://cdn.tpmyadak.com/prothumb/${product.image}`}
                    // src={route('file.show', product.image)}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium h-18">
                    <Link href={route('home.getProduct',[product.sku,product.slug])}>
                        <span aria-hidden="true" className="absolute inset-0"/>
                        {product.title}
                    </Link>
                </h3>
                <div className="mt-4 flex flex-col items-center">
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <div className="flex items-center">
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                    </div>
                </div>
                <p className="mt-4 text-base font-medium h-16">
                    {parseInt(product.price) !== 0 ? (
                        <>
                            {product.status_promotion !==1 ? (
                                <>{parseInt(product.price).toLocaleString('en')} میلیون</>
                            ) : (
                                <div className="text-gray-400 py-1">
                                    <div className="line-through text-sm sm:text-base">
                                        {parseInt(product.price).toLocaleString('en')} میلیون
                                    </div>
                                    <div className="text-[#d8330a] text-sm sm:text-base pl-2">
                                        {parseInt((product.price - product.discount)).toLocaleString('en')} میلیون
                                    </div>
                                </div>
                            )}


                        </>

                    ):(
                        <Badge type="primary" outline={true}>ناموجود</Badge>
                    )}
                </p>
            </div>
            <div className="mt-6">
                <Button onClick={() => handleAdd(product)} type="danger"
                        className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200">
                    افزودن به سبد خرید <span className="sr-only">, {product.title}</span>
                </Button>
            </div>
        </div>
    )
}
