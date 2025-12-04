import {Link} from "@inertiajs/react";

const BrandBox = ({image, slug}) => {
    return (
        <div className="border-[1px] w-full border-gray-300 rounded-r-md p-4">
            <Link href={route('home.getBrand', slug)} title="ferari">
                <img
                    src={image}
                    alt="ferari"
                    className="hover:scale-105 xl:w-[168px] xl:h-[115px] mx-auto"
                />
            </Link>
        </div>
    )
}
export default function ProductBrands({brands, isPage = false}) {
    return (
        <section className="bg-base-100 w-full flex justify-center pb-12">

            <div className="container pt-14  px-5 md:px-0">
                <div className="text-center pb-4">
                    <h5 className=" text-[#d8330a] text-base">برترین شرکای تجاری ما</h5>
                    {!isPage &&
                        <h3 className="text-2xl font-extrabold  my-4">
                            خرید بر اساس برند
                        </h3>
                    }
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6">
                    {brands.map((brand, i) =>
                        <BrandBox image={route('file.show', {file: brand.image, dir: 'brand/'})} slug={brand.slug}/>
                    )}
                </div>
            </div>
        </section>
    )
}
