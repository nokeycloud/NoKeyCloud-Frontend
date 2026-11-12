import { Navigate, Outlet } from "react-router"
import { useAuth } from "@/entities/session"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import { AppSidebar } from "@/widgets/app-sidebar"
import { Footer } from "@/widgets/footer"

export function SidebarLayout() {
    const auth = useAuth()

    if (auth.status === "guest") {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="flex h-svh flex-col overflow-hidden">
            <SidebarProvider className="h-full min-h-0 overflow-hidden">
                <AppSidebar />

                <SidebarInset className="flex flex-col overflow-hidden">
                    <div className="flex h-14 shrink-0 items-center gap-2 border-b px-3 md:hidden">
                        <SidebarTrigger />
                        <span className="text-sm font-semibold">noKeyCloud</span>
                    </div>

                    <main className="flex flex-1 flex-col overflow-y-auto">
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>

            <Footer />
        </div>
    )
}