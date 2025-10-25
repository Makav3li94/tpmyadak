import FrontLayout from "@/layouts/front/front-layout.jsx";

import Category from "@/pages/main/welcome/partials/category.jsx";
import Feature from "@/pages/main/welcome/partials/feature.jsx";
import Promotion from "@/pages/main/welcome/partials/promotion.jsx";
import LatestProducts from "@/pages/main/welcome/partials/latest-products.jsx";
import ProductCategories from "@/pages/main/welcome/partials/product-categories.jsx";
import ProductBrands from "@/pages/main/welcome/partials/product-brands.jsx";
import {Deferred, WhenVisible} from "@inertiajs/react";
import BallSpinner from "@/components/common/ball-spinner.jsx";
import LatestBlogs from "@/pages/main/welcome/partials/latest-blogs.jsx";
const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        author: {
            name: 'Michael Foster',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    // More posts...
]
export default function Index({sliders,promoProducts,latestProducts,productCategories,brands,latestBlogs}) {
    return (
        <FrontLayout>


            <Category sliders={sliders}/>
            <Feature/>
            <Deferred data="promoProducts" fallback={<BallSpinner/>}>
                {/*<WhenVisible data="posts" fallback={<BallSpinner/>}>*/}
                    <Promotion promoProducts={promoProducts}/>
                {/*</WhenVisible>*/}
            </Deferred>
            <Deferred data="latestProducts" fallback={<BallSpinner/>}>
                {/*<WhenVisible data="posts" fallback={<BallSpinner/>}>*/}
                <LatestProducts latestProducts={latestProducts}/>
                {/*</WhenVisible>*/}
            </Deferred>
            <Deferred data="productCategories" fallback={<BallSpinner/>}>
                {/*<WhenVisible data="posts" fallback={<BallSpinner/>}>*/}
                <ProductCategories productCategories={productCategories}/>
                {/*</WhenVisible>*/}
            </Deferred>
            <Deferred data="brands" fallback={<BallSpinner/>}>
                {/*<WhenVisible data="posts" fallback={<BallSpinner/>}>*/}
                <ProductBrands brands={brands}/>
                {/*</WhenVisible>*/}
            </Deferred>
            <Deferred data="latestBlogs" fallback={<BallSpinner/>}>
                {/*<WhenVisible data="posts" fallback={<BallSpinner/>}>*/}
                <LatestBlogs latestBlogs={latestBlogs}/>
                {/*</WhenVisible>*/}
            </Deferred>
        </FrontLayout>
    )
}
