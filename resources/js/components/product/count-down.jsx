import {useEffect, useState} from "react";

const Countdown = ({targetDate}) => {
    console.log(targetDate)
    const [countdownDate, setCountdownDate] = useState(
        new Date(targetDate).getTime()
    );
    const [state, setState] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        setInterval(() => setNewTime(), 1000);
    }, []);

    const setNewTime = () => {
        if (countdownDate) {
            const currentTime = new Date().getTime();

            const distanceToDate = countdownDate - currentTime;

            let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
                (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minutes = Math.floor(
                (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
            );
            let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

            const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            days = `${days}`;
            if (numbersToAddZeroTo.includes(hours)) {
                hours = `0${hours}`;
            } else if (numbersToAddZeroTo.includes(minutes)) {
                minutes = `0${minutes}`;
            } else if (numbersToAddZeroTo.includes(seconds)) {
                seconds = `0${seconds}`;
            }

            setState({days: days, hours: hours, minutes, seconds});
        }
    };

    return (
        <div className="flex gap-x-1 sm:gap-x-4">
            <div className="w-10 sm:w-14 border-2 border-gray-300 rounded-sm flex flex-col items-center px-4 py-2">
                <span className="font-bold text-gray-400">{state.days || "0"}</span>
                <span className="text-xs sm:text-sm text-gray-500 font-ligh">
                      روز
                    </span>
            </div>
            <div
                className="w-10 sm:w-14 border-2 border-gray-300 rounded-sm flex flex-col items-center px-4 py-2">
                <span className="font-bold text-gray-400">{state.hours || "00"}</span>
                <span className="text-xs sm:text-sm text-gray-400 font-light">
                      ساعت
                    </span>
            </div>
            <div
                className="w-10 sm:w-14 border-2 border-gray-300 rounded-md flex flex-col items-center px-4 py-2">
                <span className="font-bold text-gray-400">{state.minutes || "00"}</span>
                <span className="text-xs sm:text-sm text-gray-400 font-light">
                      دقیقه
                    </span>
            </div>
            <div
                className="w-10 sm:w-14 border-2 border-gray-300 rounded-md flex flex-col items-center px-4 py-2">
                <span className="font-bold text-gray-400">{state.seconds || "00"}</span>
                <span className="text-xs sm:text-sm text-gray-400 font-light">
                      ثانیه
                    </span>
            </div>
        </div>
    );
};


export default Countdown;
