import { Outlet } from "react-router"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { UserProfileMenu } from "@/widgets/user-profile-menu"

export function AuthLayout() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header profileMenuSlot={<UserProfileMenu />} />
            <main className="flex flex-1 flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}