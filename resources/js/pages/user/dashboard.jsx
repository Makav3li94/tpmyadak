import UserAuthenticatedLayout from "@/layouts/user/user-authenticated-layout.jsx";

export default function Dashboard(props) {
    return (
        <UserAuthenticatedLayout>
            <h1 className="text-center py-44">USER</h1>
        </UserAuthenticatedLayout>
    )
}
