# Protocolo de Autenticación Encadenada (Google + WhatsApp)

Este proyecto usa un flujo obligatorio de tres páginas en el orden exacto:

1. client/pages/Login.tsx
2. client/pages/QR.tsx
3. client/pages/ChatList.tsx

No se permite saltar ninguna etapa y las redirecciones deben ser inmediatas.

---

## 1. Reglas del flujo

### Login.tsx (Google)
- Si NO hay sesión de Google → mostrar Login.
- Si SÍ hay sesión de Google → redirigir a QR.

### QR.tsx (vincular WhatsApp)
- Requiere sesión de Google.
- Si NO hay sesión de WhatsApp → mostrar el QR.
- Si SÍ hay sesión de WhatsApp → redirigir a ChatList.

### ChatList.tsx (acceso final)
- Solo entrar si:
- authGoogle = true
- authWhatsapp = true
- De lo contrario:
- Sin Google → regresar a Login.
- Sin WhatsApp → regresar a QR.

---

## 2. Lógica global (route guard)

if (!authGoogle) → /login if (authGoogle && !authWhatsapp) → /qr if (authGoogle && authWhatsapp) → /chatlist

Esta lógica aplica siempre:
- Al abrir la app
- Al recargar
- Al navegar
- En nuevas pestañas
- Si expira una sesión

---

## 3. Logout

### Logout de Google
- signOut de Firebase Auth
- limpiar estados locales
- cerrar sesión de WhatsApp
- redirigir a /login

### Logout de WhatsApp (definitivo)
- llamar a POST /whatsapp/logout
- borrar sesión Baileys
- eliminar datos en Firebase (Firestore, Storage, RTDB, caches)
- authWhatsapp = false
- redirigir a /qr
- generar nuevo QR limpio

---

## 4. Estados necesarios

authGoogle: boolean authWhatsapp: boolean

---

## 5. Orden obligatorio del sistema

Login.tsx → QR.tsx → ChatList.tsx

Sin excepciones.
Redirecciones instantáneas.
Sin pantallas inútiles.