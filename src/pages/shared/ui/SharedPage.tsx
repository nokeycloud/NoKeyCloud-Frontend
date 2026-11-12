import { useEffect } from "react"
import { useAuth } from "@/entities/session"
import { FileExplorer } from "@/widgets/file-explorer"

export function SharedPage() {
    const auth = useAuth()
    useEffect(() => { document.title = "Shared - noKeyCloud" }, [])
    if (auth.status !== "authenticated") return null

    return (
        <div className="flex-1 p-2">
            <h1 className="mb-6 text-2xl font-semibold">Shared</h1>
            <FileExplorer mode="shared" />
        </div>
    )
}