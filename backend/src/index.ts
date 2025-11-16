
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { initializeFirebase } from './config/firebase.js';
import { whatsAppService } from './api/services/whatsapp.service.js';
import apiRoutes from './api/routes/index.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  const devOrigin = process.env.DEV_CLIENT_ORIGIN || 'http://localhost:9002';
  console.log(`Development mode: Enabling CORS for ${devOrigin}`);
  app.use(cors({ origin: devOrigin }));
}

initializeFirebase();
whatsAppService.init().catch(err => console.error('Error initializing WhatsApp Service:', err));

app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const clientBuildPath = path.join(__dirname, '../../dist/spa');
    
    app.use(express.static(clientBuildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
