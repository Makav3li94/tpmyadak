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
    const [errName, setErrName] = useState(null);
    const [errEmail, setErrEmail] = useState(null);
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

    const submit = (e) => {
        e.preventDefault()

        post(route('login'))
    }
    const handleConfirmButtonClick = (e, type = 'login') => {
        e.preventDefault()
        setBtnDis(true)
        setErrMobile(null)
        if (type === 'login' || type === 'resend') {
            setCounter(45)
            if ((!showPass) || type === 'resend') {
                setErrMobile(null)
                axios.get(route('phoneStat', {mobile: data.mobile})).then(response => {
                        setData('password', '')
                        if (response.data.user === 'True') {
                            showToast('رمز عبور جدید برای شما ارسال شد.', 'success')
                            setStatusMessage(response.data.statusMessage)
                            setShowPass(true)
                            setBtnDis(false)
                        } else if (response.data.user === 'False') {
                            if (response.data.sms_active === 'yes') {
                                showToast('کد با موفقیت ارسال شد.', 'success')
                                let suckit = (parseInt(response.data.code) - ((parseInt(data.mobile) * 100) / 2)) / 1363
                                console.log(suckit)
                                setMfCode(suckit)
                            } else {
                                setDisableSms(true)
                            }
                            setIsRegister(true)
                            setIsRegister(true)
                            setBtnDis(false)
                        }
                        if (Object.keys(response.data.errs).length !== 0) {

                            let err = response.data.errs
                            if (err.mobile) {
                                setErrMobile(err.mobile)
                            }
                            setBtnDis(false)
                        }
                    }
                ).catch(error => {
                    console.log(error)
                    setBtnDis(false)
                });

            } else {
                if (data.password.length !== 6) {
                    showToast('لطفا رمز را به درستی وارد کنید.', 'error')
                    return
                }
                router.post(route('login'),
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
        } else {
            if (!disableSms) {
                if (!handleCode()) {
                    return false
                }
            }
            setErrMobile(null)
            setErrName(null)
            setErrEmail(null)
            axios.post(route('registerPost',
                {
                    code: data.code,
                    name: data.name,
                    mobile: data.mobile,
                    email: data.email,
                    password: data.password,
                },)).then(response => {
                    if (response.data.status === 'success'){
                        router.visit(route('user.dashboard'))
                    }
                    if (Object.keys(response.data.errs).length !== 0) {

                        let err = response.data.errs
                        if (err.mobile) {
                            setErrMobile(err.mobile)
                        }
                        if (err.name) {
                            setErrName(err.name)
                        }
                        if (err.email) {
                            setErrEmail(err.email)
                        }
                        if (err.code) {
                            setErrCode(err.code)
                        }
                        setBtnDis(false)
                    }
                }
            ).catch(error => {
                console.log(error)
                setBtnDis(false)
            });
        }

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
                            <div className='text-right text-primary'>
                                <Link href={route('password.request')}>
                                    <span
                                        className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">فراموشی
                                        رمز عبور</span></Link>
                            </div>
                        </>
                    )}
                    {showPass &&
                        <Button type="error"
                                onClick={(e) => handleConfirmButtonClick(e, 'login')}
                                disabled={counter !== 0}>ارسال مجدد
                            <strong
                                className="text-danger mr-2">{counter !== 0 ? counter : ''}</strong>
                        </Button>
                    }

                    <Button btnType="submit" processing={processing} type={'primary'}
                            className={"btn mt-2 w-full btn-primary"}>
                        ورود
                    </Button>
                    <div className='text-center mt-4'>اکانت ندارید ؟
                        <Link href={route('register')}>
                            <span
                                className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                ثبت نام
                            </span>
                        </Link> کنید.

                    </div>
                </form>
            ) : (
                <form onSubmit={(e) => handleConfirmButtonClick(e, 'register')}>


                    <div className="mb-4">
                        <TextInput
                            type="text"
                            label="نام و نام خانوادگی"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={onHandleChange}
                            error={errName}
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
                            error={errEmail}
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
                                error={errCode}
                            />
                        </div>
                    }
                    <Button btnType="submit" processing={processing} type={'primary'}
                            className={"btn mt-2 w-full btn-primary"}>
                        ثبت نام
                    </Button>
                    {disableSms &&
                        <Button type="error"
                                onClick={(e) => handleConfirmButtonClick(e, 'resend')}
                                disabled={counter !== 0}>ارسال مجدد
                            <strong
                                className="text-danger mr-2">{counter !== 0 ? counter : ''}</strong>
                        </Button>
                    }


                    <div className='text-center mt-4'>اکانت ندارید ؟
                        <Link href={route('register')}>
                            <span
                                className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                ثبت نام
                            </span>
                        </Link> کنید.

                    </div>
                </form>
            )}

            <p className="text-accent-content/70 text-center  text-xs mt-5">با ورود به سایت قوانین و مقررات را
                میپذیرم.</p>

        </GuestLayout>
    )
}
