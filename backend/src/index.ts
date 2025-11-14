
import express from 'express';
import path from 'path';
import cors from 'cors';
import { initializeFirebase } from './config/firebase';
import { whatsAppService } from './api/services/whatsapp.service';
import apiRoutes from './api/routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// In development, we need CORS to allow requests from the Vite dev server (on port 9003)
if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode: Enabling CORS for localhost:9003');
  app.use(cors({ origin: 'http://localhost:9003' }));
}

// Initialize Firebase
initializeFirebase();

// Initialize WhatsApp Service to generate the QR code
// ATENTION: Temporarily commented out to allow deployment.
// whatsAppService.init().catch(err => console.error('Error initializing WhatsApp Service:', err));

// API routes are used in both dev and prod
app.use('/api', apiRoutes);

// --- Static file serving for PRODUCTION ONLY ---
if (process.env.NODE_ENV === 'production') {
    console.log('Production mode: Setting up static file serving.');
    const clientBuildPath = path.join(__dirname, '../spa');
    
    console.log(`Serving static files from: ${clientBuildPath}`);
    app.use(express.static(clientBuildPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
} else {
    // Simple root route for development to confirm the server is running
    app.get('/', (req, res) => {
        res.send('Backend server is running in development mode.');
    });
}

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
