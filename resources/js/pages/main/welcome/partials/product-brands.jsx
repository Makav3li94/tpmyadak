
const BrandBox = ({image})=>{
    return(
        <div className="border-[1px] w-full border-gray-300 rounded-r-md p-4">
            <a href="#" title="ferari">
                <img
                    src={image}
                    alt="ferari"
                    className="hover:scale-105 xl:w-[168px] xl:h-[115px] mx-auto"
                />
            </a>
        </div>
    )
}
export default function ProductBrands({brands}) {
    return (
        <section className="bg-base-100 w-full flex justify-center pb-12">

            <div className="container pt-14">
                <div className="text-center pb-4">
                    <h5 className=" text-[#ff2d37] text-base">برترین شرکای تجاری ما</h5>
                    <h3 className="text-2xl font-extrabold  my-4">
                        خرید بر اساس برند
                    </h3>
                </div>
                <div className="flex">
                    {brands.map((brand,i)=>
                    <BrandBox image={route('file.show',brand.image)}/>
                )}
                </div>
            </div>
        </section>
    )
}
