import {
    Archive,
    Code,
    File as LucideFileIcon,
    FileText,
    Image as ImageIcon,
    Music,
    Video,
} from "lucide-react"
import {
    Windows95GpuJpegFile,
    Windows95GurichTextFile,
    WindowsVideoFile,
    Windows95WaveSound,
    WindowsSystemFile,
    WindowsZipFile,
    Windows95File,
} from "react-old-icons"
import { useTheme } from "@/app/providers/ThemeProvider"
import { cn } from "@/shared/lib"

interface FileIconProps {
    filename: string
    className?: string
}

export function FileIcon({ filename, className }: FileIconProps) {
    const { theme } = useTheme()
    const isWin69 = theme === "win69"
    const ext = filename.split(".").pop()?.toLowerCase()

    switch (ext) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
            return isWin69
                ? <Windows95GpuJpegFile size={24} />
                : <ImageIcon className={cn("h-5 w-5 text-purple-500", className)} />
        case "pdf":
        case "txt":
        case "doc":
        case "docx":
        case "md":
            return isWin69
                ? <Windows95GurichTextFile size={24} />
                : <FileText className={cn("h-5 w-5 text-orange-500", className)} />
        case "mp4":
        case "mkv":
        case "avi":
            return isWin69
                ? <WindowsVideoFile size={24} />
                : <Video className={cn("h-5 w-5 text-red-500", className)} />
        case "mp3":
        case "wav":
        case "flac":
            return isWin69
                ? <Windows95WaveSound size={24} />
                : <Music className={cn("h-5 w-5 text-yellow-500", className)} />
        case "js":
        case "cs":
        case "py":
        case "java":
        case "cpp":
            return isWin69
                ? <WindowsSystemFile size={24} />
                : <Code className={cn("h-5 w-5 text-green-500", className)} />
        case "zip":
        case "rar":
        case "7z":
        case "tar":
        case "tar.gz":
        case "tar.bz2":
            return isWin69
                ? <WindowsZipFile size={24} />
                : <Archive className={cn("h-5 w-5 text-stone-500", className)} />
        default:
            return isWin69
                ? <Windows95File size={24} />
                : <LucideFileIcon className={cn("h-5 w-5 text-slate-500", className)} />
    }
}