import {hasPermission} from '@/utils'
import {Link, usePage} from '@inertiajs/react'
import {Button} from "@/components/index/index.js";
import {Heart, Star} from "lucide-react";

export default function ProductCard({product,i,handleWish,handleAdd}) {
    return (
        <div key={i} className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
            <Button title="favourite" type='ghost' className="btn-xs absolute top-2 left-2 z-1"
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
                <h3 className="text-sm font-medium h-12">
                    <Link href={route('home.getProduct',[product.sku,product.slug])}>
                        <span aria-hidden="true" className="absolute inset-0"/>
                        {product.title}
                    </Link>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <div className="flex items-center">
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-yellow-500"/>
                        <Star className="w-6 h-6 lg:w-4 lg:h-4 text-gray-500"/>
                    </div>
                </div>
                <p className="mt-4 text-base font-medium ">
                    {parseInt(product.price).toLocaleString('en')} میلیون
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
