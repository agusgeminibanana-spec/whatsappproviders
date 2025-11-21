import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    ssr: true,
    rollupOptions: {
      input: "server/index.ts",
    },
    outDir: "dist/server",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
