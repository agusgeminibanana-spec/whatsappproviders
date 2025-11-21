import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa';

// Import the server factory for dev mode
// We use a dynamic import in the plugin to avoid issues during build time if server deps aren't perfect
import { createServer } from "./server/index";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [path.resolve(__dirname)],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
    },
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [
    react(), 
    expressPlugin(), // Re-enable express plugin for dev
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['whatsapp.svg', 'robots.txt'],
      manifest: {
        name: 'WhatsApp Web Clone',
        short_name: 'WhatsApp',
        description: 'WhatsApp Web Clone with Firebase Backend',
        theme_color: '#128C7E',
        icons: [
          {
            src: 'whatsapp.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  optimizeDeps: {
    include: ['firebase/auth', 'firebase/app', 'firebase/analytics', 'firebase/firestore']
  }
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();
      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
