import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

export default function ({ status }) {
    const title = {
        503: '503: سرویس در دسترس نیست',
        500: '500: خطای سرور',
        404: '404: صفحه یافت نشد',
        403: '403: ممنوعه',
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    return (
        <div
            style={{
                color: 'red',
                padding: '20px',
                backgroundColor: '#ffe6e6',
            }}
            className="flex flex-row gap-2"
        >
            <Link href={route('dashboard')} className="flex flex-row items-center gap-2">
                <ArrowLeft />
                داشبورد
            </Link>
            <div className="border-l-2 pl-2 border-red-400">
                <h1>{title}</h1>
                <div>{description}</div>
            </div>
        </div>
    )
}
