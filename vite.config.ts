import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'
import path from "node:path"

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [
        react(),
        tailwindcss(),
        ...(command === 'serve' ? [mkcert()] : []),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
    },
}))