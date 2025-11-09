import replacement from '../../../../../images/replacement.jpg'
import {useCart} from "react-use-cart";
import {router, usePage} from "@inertiajs/react";
import ProductCard from "@/components/common/product-card.jsx";
import {showToast} from "@/utils.js";

export default function LatestProducts({latestProducts}) {
    const {props: {auth},} = usePage()
    const {addItem} = useCart();
    const handleAdd = (item) => {
        console.log(item)
        addItem({
            id: item.id,
            sku: item.sku,
            title: item.title,
            excerpt: item.excerpt,
            discount: item.discount,
            image: item.image,
            price: item.price,
        })
        showToast('محصول به سبد خرید اضافه شد','success')
    }
    const handleWish = (item) => {
        router.post(route('user.wishlists.store'), {item: item}, {
            forceFormData: true,
            onSuccess: () =>  showToast('محصول به لیست خرید اضافه شد','success'),
        })
    }

    return (
        <>
            <section className="w-full flex justify-center  bg-base-200 py-12">
                <div className="container">
                    <div className="flex items-center gap-3  bg-base-100">
                        <div className="bg-base-100 py-6 mx-auto">
                            <div className="mb-4">
                                <div className="text-center">
                                    <h5 className=" text-[#d8330a] text-base">
                                        آخرین محصولات
                                    </h5>
                                    {/* <div className="rounded-full w-3 h-3 bg-[#d8330a] text-center"></div> */}

                                    <h3 className="text-2xl font-extrabold  my-4">
                                       جدید ترین محصولات TPM
                                    </h3>
                            </div>
                            </div>
                            <div className="-mx-px grid grid-cols-1 border-l border-gray-200 sm:mx-0  md:grid-cols-4 ">
                                {latestProducts.map((product, i) =>
                                    <ProductCard product={product} key={i} handleAdd={()=>handleAdd(product)} handleWish={()=>handleWish(product)}/>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
