
import {getUser} from "@/app/utils/user";
import DashboardLayout from "@/app/component/layout/DashBoardLayout";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    return (
        <DashboardLayout user={user ? { firstname: user.firstname, lastname: user.lastname } : null}>
            {children}
        </DashboardLayout>
    );
}

