import FrontLayout from "@/layouts/front/front-layout.jsx";

import Category from "@/pages/main/welcome/partials/category.jsx";
import Feature from "@/pages/main/welcome/partials/feature.jsx";
import Promotion from "@/pages/main/welcome/partials/promotion.jsx";
import LatestProducts from "@/pages/main/welcome/partials/latest-products.jsx";
import ProductCategories from "@/pages/main/welcome/partials/product-categories.jsx";
import ProductBrands from "@/pages/main/welcome/partials/product-brands.jsx";
import {Deferred, WhenVisible} from "@inertiajs/react";
import BallSpinner from "@/components/common/ball-spinner.jsx";

export default function Index({sliders,promoProducts,latestProducts,productCategories,brands}) {
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

        </FrontLayout>
    )
}
