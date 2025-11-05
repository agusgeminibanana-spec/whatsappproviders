# 🚀 Guía Rápida - Integración WhatsApp con Baileys

## ⚡ Inicio Rápido (5 minutos)

### 1. **Instalar Dependencias**

**En Windows:**
```bash
INSTALL_BAILEYS.bat
```

**En macOS/Linux:**
```bash
bash INSTALL_BAILEYS.sh
```

**O manualmente:**
```bash
npm install @whiskeysockets/baileys @hapi/boom qrcode-terminal pino dotenv
```

### 2. **Crear archivo `.env.local`**

```bash
cp .env.example .env.local
```

Edita `.env.local`:
```env
WHATSAPP_SESSION=fusion-app
PORT=3000
LOG_LEVEL=info
```

### 3. **Iniciar el servidor**

```bash
npm run dev
```

Deberías ver un código QR en la terminal.

### 4. **Escanear QR**

1. Abre **WhatsApp** en tu teléfono
2. Ve a **Ajustes → Dispositivos vinculados**
3. **Escanea el código QR** que aparece en la terminal
4. ✅ ¡Conectado!

---

## 📡 Primeros Pasos con la API

### Enviar un mensaje

```javascript
const response = await fetch('http://localhost:3000/api/whatsapp/send-message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '5491234567890',
    message: '¡Hola desde mi app!'
  })
});

const result = await response.json();
console.log(result);
```

### Usar el servicio en React

```tsx
import { whatsappService } from '@/services/whatsapp';

export default function ChatPage() {
  const handleSend = async () => {
    try {
      const result = await whatsappService.sendMessage({
        phone: '5491234567890',
        message: 'Hola desde React!'
      });
      console.log('Mensaje enviado:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleSend}>Enviar</button>;
}
```

---

## 📚 Rutas API Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| **GET** | `/api/whatsapp/status` | Ver estado de conexión |
| **POST** | `/api/whatsapp/send-message` | Enviar texto |
| **POST** | `/api/whatsapp/send-image` | Enviar imagen |
| **POST** | `/api/whatsapp/send-mention` | Enviar con @menciones |
| **POST** | `/api/whatsapp/create-group` | Crear grupo |
| **POST** | `/api/whatsapp/update-group-subject` | Cambiar nombre grupo |
| **POST** | `/api/whatsapp/block-contact` | Bloquear contacto |
| **POST** | `/api/whatsapp/archive-chat` | Archivar chat |
| **POST** | `/api/whatsapp/delete-message` | Eliminar mensaje |

---

## 🔴 Problemas Comunes

| Problema | Solución |
|----------|----------|
| **"WhatsApp socket no inicializado"** | Escanea el código QR en la terminal |
| **"Número rechazado"** | Usa formato: `5491234567890` (sin espacios) |
| **"Conexión cerrada"** | Elimina `/auth/fusion-app` y escanea QR nuevamente |
| **QR no aparece** | Verifica que `printQRInTerminal: false` esté en `connection.js` |

---

## 📖 Documentación Completa

Para más detalles, consulta: **[WHATSAPP_INTEGRATION.md](./WHATSAPP_INTEGRATION.md)**

---

## ⚠️ Importante

- **No spam:** Usa responsablemente, WhatsApp bloquea números con uso excesivo
- **Datos privados:** Nunca commits `.env.local` o credenciales
- **Rate limit:** Implementa delays entre mensajes

---

## ✅ La app está lista para:

- ✅ Recibir mensajes (backend escucha)
- ✅ Enviar mensajes
- ✅ Enviar imágenes
- ✅ Crear/gestionar grupos
- ✅ Bloquear contactos
- ✅ Archivar chats
- ✅ Procesar menciones

**Próximo paso:** Conecta la API con tu frontend para una experiencia completa.

---

**¿Necesitas ayuda?** 📧 Revisa los logs o consulta la documentación completa.
