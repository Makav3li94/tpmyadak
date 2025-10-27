import React, {useEffect, useState} from 'react'
import GuestLayout from '@/layouts/default/guest-layout'
import {Head, Link, router, useForm} from '@inertiajs/react'

import {TextInput, Checkbox, Button} from '@/components/index'

import {showToast} from "@/utils.js";

export default function Login({status}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        mobile: '09',
        name: '',
        email: '',
        code: '',
        password: '',
    })
    const [disableSms, setDisableSms] = useState(false);
    const [mfCode, setMfCode] = useState(null);
    const [isRegister, setIsRegister] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [errMobile, setErrMobile] = useState(null);
    const [errCode, setErrCode] = useState(null);
    const [btnDis, setBtnDis] = useState(false)
    const [statusMessage, setStatusMessage] = useState('');
    const [counter, setCounter] = useState(30);
    useEffect(() => {
        let id
        let delay
        if (counter > 0) {
            id = setInterval(() => setCounter((oldCount) => oldCount - 1), 1000);
        } else if (counter === 0) {
            return
            // delay = setTimeout(() => {
            //     setCounter(60)
            // }, 7000)
        }

        return () => {
            clearTimeout(delay)
            clearInterval(id);
        };

    }, [counter])
    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])
    useEffect(() => {
        if (data.code !== null && data.code.length === 4) {
            handleCode()
        }
    }, [data.code])
    const handleCode = (e) => {
        if (data.code === null) {
            return false
        }
        setErrCode('')


        // if (parseInt(mfCode) !== parseInt(data.code.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))) {
        if (parseInt(mfCode) !== parseInt(converter(data.code))) {
            setErrCode('کد وارد شده اشتباه است.')
            setBtnDis(true)
        } else {
            setErrCode(null)
            setBtnDis(false)
            return true
        }

    }
    const converter = (text) => text.replace(/[٠-٩۰-۹]/g, a => a.charCodeAt(0) & 15);
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            post(route('login'))
        }
    }

    // Helper to process phoneStat response (extracted to avoid duplication)
    const processPhoneStatResponse = (responseData) => {
        // Clear password field when phoneStat returns
        setData('password', '')

        if (responseData.user === 'True') {
            showToast('رمز عبور جدید برای شما ارسال شد.', 'success')
            setStatusMessage(responseData.statusMessage)
            console.log(responseData.pass)
            setShowPass(true)
            return
        }

        if (responseData.user === 'False') {
            if (responseData.sms_active === 'yes') {
                showToast('کد با موفقیت ارسال شد.', 'success')
                // reverse-engineer code as before
                const suckit = (parseInt(responseData.code) - ((parseInt(data.mobile) * 100) / 2)) / 1363
                console.log(suckit)
                setMfCode(suckit)
            } else {
                setDisableSms(true)
            }
            setIsRegister(true)
        }
    }

    // Optimized click handler (refactored, uses async/await and helper above)
    const handleConfirmButtonClick = async (e, type = 'login') => {
        e.preventDefault()
        setBtnDis(true)
        setErrMobile(null)

        // LOGIN or RESEND flows
        if (type === 'login' || type === 'resend') {
            setCounter(45)

            // If user is requesting code or hasn't chosen password flow
            if (!showPass || type === 'resend') {
                try {
                    setErrMobile(null)
                    const response = await axios.get(route('phoneStat', {mobile: data.mobile}))
                    const responseData = response.data

                    // process main response
                    processPhoneStatResponse(responseData)

                    // handle validation errors returned by endpoint
                    if (responseData.errs && Object.keys(responseData.errs).length !== 0) {
                        const err = responseData.errs
                        if (err.mobile) {
                            setErrMobile(err.mobile)
                        }
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setBtnDis(false)
                }
            } else {
                // Password login flow
                if (!data.password || data.password.length !== 6) {
                    showToast('لطفا رمز را به درستی وارد کنید.', 'error')
                    setBtnDis(false)
                    return
                }

                router.post(
                    route('login'),
                    {
                        email: data.email,
                        mobile: data.mobile,
                        password: data.password,
                        norm: true
                    },
                    {
                        onStart: () => setBtnDis(true),
                        onFinish: () => setBtnDis(false),
                        onError: () => setErrMobile('شماره همراه یا رمز عبور اشتباه می باشد.'),
                    }
                )
            }

            return
        }

        // REGISTER flow
        try {
            if (!disableSms) {
                const codeIsValid = handleCode()
                if (!codeIsValid) {
                    // keep button disabled state until user fixes code; re-enable
                    setBtnDis(false)
                    return false
                }
            }


        } catch (error) {
            console.log(error)
        } finally {
            setBtnDis(false)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        // Clear previous errors

        post(
            route('registerPost',{
                code: data.code,
                name: data.name,
                mobile: data.mobile,
                email: data.email,
                password: data.password,
            }),
        )


    }
    return (
        <GuestLayout>
            <Head title="ورود | ثبت نام"/>

            <h2 className='text-2xl font-semibold mb-2 text-center'>ورود | ثبت نام</h2>
            {!isRegister ? (
                <form onSubmit={(e) => handleConfirmButtonClick(e, 'login')}>


                    {!showPass ? (
                        <div className="mb-4">
                            <TextInput
                                type="text"
                                label="موبایل"
                                name="mobile"
                                placeholder="+۹۸"
                                pattern="\d{11}"
                                value={data.mobile}
                                className="mt-1 block w-full"
                                dir="ltr"
                                maxLength={11}
                                autoFocus={true}
                                onChange={onHandleChange}
                                error={errMobile}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <TextInput
                                    type="password"
                                    label="رمزعبور"
                                    name="password"
                                    dir="ltr"
                                    placeholder="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={onHandleChange}
                                    error={errMobile}
                                    onKeyDownCapture={handleKeyDown}
                                />
                            </div>
                            {/*<div className='text-right text-primary'>*/}
                            {/*    <Link href={route('password.request')}>*/}
                            {/*        <span*/}
                            {/*            className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">فراموشی*/}
                            {/*            رمز عبور</span></Link>*/}
                            {/*</div>*/}
                        </>
                    )}

                    <Button btnType="submit" processing={processing} type={'primary'}
                            className={"btn mt-2 w-full btn-primary"}>
                        ورود
                    </Button>
                    {showPass &&
                    <Button type="error"
                            className={"btn mt-5 w-full "}
                            onClick={(e) => handleConfirmButtonClick(e, 'login')}
                            disabled={counter !== 0}>ارسال مجدد پیامک
                        <strong
                            className="text-danger mr-2">{counter !== 0 ? counter : ''}</strong>
                    </Button>
                    }
                    {/*<div className='text-center mt-4'>اکانت ندارید ؟*/}
                    {/*    <Link href={route('register')}>*/}
                    {/*        <span*/}
                    {/*            className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">*/}
                    {/*            ثبت نام*/}
                    {/*        </span>*/}
                    {/*    </Link> کنید.*/}

                    {/*</div>*/}
                </form>
            ) : (
                <form onSubmit={(e) => handleSubmit(e)}>


                    <div className="mb-4">
                        <TextInput
                            type="text"
                            label="نام و نام خانوادگی"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={onHandleChange}
                            error={errors.name}
                        />
                    </div>
                    <div className="mb-4">
                        <TextInput
                            type="text"
                            label="ایمیل"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={onHandleChange}
                            error={errors.email}
                        />
                    </div>
                    {!disableSms &&
                        <div className="mb-4">
                            <TextInput
                                type="code"
                                label="کدتایید"
                                name="code"
                                value={data.code}
                                className="mt-1 block w-full"
                                onChange={onHandleChange}
                                error={errors.code}
                            />
                        </div>
                    }
                    <Button btnType="submit" processing={processing} type={'primary'}
                            className={"btn mt-2 w-full btn-primary"}>
                        ثبت نام
                    </Button>
                    {!disableSms &&
                        <Button type="error"
                                className={"btn mt-5 w-full "}
                                onClick={(e) => handleConfirmButtonClick(e, 'resend')}
                                disabled={counter !== 0}>ارسال مجدد پیامک
                            <strong
                                className="text-danger mr-2">{counter !== 0 ? counter : ''}</strong>
                        </Button>
                    }


                    {/*<div className='text-center mt-4'>اکانت ندارید ؟*/}
                    {/*    <Link href={route('register')}>*/}
                    {/*        <span*/}
                    {/*            className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">*/}
                    {/*            ثبت نام*/}
                    {/*        </span>*/}
                    {/*    </Link> کنید.*/}

                    {/*</div>*/}
                </form>
            )}

            <p className="text-accent-content/70 text-center  text-xs mt-5">با ورود به سایت قوانین و مقررات را
                میپذیرم.</p>

        </GuestLayout>
    )
}
