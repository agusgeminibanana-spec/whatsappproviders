/**
 * Archivo: server/whatsapp/routes.js
 * 
 * Descripción:
 *   Rutas API para interactuar con WhatsApp (Baileys)
 *   Incluye envío de mensajes, obtener contactos, etc.
 */

const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { getSocket, isConnected } = require('./connection');

const router = Router();

/**
 * GET /api/whatsapp/status
 * Obtener estado de conexión
 */
router.get('/status', (req, res) => {
  try {
    const connected = isConnected();
    res.json({
      connected,
      message: connected ? 'Conectado a WhatsApp' : 'Desconectado'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/whatsapp/send-message
 * Enviar mensaje de texto
 * 
 * Body:
 *   {
 *     "phone": "12345678901",
 *     "message": "Texto del mensaje",
 *     "quotedMessageId": "ID_DEL_MENSAJE_A_CITAR" (opcional)
 *   }
 */
router.post('/send-message', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(503).json({ error: 'WhatsApp no está conectado' });
    }

    const { phone, message, quotedMessageId } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: 'phone y message son requeridos' });
    }

    const socket = getSocket();
    const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;

    // Construir objeto de mensaje
    const messageData = { text: message };
    const messageOptions = {};

    // Si hay messageId citado, agregarlo
    if (quotedMessageId) {
      messageOptions.quoted = { key: { id: quotedMessageId } };
    }

    // Enviar
    const response = await socket.sendMessage(jid, messageData, messageOptions);

    res.json({
      success: true,
      messageId: response.key.id,
      message: 'Mensaje enviado correctamente'
    });

  } catch (error) {
    console.error('[ERROR] Error al enviar mensaje:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/whatsapp/send-image
 * Enviar imagen
 * 
 * Body (form-data):
 *   - "phone": "12345678901"
 *   - "caption": "Texto descriptivo" (opcional)
 *   - "image": archivo
 */
router.post('/send-image', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(503).json({ error: 'WhatsApp no está conectado' });
    }

    const { phone, caption } = req.body;
    const imageFile = req.files?.image;

    if (!phone || !imageFile) {
      return res.status(400).json({ error: 'phone e image son requeridos' });
    }

    const socket = getSocket();
    const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;

    const imageData = imageFile.data;
    const messageData = {
      image: imageData,
      ...(caption && { caption })
    };

    const response = await socket.sendMessage(jid, messageData);

    res.json({
      success: true,
      messageId: response.key.id,
      message: 'Imagen enviada correctamente'
    });

  } catch (error) {
    console.error('[ERROR] Error al enviar imagen:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/whatsapp/send-mention
 * Enviar mensaje con menciones
 * 
 * Body:
 *   {
 *     "phone": "12345678901",
 *     "message": "Hola @1234567890 y @0987654321",
 *     "mentions": ["1234567890", "0987654321"]
 *   }
 */
router.post('/send-mention', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(503).json({ error: 'WhatsApp no está conectado' });
    }

    const { phone, message, mentions } = req.body;

    if (!phone || !message || !mentions || mentions.length === 0) {
      return res.status(400).json({ error: 'phone, message y mentions son requeridos' });
    }

    const socket = getSocket();
    const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;

    const mentionedJids = mentions.map(m => 
      m.includes('@') ? m : `${m}@s.whatsapp.net`
    );

    const messageData = {
      text: message,
      mentions: mentionedJids
    };

    const response = await socket.sendMessage(jid, messageData);

    res.json({
      success: true,
      messageId: response.key.id,
      message: 'Mensaje con menciones enviado'
    });

  } catch (error) {
    console.error('[ERROR] Error al enviar mención:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/whatsapp/create-group
 * Crear grupo
 * 
 * Body:
 *   {
 *     "name": "Nombre del Grupo",
 *     "members": ["1234567890", "0987654321"]
 *   }
 */
router.post('/create-group', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(503).json({ error: 'WhatsApp no está conectado' });
    }

    const { name, members } = req.body;

    if (!name || !members || members.length === 0) {
      return res.status(400).json({ error: 'name y members son requeridos' });
    }

    const socket = getSocket();
    const memberJids = members.map(m =>
      m.includes('@') ? m : `${m}@s.whatsapp.net`
    );

    const group = await socket.groupCreate(name, memberJids);

    res.json({
      success: true,
      groupId: group.id,
      groupName: name,
      message: 'Grupo creado exitosamente'
    });

  } catch (error) {
    console.error('[ERROR] Error al crear grupo:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/whatsapp/update-group-subject
 * Actualizar asunto del grupo
 * 
 * Body:
 *   {
 *     "groupId": "grupo@g.us",
 *     "subject": "Nuevo asunto"
 *   }
 */
router.post('/update-group-subject', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(503).json({ error: 'WhatsApp no está conectado' });
    }

    const { groupId, subject } = req.body;

    if (!groupId || !subject) {
      return res.status(400).json({ error: 'groupId y subject son requeridos' });
    }

    const socket = getSocket();
    await socket.groupUpdateSubject(groupId, subject);

    res.json({
      success: true,
      message: 'Asunto del grupo actualizado'
    });

  } catch (error) {
    console.error('[ERROR] Error al actualizar grupo:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/whatsapp/block-contact
 * Bloquear contacto
 * 
 * Body:
 *   {
 *     "phone": "12345678901",
 *     "action": "block" | "unblock"
 *   }
 */
router.post('/block-contact', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(503).json({ error: 'WhatsApp no está conectado' });
    }

    const { phone, action = 'block' } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'phone es requerido' });
    }

    const socket = getSocket();
    const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;

    await socket.updateBlockStatus(jid, action);

    res.json({
      success: true,
      message: `Contacto ${action === 'block' ? 'bloqueado' : 'desbloqueado'}`
    });

  } catch (error) {
    console.error('[ERROR] Error al bloquear contacto:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/whatsapp/archive-chat
 * Archivar o desarchivar chat
 * 
 * Body:
 *   {
 *     "phone": "12345678901",
 *     "archive": true | false
 *   }
 */
router.post('/archive-chat', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(503).json({ error: 'WhatsApp no está conectado' });
    }

    const { phone, archive = true } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'phone es requerido' });
    }

    const socket = getSocket();
    const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;

    await socket.chatModify({ archive }, jid);

    res.json({
      success: true,
      message: archive ? 'Chat archivado' : 'Chat desarchivado'
    });

  } catch (error) {
    console.error('[ERROR] Error al archivar chat:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/whatsapp/delete-message
 * Borrar mensaje
 * 
 * Body:
 *   {
 *     "phone": "12345678901",
 *     "messageId": "ID_DEL_MENSAJE"
 *   }
 */
router.post('/delete-message', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(503).json({ error: 'WhatsApp no está conectado' });
    }

    const { phone, messageId } = req.body;

    if (!phone || !messageId) {
      return res.status(400).json({ error: 'phone y messageId son requeridos' });
    }

    const socket = getSocket();
    const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;

    await socket.sendMessage(jid, {
      delete: {
        id: messageId,
        fromMe: true
      }
    });

    res.json({
      success: true,
      message: 'Mensaje eliminado'
    });

  } catch (error) {
    console.error('[ERROR] Error al eliminar mensaje:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
