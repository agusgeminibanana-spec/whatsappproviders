
import { Router } from 'express';
import { whatsAppService } from '../services/whatsapp.service';

const router = Router();

// Existing route to get session status (useful for the frontend)
router.get('/whatsapp/status', async (req, res) => {
  try {
    // This part would ideally read the status from where it's stored (e.g., Firestore)
    // For now, we'll keep it simple.
    res.json({ status: 'Not implemented' }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting WhatsApp status' });
  }
});

// New route to handle logout
router.post('/whatsapp/logout', async (req, res) => {
    try {
      console.log('Received request to log out from WhatsApp.');
      await whatsAppService.logout();
      res.status(200).json({ message: 'Logout successful, new QR code is being generated.' });
    } catch (error) {
      console.error('Error during WhatsApp logout:', error);
      res.status(500).json({ message: 'Error logging out from WhatsApp' });
    }
});

export default router;
