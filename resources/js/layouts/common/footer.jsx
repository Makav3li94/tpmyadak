import React from "react";
import Feature from "@/pages/main/welcome/partials/feature.jsx";
import {Link} from "@inertiajs/react";

export default function Footer({isSingle = false}) {
    return (
        <>
            {isSingle && <Feature isSingle={true}/>}
            <footer className={`${isSingle ? 'bg-bas-100' : 'bg-black'}  w-full flex justify-center `}>

                <div className="container  px-5 md:px-0">
                    <div className="flex flex-wrap justify-between">
                        <ul className="text-white py-14 pl-4">
                            {/* conract us--------- */}
                            <li className="pb-5">
                                <h6 className="font-bold lg:text-lg">تماس با ما</h6>
                            </li>
                            <li className="flex py-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    fill="#d8330a"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
                                </svg>
                                <span className="px-2 font-light text-gray-400">
                                    تهران ، شهرک غرب، بلوار دریا ، خ گلها، خ توحید یک، پلاک ۱۰۱
                                </span>
                            </li>
                            <li className="py-4">
                                <a href="tel:02188582172" title="phonenumber" className="flex">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640"
                                        fill="#d8330a"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            d="M415.8 89C423.6 70.2 444.2 60.1 463.9 65.5L469.4 67C534 84.6 589.2 147.2 573.1 223.4C536 398.4 398.3 536.1 223.3 573.2C147 589.4 84.5 534.1 66.9 469.5L65.4 464C60 444.3 70.1 423.7 88.9 415.9L186.2 375.4C202.7 368.5 221.8 373.3 233.2 387.2L271.8 434.4C342.1 399.5 398.6 341.1 431.1 269.5L387 233.4C373.1 222.1 368.4 203 375.2 186.4L415.8 89z"/>
                                    </svg>
                                    <span className="px-2 font-light text-gray-400">
                                        ۰۲۱-۸۸۵۸۲۱۷۲
                                    </span>
                                </a>
                            </li>
                            <li className="py-4">
                                <a href="mailto:info@tpmyadak.com" title="phonenumber" className="flex">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640"
                                        fill="#d8330a"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/>
                                    </svg>
                                    <span className="px-2 font-light text-gray-400">
                                        info@tpmyadak.com
                                    </span>
                                </a>
                            </li>
                            <li className="py-4 flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    fill="#d8330a"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/>
                                </svg>
                                <span className="px-2 font-light text-gray-400">
                                    از شنبه تا پنج شنبه ساعت ۸ تا ۱۶:۰۰
                                </span>
                            </li>
                        </ul>
                        {/* ------ information----- */}
                        <ul className="text-white py-14 px-4">
                            <li className="pb-5">
                                <h6 className="font-bold lg:text-lg">نقشه سایت</h6>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home')}
                                    title="aboutus"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">صفحه اصلی</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home.faq')}
                                    title="aboutus"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">سوالات متداول</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home.about')}
                                    title="aboutus"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">درباره ما</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home.contact')}
                                    title="aboutus"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">تماس با ما</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home.getBlogs')}
                                    title="aboutus"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">وبلاگ</span>
                                </Link>
                            </li>
                            <li className="py-2">

                            </li>
                        </ul>
                        {/* -----------my account---- */}
                        <ul className="text-white py-14 px-4">
                            <li className="pb-5">
                                <h6 className="font-bold lg:text-lg">لینک ها</h6>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('login')}
                                    title="brands"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">ورود/ثبت نام</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home.rules')}
                                    title="giftcard"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">قوانین و مقررات</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home.privacy')}
                                    title="affilitis"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">حریم خصوصی</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home.guaranty')}
                                    title="faqs"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">گارانتی/وارانتی</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href={route('home.support')}
                                    title="special"
                                    className="text-gray-400 hover:text-[#d8330a] transition duration-300 ease-in group flex items-center"
                                >
                                    <span className="font-light">پشتیبانی</span>
                                </Link>
                            </li>
                        </ul>
                        {/* ----------- categories ---- */}
                        <ul className="text-white py-14 pr-4">
                            <li className="pb-5">
                                <h6 className="font-bold lg:text-lg">نماد و مجوز</h6>
                            </li>
                            <li className="py-2">
                                <a referrerPolicy='origin' target='_blank'
                                   href='https://trustseal.enamad.ir/?id=678789&Code=ziNu6wSbH1CVocmfel8zV1pBXnVUFJ0L'>
                                    <img referrerPolicy='origin' className="h-24"
                                         src='https://tpmyadak.com/enamad.webp'
                                         alt='logo-enamad' code='ziNu6wSbH1CVocmfel8zV1pBXnVUFJ0L'/></a>
                            </li>
                            <li className="py-2">
                                <a href='#'
                                   onClick={(e) => {
                                       e.preventDefault();
                                       window.open("https://logo.samandehi.ir/Verify.aspx?id=395398&p=xlaopfvldshwxlaopfvlmcsi", "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")
                                   }
                                   }>
                                    <img referrerPolicy='origin' id='rgvjsizpapfurgvjsizpoeuk' className="h-24"
                                         alt='logo-samandehi'
                                         src='https://tpmyadak.com/samandehi.webp'/>
                                </a>
                            </li>
                            <li className="py-2">
                                <a href='#'
                                   onClick={(e) => {
                                       e.preventDefault();
                                       window.open('https://www.ecunion.ir/verify/tpmyadak.com?token=72677416948fa1b2a9a4', 'Popup','toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30')
                                   }
                                   }>
                                    <img referrerPolicy='origin' id='rgvjsizpapfurgvjsizpoeuk' className="h-24"
                                         alt='logo-samandehi'
                                         src='https://tpmyadak.com/etehadie.webp'/>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
