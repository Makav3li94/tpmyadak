import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";
import { PackageOpen, CalendarArrowUp,CalendarArrowDown } from 'lucide-react'
import DashboardStats from "@/components/common/dashboard-stats.jsx";


export default function Dashboard({stats}) {
    const statsData = [
        {title : "سفارش ها", value : stats.total, icon : <PackageOpen className='w-8 h-8'/>},
        {title : "تحویل گرفته", value : stats.done_count, icon : <CalendarArrowUp className='w-8 h-8'/>},
        {title : "مرجوع شده", value : stats.canceled_count, icon : <CalendarArrowDown className='w-8 h-8'/>},
    ]
    console.log(stats)
    return (
        <UserAuthenticatedLayout
            title={'پنل کاربری'}
            breadcumbs={[
                { name: 'پنل کاربری', href: route('user.dashboard') },
                { name: 'نیم نگاه', href: null },
            ]}>
            <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-3 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>

        </UserAuthenticatedLayout>
    )
}
