# Integración de WhatsApp con Baileys

Guía completa para configurar y usar la integración de WhatsApp mediante Baileys en tu aplicación.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Rutas API](#rutas-api)
- [Ejemplos](#ejemplos)
- [Solución de Problemas](#solución-de-problemas)

---

## ✅ Requisitos

- **Node.js v17+** (recomendado v18 o superior)
- **npm** o **yarn**
- Una cuenta de WhatsApp activa
- Acceso a escanear códigos QR en tu dispositivo móvil

---

## 🚀 Instalación

### 1. Instalar dependencias de Baileys

Ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install @whiskeysockets/baileys @hapi/boom qrcode-terminal pino dotenv
```

#### Dependencias opcionales (para procesamiento de media)

Si necesitas procesar imágenes, videos o stickers:

```bash
npm install sharp jimp
# Para FFmpeg (videos):
# macOS: brew install ffmpeg
# Ubuntu: sudo apt-get install ffmpeg
# Windows: descargar desde https://ffmpeg.org/download.html
```

### 2. Crear archivo `.env.local` (si no existe)

```bash
cp .env.example .env.local
```

Edita `.env.local` y configura:

```env
WHATSAPP_SESSION=mi-sesion
PORT=3000
LOG_LEVEL=info
```

---

## ⚙️ Configuración

### Estructura de directorios

```
proyecto/
├── server/
│   ├── whatsapp/
│   │   ├── connection.js      # Conexión a WhatsApp
│   │   ├── routes.js          # Rutas API
│   │   └── index.js           # Exportador del módulo
│   ├── index.ts               # Servidor Express principal
│   └── routes/
│       └── whatsapp.ts        # (Opcional) rutas TypeScript
├── auth/
│   └── [nombreSesion]/        # Se crea automáticamente
│       ├── creds.json
│       ├── keys/
│       └── ...
├── .env.local                 # Variables de entorno (NO comitear)
└── .env.example               # Plantilla (comitear)
```

### Integración en server principal

Si estás usando TypeScript, crea un archivo puente en `server/routes/whatsapp.ts`:

```typescript
import { Router } from 'express';

const router = Router();

// Importar routes de CommonJS
const whatsappRoutesModule = require('../whatsapp/routes');

// Re-exportar
router.use('/', whatsappRoutesModule);

export default router;
```

Luego en `server/index.ts`:

```typescript
import whatsappRoutes from './routes/whatsapp';

// ... resto del código ...

// Registrar rutas de WhatsApp
app.use('/api/whatsapp', whatsappRoutes);

// Inicializar WhatsApp
const { startWhatsApp } = require('./whatsapp');
startWhatsApp().catch(console.error);

// ... resto del código ...
```

---

## 🔗 Uso

### Iniciar la conexión

Una vez que el servidor inicia, debería aparecer un código QR en la terminal:

```bash
npm run dev
```

**Output esperado:**
```
[INFO] Iniciando conexión a WhatsApp...
[WhatsApp mi-sesion] Escanea este código QR:

  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  █ ▄▄▄▄▄ █▀▄▀ █▀▄
  █ █   █ █  █ ██▀
  █ █▄▄▄█ █▄ █ █
  █▄▄▄▄▄▄▄█▄▀▄▀▄█
  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

[OK] Sesión WhatsApp "mi-sesion" conectada.
```

### Escanear el código QR

1. Abre WhatsApp en tu dispositivo móvil
2. Ve a **Ajustes → Dispositivos vinculados → Vincular un dispositivo**
3. Escanea el código QR que aparece en la terminal
4. ¡Listo! Ahora tu app tiene acceso a tu WhatsApp

---

## 📡 Rutas API

### 1. **GET** `/api/whatsapp/status`

Verificar estado de conexión.

**Response:**
```json
{
  "connected": true,
  "message": "Conectado a WhatsApp"
}
```

---

### 2. **POST** `/api/whatsapp/send-message`

Enviar mensaje de texto.

**Body:**
```json
{
  "phone": "12345678901",
  "message": "Hola desde la API!"
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "ABC123...",
  "message": "Mensaje enviado correctamente"
}
```

**Nota:** El número debe ser sin espacios ni caracteres especiales. Ejemplo: `5491234567890` para Argentina.

---

### 3. **POST** `/api/whatsapp/send-image`

Enviar imagen.

**Body (form-data):**
- `phone`: "12345678901"
- `caption`: "Foto de prueba" (opcional)
- `image`: [archivo]

**cURL:**
```bash
curl -X POST http://localhost:3000/api/whatsapp/send-image \
  -F "phone=12345678901" \
  -F "caption=Foto de prueba" \
  -F "image=@./foto.jpg"
```

---

### 4. **POST** `/api/whatsapp/send-mention`

Enviar mensaje con menciones.

**Body:**
```json
{
  "phone": "1234567890@g.us",
  "message": "Hola @12345678901 y @11122223333",
  "mentions": ["12345678901", "11122223333"]
}
```

---

### 5. **POST** `/api/whatsapp/create-group`

Crear grupo.

**Body:**
```json
{
  "name": "Grupo de Prueba",
  "members": ["12345678901", "11122223333"]
}
```

**Response:**
```json
{
  "success": true,
  "groupId": "123456789-1234567890@g.us",
  "groupName": "Grupo de Prueba",
  "message": "Grupo creado exitosamente"
}
```

---

### 6. **POST** `/api/whatsapp/update-group-subject`

Cambiar nombre/asunto del grupo.

**Body:**
```json
{
  "groupId": "123456789-1234567890@g.us",
  "subject": "Nuevo Nombre"
}
```

---

### 7. **POST** `/api/whatsapp/block-contact`

Bloquear o desbloquear contacto.

**Body:**
```json
{
  "phone": "12345678901",
  "action": "block"
}
```

Valores de `action`: `"block"` o `"unblock"`

---

### 8. **POST** `/api/whatsapp/archive-chat`

Archivar o desarchivar chat.

**Body:**
```json
{
  "phone": "12345678901",
  "archive": true
}
```

---

### 9. **POST** `/api/whatsapp/delete-message`

Eliminar mensaje.

**Body:**
```json
{
  "phone": "12345678901",
  "messageId": "ID_DEL_MENSAJE_A_BORRAR"
}
```

---

## 💡 Ejemplos

### Ejemplo 1: Enviar mensaje desde JavaScript

```javascript
async function enviarMensaje() {
  const response = await fetch('http://localhost:3000/api/whatsapp/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone: '5491234567890',
      message: '¡Hola! Este es un mensaje desde mi app.'
    })
  });

  const data = await response.json();
  console.log('Resultado:', data);
}
```

### Ejemplo 2: Enviar imagen

```javascript
async function enviarImagen() {
  const formData = new FormData();
  formData.append('phone', '5491234567890');
  formData.append('caption', 'Mi foto favorita');
  
  const fileInput = document.querySelector('#image-input');
  formData.append('image', fileInput.files[0]);

  const response = await fetch('http://localhost:3000/api/whatsapp/send-image', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  console.log('Resultado:', data);
}
```

### Ejemplo 3: Crear grupo

```javascript
async function crearGrupo() {
  const response = await fetch('http://localhost:3000/api/whatsapp/create-group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Equipo de Desarrollo',
      members: ['5491234567890', '5491234567891', '5491234567892']
    })
  });

  const data = await response.json();
  console.log('Grupo creado:', data.groupId);
}
```

---

## 🔧 Solución de Problemas

### "WhatsApp socket no inicializado"

**Causa:** WhatsApp no se ha conectado aún.

**Solución:**
1. Verifica que el código QR se mostró en la terminal
2. Escanea el código desde tu teléfono
3. Espera a que aparezca "[OK] Sesión WhatsApp conectada."

### "Conexión cerrada. Reconectar: true"

**Causa:** La sesión se desconectó (probablemente por inactividad).

**Solución:**
1. La app intentará reconectar automáticamente cada 5 segundos
2. Si no funciona, elimina la carpeta `/auth/[nombreSesion]` y escanea el QR nuevamente

### Número de teléfono rechazado

**Causa:** Formato incorrecto del número.

**Solución:** 
- Usa el número completo con código de país (sin +)
- Ejemplo correcto: `5491234567890`
- ❌ Incorrecto: `+54 9 1234 567890`

### No recibo mensajes entrantes

**Causa:** El listener de mensajes no está registrado.

**Solución:**
Verifica que `connection.js` tenga el listener `messages.upsert`. Puedes agregar un logger:

```javascript
whatsappSocket.ev.on('messages.upsert', async ({ messages, type }) => {
  console.log('Mensaje recibido:', messages);
  // Aquí procesar el mensaje
});
```

---

## 📚 Referencias

- [Documentación de Baileys](https://github.com/whiskeysockets/Baileys)
- [WhatsApp Web Reverse Engineering](https://github.com/sigalor/whatsapp-web-reveng)

---

## ⚠️ Advertencias Importantes

1. **Uso responsable:** No uses para spam o prácticas maliciosas
2. **Términos de servicio:** WhatsApp puede bloquear tu número si detecta uso automatizado excesivo
3. **Datos sensibles:** Nunca comitees credenciales o tokens
4. **Rate limiting:** Implementa límites de velocidad para evitar bloqueos

---

## 📝 Próximos Pasos

- [ ] Integrar WebSocket para mensajes en tiempo real
- [ ] Guardar mensajes en base de datos
- [ ] Implementar webhooks para eventos
- [ ] Agregar autenticación a las rutas API
- [ ] Crear dashboard de monitoreo

---

**¿Necesitas ayuda?** Revisa los logs en la consola o abre un issue en el repositorio.
