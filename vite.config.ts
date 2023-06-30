import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
          secure: false,
          ws: true
        },
        "ws": {
          target: env.STOMP_URL, 
          changeOrigin: true,
          ws: true, 
        },
      },
    },
  }
})
