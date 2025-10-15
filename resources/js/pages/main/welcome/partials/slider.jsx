import slide1 from '../../../../../images/bannerSlide01.jpg'
import slide2 from '../../../../../images/bannerSlider02.jpg'
import slide3 from '../../../../../images/bannerSlider03.jpg'
import {useState} from "react";
export default function Slider(props) {
    const[imageIndex,setImageIndex] =useState(1)
    console.log(imageIndex)
    return(
        <div className="carousel w-full relative col-span-12 lg:col-span-9 lg:col-start-4 mt-1 sm:mt-2 md:mt-6 z-10">
            <div id="slide1" className="carousel-item relative w-full">
                {imageIndex===1&&    <img src={slide1} className="w-full" />}
                {imageIndex===2&&    <img src={slide2} className="w-full" />}
                {imageIndex===3&&    <img src={slide3} className="w-full" />}

                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button onClick={()=>imageIndex<3?setImageIndex(imageIndex+1):setImageIndex(1)} className="btn btn-circle">❮</button>
                    <button onClick={()=>imageIndex>1?setImageIndex(imageIndex-1):setImageIndex(3)} className="btn btn-circle">❯</button>
                </div>
            </div>

        </div>
    )
}
