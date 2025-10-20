import {useState} from "react";
export default function Slider({sliders}) {
    const[imageIndex,setImageIndex] =useState(1)
    return(
        <div className="relative col-span-12 lg:col-span-9 lg:col-start-4 mt-1 sm:mt-2 md:mt-6 w-screen md:w-full">
            <div className="carousel w-full  ">
                <div id="slide1" className="carousel-item relative w-full">
                    {sliders.map((slider,i)=>
                        <img key={i} src={route('file.show',slider.image)} className={`${imageIndex!==++i && 'hidden'} w-full` } alt='slide'
                             loading={`${imageIndex===0 ? 'eager' : 'lazy'}`}/>
                    )}

                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2  justify-between">
                        <button onClick={()=>imageIndex<3?setImageIndex(imageIndex+1):setImageIndex(1)} className="btn btn-circle">❮</button>
                        <button onClick={()=>imageIndex>1?setImageIndex(imageIndex-1):setImageIndex(3)} className="btn btn-circle">❯</button>
                    </div>
                </div>

            </div>
        </div>

    )
}
