import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa';
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
    expressPlugin(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['whatsapp.svg', 'robots.txt'],
      manifest: {
        name: 'WhatsApp Web Clone',
        short_name: 'WhatsApp',
        description: 'WhatsApp Web Clone with Firebase Backend',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'whatsapp.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        navigateFallback: '/index.html',
        // CRITICAL: Prevent Service Worker from intercepting auth and API calls
        navigateFallbackDenylist: [/^\/api\//, /^\/__\/auth\//],
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        cleanupOutdatedCaches: true
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
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
