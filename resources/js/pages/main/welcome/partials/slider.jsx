import '../../../../../css/embla.css'
import {useCallback, useState} from "react";
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import {NextButton, PrevButton, usePrevNextButtons} from "@/components/common/carousalArrowButtons.jsx";
export default function Slider({sliders}) {
    const[imageIndex,setImageIndex] =useState(1)
    const [emblaRef, emblaApi] = useEmblaCarousel({ direction: 'rtl', loop: true },[Autoplay()])

    const onNavButtonClick = useCallback((emblaApi) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        resetOrStop()
    }, [])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi, onNavButtonClick)
    return(
    <>
        <div className="relative col-span-12 lg:col-span-9 lg:col-start-4 mt-1 sm:mt-2 md:mt-6 w-screen md:w-full">
            <section className="embla" dir="rtl">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {sliders.map((slider,index) => (
                            <div className="embla__slide" key={index}>
                                            <img  src={route('file.show',slider.image)}  alt='slide'
                                                 // loading={`${imageIndex===0 ? 'eager' : 'lazy'}`}
                                            />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="embla__controls">
                    <div className="embla__buttons">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>
                </div>
            </section>
            {/*<div className="carousel w-full  ">*/}
            {/*    <div id="slide1" className="carousel-item relative w-full">*/}
            {/*        {sliders.map((slider,i)=>*/}
            {/*            <img key={i} src={route('file.show',slider.image)} className={`${imageIndex!==++i && 'hidden'} w-full` } alt='slide'*/}
            {/*                 loading={`${imageIndex===0 ? 'eager' : 'lazy'}`}/>*/}
            {/*        )}*/}

            {/*        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2  justify-between">*/}
            {/*            <button onClick={()=>imageIndex<3?setImageIndex(imageIndex+1):setImageIndex(1)} className="btn btn-circle">❮</button>*/}
            {/*            <button onClick={()=>imageIndex>1?setImageIndex(imageIndex-1):setImageIndex(3)} className="btn btn-circle">❯</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}
        </div>
    </>

    )
}
