import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";

export default function Dashboard(props) {
    return (
        <UserAuthenticatedLayout
            title={'پنل کاربری'}
            breadcumbs={[
                { name: 'پنل کاربری', href: route('user.dashboard') },
                { name: 'نیم نگاه', href: null },
            ]}>
            <h1 className="text-center py-44">USER</h1>
        </UserAuthenticatedLayout>
    )
}
