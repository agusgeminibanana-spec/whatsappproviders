
import express from 'express';
import path from 'path';
import cors from 'cors';
import { initializeFirebase } from './config/firebase';
import { whatsAppService } from './api/services/whatsapp.service';
import apiRoutes from './api/routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode: Enabling CORS for localhost:9003');
  app.use(cors({ origin: 'http://localhost:9003' }));
}

initializeFirebase();

whatsAppService.init().catch(err => console.error('Error initializing WhatsApp Service:', err));

app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
    console.log('Production mode: Setting up static file serving.');
    // The __dirname is available in CommonJS. It's the directory of the current file.
    const clientBuildPath = path.join(__dirname, '../spa');
    
    console.log(`Serving static files from: ${clientBuildPath}`);
    app.use(express.static(clientBuildPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Backend server is running in development mode.');
    });
}

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
