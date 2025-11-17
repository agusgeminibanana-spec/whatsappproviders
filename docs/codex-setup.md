# Configuración rápida en Codex

Si quieres levantar este proyecto dentro de un entorno basado en Codex (el IDE web de Firebase/Google Cloud), puedes seguir estos pasos para tener el frontend y el backend listos para desarrollo.

## 1. Preparar el entorno

1. **Instala dependencias**
   ```bash
   pnpm install
   ```
   > En Codex la instalación suele ejecutarse automáticamente al abrir el proyecto, pero si ves errores de imports faltantes ejecuta el comando manualmente.

2. **Configura las variables de entorno**
   - Duplica el archivo de ejemplo y ajusta los valores mínimos:
     ```bash
     cp .env.example .env.local
     ```
   - Edita `.env.local` y define un nombre de sesión para WhatsApp (usa un identificador único):
     ```env
     WHATSAPP_SESSION=mi-crm-session
     ```
   - Si ya tienes el backend en Cloud Run, añade también la URL pública para que el frontend apunte al servicio:
     ```env
     VITE_API_BASE_URL=https://tu-backend-xxxxx-uc.a.run.app
     ```

## 2. Comandos útiles en la consola integrada

Los comandos siguientes funcionan desde el terminal de Codex:

- **Levantar todo en modo desarrollo** (instala dependencias y abre Vite en `http://localhost:9002`):
  ```bash
  bash autorun.sh
  ```

- **Solo frontend** (útil si el backend ya está desplegado en Cloud Run y configuraste `VITE_API_BASE_URL`):
  ```bash
  pnpm --filter client dev -- --host --port 9002
  ```

- **Backend local** (requiere credenciales de Google con `gcloud auth application-default login`):
  ```bash
  pnpm --filter backend dev
  ```

## 3. Consejos específicos para Codex

- **Puertos**: habilita el puerto `9002` en la vista de puertos expuestos para acceder al frontend.
- **Persistencia de sesión**: el escaneo del QR en `/qr` guarda la sesión en Firestore; no es necesario reescanear si usas la misma colección y variables.
- **Firebase CLI**: si necesitas desplegar desde Codex, inicia sesión con `firebase login` y ejecuta `firebase deploy --only hosting` para el frontend. Para el backend, usa los comandos de `gcloud` descritos en el README.

Con estos pasos deberías poder replicar localmente (o en Codex) el entorno descrito en el `README` sin configuraciones adicionales.
