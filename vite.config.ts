import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { useSelector } from "react-redux"
import { IncomingHttpHeaders } from "http"

// const apiProxy = createProxyMiddleware('/api', apiProxyOptions);

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://feelingxd.ddns.net:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        onProxyRe: (proxyReq, req: { headers: IncomingHttpHeaders }) => {
          const headers = req.headers;

          Object.keys(headers).forEach((key) => {
            proxyReq.setHeader(key, headers[key]);
          });
      }
    }
  },
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
});
