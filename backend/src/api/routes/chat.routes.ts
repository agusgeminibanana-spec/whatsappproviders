
import { Router } from 'express';
import { chatService } from '../services/chat.service.js';

const router = Router();

router.post('/send', async (req, res) => {
  const { chatId, text } = req.body;

  if (!chatId || !text) {
    return res.status(400).send({ error: 'chatId and text are required' });
  }

  try {
    await chatService.sendMessage(chatId, text);
    res.status(200).send({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ error: 'Failed to send message' });
  }
});

export default router;
