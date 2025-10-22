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
            <section className="w-full flex justify-center  bg-base-100 py-12">
                <div className="container">
                    <div className="flex items-center gap-3  bg-base-100">
                        <a href="#" title="replecment" className="hidden md:flex md:flex-shrink-0">
                            <img src={replacement} alt="replacement"
                                 className="md:w-[200px] h:[660px] lg:w-[280px] lg:h-[560px]"/>
                        </a>
                        <div className="bg-base-100 py-6 mx-auto">
                            <div className="mb-4">
                                <ul className=" md:flex flex-wrap -mb-px font-bold text-center px-6">
                                    <li className="me-2" role="presentation">
                                        <button
                                            className="inline-block p-4 cursor-pointer text-[#ff2d37] transition duration-300 ease-in"
                                            id="profile-tab"
                                            type="button"

                                        >
                                            آخرین محصولات
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="-mx-px grid grid-cols-1 border-l border-gray-200 sm:mx-0  md:grid-cols-3 ">
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
