import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

// Manually read and parse backend's package.json
const backendPkgPath = path.resolve(__dirname, "./backend/package.json");
const backendPkg = JSON.parse(fs.readFileSync(backendPkgPath, "utf-8"));

// Extract dependencies to externalize them
const external = [
  ...Object.keys(backendPkg.dependencies || {}),
  ...Object.keys(backendPkg.devDependencies || {}),
];

// Server build configuration
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "backend/src/index.ts"),
      name: "server",
      fileName: "production",
      formats: ["es"],
    },
    outDir: "dist/server",
    target: "node22",
    ssr: true,
    rollupOptions: {
      external: [
        // Node.js built-ins and all dependencies from package.json
        ...external,
        /^node:/, // Match all node built-ins
      ],
      output: {
        format: "es",
        entryFileNames: "[name].mjs",
      },
    },
    minify: false, // Keep readable for debugging
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
