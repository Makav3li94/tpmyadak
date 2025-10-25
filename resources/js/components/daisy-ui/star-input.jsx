import React, {useState} from 'react'

const BottomTextHelper = ({error}) => {
    if (!error) return null

    return <p className=" text-red-600 invalid-feedback ">{error}</p>
}

export default function StarInput(props) {
    const [rating, setRating] = useState(props.current  ? props.current : null);
    const [hover, setHover] = useState(null);
    return (
        <div className="form-control w-full  gap-16 flex flex-row justify-between items-center">

            <label className=" py-5 font-400 me-12 text-xs">     {props.label}</label>
            <div className="me-2">
                {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;

                    return (
                        <label key={index} >

                            <input type="radio" name="rating" className="hidden" value={currentRating}
                                   onChange={() => {
                                       props.setData(props.name,currentRating)
                                       setRating(currentRating)
                                   }}
                            />
                            <span className={`text-sm ${currentRating <= (hover || rating) ? "mfon" : "mfoff"} cursor-pointer `} key={`user-${index}`}
                                  onMouseEnter={() => setHover(currentRating)}
                                  onMouseLeave={() => setHover(null)}>&#9733;</span>
                        </label>
                    );
                })}
            </div>

            <BottomTextHelper error={props.error} />
        </div>
    )
}
