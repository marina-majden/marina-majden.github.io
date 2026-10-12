import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  build: {
    outDir: "docs",
    minify: "oxc",
    cssMinify: "lightningcss",
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (/[\\/]node_modules[\\/](react|react-dom)[\\/]/.test(id)) {
            return "vendor";
          }
        },
      },
    },
  },
});
