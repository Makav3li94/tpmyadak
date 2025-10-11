import {usePage} from '@inertiajs/react'
import {Lightbulb} from 'lucide-react'

export default function NotificationMenu() {
    const {
        props: {notification_count},
    } = usePage()

    return (
        <details className="dropdown dropdown-end p-1 hover:bg-base-100 rounded-md">
            <summary className="btn btn-link text-base-content no-underline px-0 my-0">
                <div className="indicator">
                    <span className="indicator-item badge badge-sm badge-secondary">{notification_count}</span>
                    <label className="  hover:bg-base-200 p-2 rounded-2xl">
                        <Lightbulb className=" h-5 w-5"/>
                    </label>
                </div>
            </summary>

            <ul className="mt-2 menu dropdown-content z-1 bg-base-100  shadow rounded-box w-52">
                <li>
                    اعلانی ندارید :(
                </li>

            </ul>
        </details>
    )
}
