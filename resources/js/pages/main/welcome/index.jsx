import FrontLayout from "@/layouts/front/front-layout.jsx";

import Category from "@/pages/main/welcome/partials/category.jsx";
import Feature from "@/pages/main/welcome/partials/feature.jsx";
import Promotion from "@/pages/main/welcome/partials/promotion.jsx";
import LatestProducts from "@/pages/main/welcome/partials/latest-products.jsx";
import ProductCategories from "@/pages/main/welcome/partials/product-categories.jsx";
import ProductBrands from "@/pages/main/welcome/partials/product-brands.jsx";

export default function Index(props) {
    return (
        <FrontLayout>


            <Category/>
            <Feature/>
            <Promotion/>
            <LatestProducts/>
            <ProductCategories/>
            <ProductBrands/>

        </FrontLayout>
    )
}
