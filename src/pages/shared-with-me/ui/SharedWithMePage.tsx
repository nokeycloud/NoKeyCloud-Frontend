import { useEffect } from "react"
import { useAuth } from "@/entities/session"
import { FileExplorer } from "@/widgets/file-explorer"

export function SharedWithMePage() {
    const auth = useAuth()
    useEffect(() => { document.title = "Shared with me - noKeyCloud" }, [])
    if (auth.status !== "authenticated") return null

    return (
        <div className="flex-1 p-2">
            <h1 className="mb-6 text-2xl font-semibold">Shared with me</h1>
            <FileExplorer mode="shared-with-me" />
        </div>
    )
}