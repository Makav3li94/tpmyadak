import React, {useEffect, useState} from "react";
import {Redo2} from "lucide-react";
import logo from "../../../images/logo.png"
import {Button} from "@/components/index/index.js";
import OrderHeaderSteps from "@/layouts/common/order-header-steps.jsx";
import {Link} from "@inertiajs/react";
export default function OrderHeader(props) {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    return (
        <header className="absolute top-0 left-0 right-0 border-b border-gray-200 bg-white text-sm font-medium text-gray-700">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className=" flex justify-between items-center">
                    <div className="hidden lg:flex lg:items-center">
                        <Link href={route('home')} className="">
                            <span className="sr-only">tpm</span>
                            <img alt="tpm" src={logo} className="h-8 w-auto"/>
                        </Link>
                    </div>

                    <OrderHeaderSteps/>
                    <div>
                        {hasMounted &&
                            <Button onClick={() => window.history.back()}>
                                <Redo2/>
                            </Button>
                        }
                    </div>
                    <p className="sm:hidden">       <img alt="tpm" src={logo} className="h-8 w-auto"/></p>
                </div>
            </div>
        </header>
    )
}
