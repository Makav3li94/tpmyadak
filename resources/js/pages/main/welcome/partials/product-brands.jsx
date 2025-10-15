import {AlignJustify} from "lucide-react";
import brand1 from '../../../../../images/b1.jpg'
import brand2 from '../../../../../images/b2.jpg'
import brand3 from '../../../../../images/b3.jpg'
import brand4 from '../../../../../images/b4.jpg'
import brand5 from '../../../../../images/b5.jpg'
import brand6 from '../../../../../images/b6.jpg'

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
export default function ProductBrands(props) {
    return (
        <section className="bg-white w-full flex justify-center pb-12">

            <div className="container pt-14">
                <div className="text-center pb-4">
                    <h5 className=" text-[#ff2d37] text-base">برترین شرکای تجاری ما</h5>
                    <h3 className="text-2xl font-extrabold text-[#333333] my-4">
                        خرید بر اساس برند
                    </h3>
                </div>
                <div className="flex">

                    <BrandBox image={brand1}/>
                    <BrandBox image={brand2}/>
                    <BrandBox image={brand3}/>
                    <BrandBox image={brand4}/>
                    <BrandBox image={brand5}/>
                    <BrandBox image={brand6}/>

                </div>
            </div>
        </section>
    )
}
