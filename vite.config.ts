import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            process.cwd(),
            "src/ant-override.less",
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
})
