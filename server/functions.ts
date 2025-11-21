import { onRequest } from "firebase-functions/v2/https";
import { createServer } from "./index";

const app = createServer();

export const webapp = onRequest({
  timeoutSeconds: 300,
  region: "us-central1",
  memory: "1GiB",
  minInstances: 1, 
  maxInstances: 10,
  concurrency: 80,
  invoker: "public",
  cors: true // Enable CORS explicitly for Cloud Functions v2
}, app);
