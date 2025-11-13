# Fusion App - WhatsApp CRM

Esta es una aplicación full-stack para conectar y gestionar conversaciones de WhatsApp, diseñada para ser desplegada en un entorno de nube moderno utilizando Google Cloud.

## Arquitectura

*   **Frontend:** React (Vite) - Desplegado en **Firebase Hosting**.
*   **Backend:** Node.js (Express) con Baileys - Desplegado en **Cloud Run**.
*   **Base de Datos:** Firestore - Para persistir el estado de la sesión de WhatsApp (QR, conexión, etc.).

---

## Requisitos Previos

1.  **Node.js** (versión 20 o superior)
2.  **pnpm** (puedes instalarlo con `npm install -g pnpm`)
3.  **Cuenta de Google Cloud** con un proyecto de Firebase creado.
4.  **CLI de Google Cloud (gcloud)** y **CLI de Firebase** instaladas y configuradas.

---

## 1. Configuración del Entorno

### a. Backend (Cloud Run & Firebase)

1.  **Habilita las APIs:**
    *   En tu proyecto de Google Cloud, asegúrate de que las APIs de **Cloud Run**, **Firestore** y **Cloud Build** estén habilitadas.

2.  **Configura las Credenciales:**
    *   Esta aplicación utiliza **Credenciales por Defecto de la Aplicación (ADC)**. Para el desarrollo local, ejecuta:
        ```bash
        gcloud auth application-default login
        ```
    *   Para el despliegue en Cloud Run, el servicio usará automáticamente la cuenta de servicio del entorno, por lo que no se necesita configuración adicional.

3.  **Crea el archivo `.env.local`:**
    *   Copia el archivo de ejemplo:
        ```bash
        cp .env.example .env.local
        ```
    *   Edita el archivo `.env.local` y asigna un nombre único a tu sesión de WhatsApp:
        ```env
        WHATSAPP_SESSION=mi-crm-session
        ```

### b. Frontend (Firebase Hosting)

1.  **Inicializa Firebase:**
    *   Si es la primera vez que configuras Firebase en este proyecto, ejecuta:
        ```bash
        firebase init hosting
        ```
    *   **Directorio público:** `dist/spa`
    *   **Configurar como single-page app:** `Yes`
    *   Esto creará el archivo `firebase.json` necesario.

---

## 2. Desarrollo Local

Para instalar dependencias y ejecutar la aplicación en tu máquina local, puedes usar el script de autorun.

```bash
bash autorun.sh
```

Esto hará dos cosas:
1.  Instalará todas las dependencias con `pnpm install`.
2.  Iniciará el servidor de desarrollo de Vite en `http://localhost:8080`.

La primera vez que lo ejecutes, navega a `http://localhost:8080/qr` para escanear el código QR y conectar tu cuenta de WhatsApp. La sesión se guardará en Firestore.

---

## 3. Despliegue en la Nube

### a. Desplegar el Backend en Cloud Run

1.  **Construir la Imagen del Contenedor:**
    *   Cloud Build puede construir y subir la imagen de tu contenedor automáticamente. Ejecuta el siguiente comando desde la raíz del proyecto:
        ```bash
        gcloud builds submit --tag gcr.io/TU_PROJECT_ID/fusion-app-backend
        ```
    *   Reemplaza `TU_PROJECT_ID` con el ID de tu proyecto de Google Cloud.

2.  **Desplegar en Cloud Run:**
    *   Usa el siguiente comando para desplegar la imagen que acabas de construir:
        ```bash
        gcloud run deploy fusion-app-backend \
          --image gcr.io/TU_PROJECT_ID/fusion-app-backend \
          --platform managed \
          --region TU_REGION \
          --allow-unauthenticated \
          --set-env-vars="WHATSAPP_SESSION=mi-crm-session"
        ```
    *   Reemplaza `TU_PROJECT_ID` y `TU_REGION` (ej. `us-central1`).
    *   Al finalizar, Cloud Run te dará una **URL del servicio backend**.

### b. Desplegar el Frontend en Firebase Hosting

1.  **Configurar la URL del Backend:**
    *   Antes de construir el frontend, necesitas decirle dónde está tu backend. Crea un archivo `.env.local` en la raíz del proyecto si aún no lo tienes, y añade la URL de tu servicio de Cloud Run:
        ```env
        VITE_API_BASE_URL=URL_DE_TU_BACKEND_DE_CLOUD_RUN
        ```
    *   **Importante:** Asegúrate de que las peticiones del frontend al backend no empiecen con `/api/`, sino con esta variable de entorno. *Nota: Este paso puede requerir refactorizar las llamadas `fetch` en el código del frontend.*

2.  **Construir y Desplegar:**
    *   Construye el frontend para producción:
        ```bash
        pnpm build
        ```
    *   Despliega en Firebase Hosting:
        ```bash
        firebase deploy --only hosting
        ```

Al finalizar, Firebase te dará la URL pública de tu aplicación.
