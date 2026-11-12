import { useEffect } from "react"
import { useAuth } from "@/entities/session"
import { TrashExplorer } from "@/widgets/trash-explorer"

export function TrashPage() {
    const auth = useAuth()
    useEffect(() => { document.title = "Trash - noKeyCloud" }, [])
    if (auth.status !== "authenticated") return null

    return (
        <div className="flex-1 p-2">
            <h1 className="mb-6 text-2xl font-semibold">Trash</h1>
            <TrashExplorer />
        </div>
    )
}