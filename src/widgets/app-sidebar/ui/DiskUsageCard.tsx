import {HardDrive} from "lucide-react"
import { formatBytes } from "@/shared/lib"
import { useTheme } from "@/app/providers/ThemeProvider"
import {Windows95ResourceMeter} from "react-old-icons";

const MOCK_USED_BYTES = 2.4 * 1024 * 1024 * 1024
const MOCK_TOTAL_BYTES = 10 * 1024 * 1024 * 1024

export function DiskUsageCard() {
    const percentage = Math.min(100, (MOCK_USED_BYTES / MOCK_TOTAL_BYTES) * 100)
    const { theme } = useTheme()

    return (
        <div className="space-y-2 rounded-lg bg-sidebar-accent/60 p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium">
                    {theme === "win69"
                        ? <Windows95ResourceMeter size={24} />
                        : <HardDrive className="h-3.5 w-3.5 text-muted-foreground" />}
                    <span>Storage</span>
                </div>
                <span className="text-xs text-muted-foreground">
                    {Math.round(percentage)}%
                </span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-sidebar">
                <div
                    className="h-full rounded-full bg-primary transition-[width] duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="text-[11px] leading-none text-muted-foreground">
                {formatBytes(MOCK_USED_BYTES)} of {formatBytes(MOCK_TOTAL_BYTES)} used
            </p>
        </div>
    )
}