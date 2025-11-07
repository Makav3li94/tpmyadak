import {Link} from "@inertiajs/react";
import {LockOpen,Twitter,MessageCircleMore,Send,Linkedin,Instagram,Contact} from "lucide-react";
export default function TopHeader({user}) {

    return (
        <header className="w-full flex justify-center   bg-black text-[#878787]">
            <div className="container  flex justify-between py-3">
                <div className="flex items-center ">
                    {user===null ?(
                        <Link href={route('login')} title="enter"
                              className="enter flex items-center group pr-4 transition-colors duration-400 ease-in">
                            <LockOpen className="w-4 ml-2"/>
                            <div
                                className="font-light text-sm sm:text-base group-hover:text-[#d8330a] transition duration-400 ease-in">
                                ثبت نام/ورود
                            </div>
                        </Link>
                    ):(
                        <Link href={route('user.dashboard')} title="enter"
                              className="enter flex items-center group pr-4 transition-colors duration-400 ease-in">
                            <Contact className="w-4 ml-2"/>
                            <div
                                className="font-light text-sm sm:text-base group-hover:text-[#d8330a] transition duration-400 ease-in">
                                {user.name}
                            </div>
                        </Link>
                    )}

                </div>
                {/* ----------------top header icons social media----------- */}
                <div className="icons hidden sm:block items-center ">
                    <a href="#" rel="nofollow noopener" title="instagram" className="items-center pl-2">
                        <Instagram className="w-6 h-6 inline-block border border-gray-500 p-0.5 rounded-md hover:fill-[#f7f7f7] hover:bg-[#d8330a] hover:border-[#d8330a] transition duration-300 ease-in"/>
                    </a>
                    <a href="#" rel="nofollow noopener" title="linkedin" className="pl-2">
                        <Linkedin className="w-6 h-6 inline-block border border-gray-500 p-0.5 rounded-md hover:fill-[#f7f7f7] hover:bg-[#d8330a] hover:border-[#d8330a] transition duration-300 ease-in"/>

                    </a>
                    <a href="#" rel="nofollow noopener" title="telegram">
                        <Send className="w-6 h-6 inline-block border border-gray-500 p-0.5 rounded-md hover:fill-[#f7f7f7] hover:bg-[#d8330a] hover:border-[#d8330a] transition duration-300 ease-in"/>
                    </a>
                    <a href="#" rel="nofollow noopener" title="whatsapp" className="pr-2">
                        <MessageCircleMore className="w-6 h-6 inline-block border border-gray-500 p-0.5 rounded-md hover:fill-[#f7f7f7] hover:bg-[#d8330a] hover:border-[#d8330a] transition duration-300 ease-in"/>
                    </a>
                    <a href="#" rel="nofollow noopener" title="twitter" className="pr-2">
                        <Twitter className="w-6 h-6 inline-block border border-gray-500 p-0.5 rounded-md hover:fill-[#f7f7f7] hover:bg-[#d8330a] hover:border-[#d8330a] transition duration-300 ease-in"/>
                    </a>
                </div>
            </div>
        </header>
    )
}
