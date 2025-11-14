import path from "path";
import { createServer } from "./index";
import * as express from "express";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

// Serve static assets from the SPA build directory
app.use(express.static(distPath));

// This route handler will match all routes that are not caught by the static file server
// or the API routes defined in `createServer()`.
// It uses a regular expression to exclude routes starting with `/api/`.
app.get(/^\/(?!api).*/, (_req, res) => {
  // For any non-API request that doesn't match a static file,
  // serve the main `index.html` file of the React application.
  // This allows React Router to handle the client-side routing.
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
