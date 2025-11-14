import express from 'express';
import { initializeFirebase } from './config/firebase';
import { whatsAppService } from './api/services/whatsapp.service';
import apiRoutes from './api/routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Initialize Firebase
initializeFirebase();

// Initialize WhatsApp Service
whatsAppService.init().catch(err => console.error('Error initializing WhatsApp Service:', err));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
