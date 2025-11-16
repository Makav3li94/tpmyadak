import FrontLayout from "@/layouts/front/front-layout.jsx";

import Category from "@/pages/main/welcome/partials/category.jsx";
import Feature from "@/pages/main/welcome/partials/feature.jsx";
import Promotion from "@/pages/main/welcome/partials/promotion.jsx";
import LatestProducts from "@/pages/main/welcome/partials/latest-products.jsx";
import ProductCategories from "@/pages/main/welcome/partials/product-categories.jsx";
import ProductBrands from "@/pages/main/welcome/partials/product-brands.jsx";
import {Deferred, Head, WhenVisible} from "@inertiajs/react";
import BallSpinner from "@/components/common/ball-spinner.jsx";
import LatestBlogs from "@/pages/main/welcome/partials/latest-blogs.jsx";
import React from "react";

export default function Index({sliders,promoProducts,latestProducts,productCategories,brands,latestBlogs}) {
    return (
        <FrontLayout>
            <Head title="تی‌پی‌ام یدک مرجع خرید لوازم یدکی خودرو"/>

           {/*<div className="min-h-screen">*/}
               <Category sliders={sliders}/>
               <Feature/>
           {/*</div>*/}
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
