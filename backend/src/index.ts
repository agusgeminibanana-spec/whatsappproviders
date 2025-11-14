
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeFirebase } from './config/firebase';
import { whatsAppService } from './api/services/whatsapp.service';
import apiRoutes from './api/routes';

const app = express();
const port = process.env.PORT || 8080; // Use PORT from environment for cloud deployment

app.use(express.json());

// Initialize Firebase
initializeFirebase();

// Initialize WhatsApp Service
// We will not initialize it here for production, as it should be triggered by API calls or another mechanism
// whatsAppService.init().catch(err => console.error('Error initializing WhatsApp Service:', err));

// API routes
app.use('/api', apiRoutes);

// --- Static file serving ---
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the path to the front-end build directory.
// In the compiled JS file, __dirname will be '.../dist/server', so we go up one level.
const clientBuildPath = path.join(__dirname, '../spa');

// Serve static files from the React app build directory
app.use(express.static(clientBuildPath));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
// --- End of static file serving ---

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
