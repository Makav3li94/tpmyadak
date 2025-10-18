import {Car, Undo2, ShieldCheck, LifeBuoy} from "lucide-react";

const FeatureBox = (props) => {
    return (
        <div className="flex col-span-12 sm:col-span-6 lg:col-span-3">
            <div
                className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-300 rounded-full flex justify-center items-center">
                {props.icon}
            </div>
            <div className="px-4 py-2 flex flex-col">
                <span className=" text-sm font-bold">
                 {props.title}
                </span>
                <span className="text-gray-500 text-sm pt-2">
                 {props.subTitle}
                </span>
            </div>
        </div>
    )
}
export default function Feature(props) {
    return (
        <section className="w-full flex justify-center mb-12">
            <div className="container">
                <div className="grid grid-cols-12 mt-12">
                    <FeatureBox title="ارسال رایگان" subTitle="خرید های بالاتر از ۵ میلیون"
                                icon={<Car className="w-6 h-6 sm:w-8 sm:h-8 text-error/90"/>}/>
                    <FeatureBox title="مرجوعی ۳۰ روزه" subTitle="۳۰ روز برای بازگشت محصول"
                                icon={<Undo2 className="w-6 h-6 sm:w-8 sm:h-8 text-error/90"/>}/>
                    <FeatureBox title="خرید امن" subTitle="پرداخت ۱۰۰٪ امن"
                                icon={<ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-error/90"/>}/>
                    <FeatureBox title="پشتیبانی آنلاین" subTitle="پشتیبانی ۲۴ ساعته آنلاین"
                                icon={<LifeBuoy className="w-6 h-6 sm:w-8 sm:h-8 text-error/90"/>}/>
                </div>
            </div>
        </section>
    )
}
