import {Link, usePage} from '@inertiajs/react'
import {Eye, Lightbulb} from 'lucide-react'

export default function NotificationMenu() {
    const {props: {notification_count,notifications},} = usePage()
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

            <ul className="list  mt-2 menu dropdown-content z-1 bg-base-100  shadow rounded-box w-94   ">
                {notification_count===0 ? (
                    <li className="list-row items-center">
                        اعلانی ندارید :(
                    </li>
                ) :(
                    notifications.map((notification,i)=>
                        <li className="list-row items-center">
                            <div className="text-4xl font-thin opacity-30 tabular-nums">{++i}</div>
                            <div className="list-col-grow">
                                {notification.data.message}
                            </div>
                            {notification.data.type==='order' &&
                                <Link href={route('admin.orders.show',notification.data.type_id)} className="btn btn-square btn-ghost">
                                    <Eye className='size-[1.2em]'/>
                                </Link>
                            }
                            {notification.data.type==='register' &&
                                <Link href={route('admin.users.edit',notification.data.type_id)} className="btn btn-square btn-ghost">
                                    <Eye className='size-[1.2em]'/>
                                </Link>
                            }
                            {notification.data.type==='tx' &&
                                <Link href={route('admin.transactions.index')} className="btn btn-square btn-ghost">
                                    <Eye className='size-[1.2em]'/>
                                </Link>
                            }



                        </li>


                    )
                )}


            </ul>
        </details>
    )
}
