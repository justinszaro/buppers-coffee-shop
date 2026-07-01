import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import type { Plugin } from "vite"

function ignoreWellKnown(): Plugin {
  return {
    name: "ignore-well-known",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith("/.well-known/")) {
          res.writeHead(404)
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [ignoreWellKnown(), tailwindcss(), reactRouter()],
})
