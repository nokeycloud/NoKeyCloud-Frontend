import { Link, useLocation } from "react-router"
import { FolderOpen, Inbox, Share2, Star, Trash2 } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/shared/ui/sidebar"
import {
    Windows95MyComputer,
    Windows95StartupDiskWizard,
    Windows95Hticons6,
    Windows95MainCpl2,
    WindowsShellIcon142
} from "react-old-icons"
import { useTheme } from "@/app/providers/ThemeProvider"
import { UserProfileMenu } from "@/widgets/user-profile-menu"
import { DiskUsageCard } from "./DiskUsageCard"
import type { NavItem } from "../model/types"

const NAV_ITEMS: NavItem[] = [
    { to: "/", label: "My files", icon: FolderOpen, match: (p) => p === "/" || p.startsWith("/folder") },
    { to: "/trash", label: "Trash", icon: Trash2, match: (p) => p === "/trash" },
    { to: "/favorites", label: "Favorites", icon: Star, match: (p) => p === "/favorites" },
    { to: "/shared", label: "Shared", icon: Share2, match: (p) => p === "/shared" },
    { to: "/shared-with-me", label: "Shared with me", icon: Inbox, match: (p) => p === "/shared-with-me" },
]

const WIN69_ICON_COMPONENTS: Record<string, React.ComponentType<{ size?: number }>> = {
    "/": Windows95MyComputer,
    "/trash": WindowsShellIcon142,
    "/favorites": Windows95StartupDiskWizard,
    "/shared": Windows95Hticons6,
    "/shared-with-me": Windows95MainCpl2,
}

export function AppSidebar() {
    const location = useLocation()
    const { isMobile, setOpenMobile, state } = useSidebar()
    const { theme } = useTheme()
    const isWin69 = theme === "win69"
    const isCollapsed = !isMobile && state === "collapsed"
    const win69IconSize = isCollapsed ? 16 : 24

    const handleNavClick = () => {
        if (isMobile) setOpenMobile(false)
    }

    return (
        <Sidebar
            variant="floating"
            collapsible="icon"
            className="relative h-full *:data-[slot=sidebar-container]:absolute *:data-[slot=sidebar-container]:h-full *:data-[slot=sidebar-container]:inset-y-0"
        >
            <SidebarHeader className="group-data-[collapsible=icon]:items-center">
                <div className="flex w-full items-center justify-between group-data-[collapsible=icon]:justify-center">
                    <Link
                        to="/"
                        className="truncate px-2 text-lg font-bold group-data-[collapsible=icon]:hidden"
                    >
                        noKeyCloud
                    </Link>
                    <SidebarTrigger />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {NAV_ITEMS.map(({ to, label, icon: Icon, match }) => {
                                const Win69Icon = WIN69_ICON_COMPONENTS[to]
                                return (
                                    <SidebarMenuItem key={to}>
                                        <SidebarMenuButton
                                            isActive={match(location.pathname)}
                                            tooltip={label}
                                            render={<Link to={to} onClick={handleNavClick} />}
                                        >
                                            {isWin69 && Win69Icon ? (
                                                <span className="flex shrink-0 items-center justify-center">
                                                    <Win69Icon size={win69IconSize} />
                                                </span>
                                            ) : <Icon />}
                                            <span>{label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="gap-2">
                <div className="group-data-[collapsible=icon]:hidden">
                    <DiskUsageCard />
                </div>
                <UserProfileMenu variant="sidebar" />
            </SidebarFooter>
        </Sidebar>
    )
}