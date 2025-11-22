# WhatsApp Web Clone con Firebase y Baileys

Este proyecto es una aplicación web full-stack que clona funcionalidades clave de WhatsApp Web, construida con React, Express (dentro de Firebase Cloud Functions), y la librería Baileys para la conexión con WhatsApp. La aplicación está diseñada para ser desplegada en Firebase (Hosting + Functions).

## Stack Tecnológico

- **Frontend**: React 18, React Router 6, TypeScript, Vite, TailwindCSS (con shadcn/ui).
- **Backend**: Node.js, Express, desplegado como una Firebase Cloud Function v2.
- **Conexión WhatsApp**: `@whiskeysockets/baileys`.
- **Base de Datos**: Firestore para persistencia de sesión de WhatsApp y almacenamiento de chats/mensajes.
- **Autenticación**: Firebase Authentication (Google Sign-In).
- **PWA**: `vite-plugin-pwa` para una experiencia instalable en móviles.

## Arquitectura

La aplicación sigue una arquitectura serverless desacoplada:

1.  **Frontend (Firebase Hosting)**: Una Single Page Application (SPA) construida con React y Vite. Se encarga de toda la interfaz de usuario y se comunica con el backend a través de una API REST.
2.  **Backend (Firebase Cloud Functions)**: Un servidor Express envuelto en una Cloud Function de 2da generación (`onRequest`). Esta función expone endpoints `/api/...` que el frontend consume.
    -   **Persistencia**: Se configuró con `minInstances: 1` para mantener al menos una instancia activa, garantizando que el socket de Baileys permanezca conectado.
    -   **API**: Provee endpoints para:
        -   `/status`: Verificar el estado de la conexión de WhatsApp y obtener el QR.
        -   `/chats`: Listar las conversaciones.
        -   `/chats/:id/messages`: Obtener el historial de un chat.
        -   `/send-message`, `/send-image`: Enviar mensajes.
3.  **Firestore**: Se usa como base de datos principal para:
    -   **Sesión de WhatsApp**: Guarda las credenciales de autenticación en la colección `whatsapp_auth`, permitiendo que la sesión sobreviva a reinicios de la Cloud Function.
    -   **Chats y Mensajes**: Almacena todas las conversaciones en `whatsapp_chats`, permitiendo un historial persistente.
    -   **CRM**: Guarda los contactos en la colección `contacts`.

## Configuración del Entorno Local

1.  **Clonar el repositorio.**
2.  **Instalar dependencias**:
    ```bash
    npm install
    cd server
    npm install
    cd ..
    ```
3.  **Configurar Firebase (Cliente)**:
    -   Asegúrate de que el archivo `client/firebase.ts` contenga tu `firebaseConfig` correcta.
4.  **Configurar Firebase (Backend)**:
    -   El backend (`firebase-admin`) se autentica automáticamente en el entorno de Cloud Functions. Para desarrollo local, asegúrate de tener credenciales de Google configuradas en tu entorno (ej. ejecutando `gcloud auth application-default login`).
5.  **Vincular proyecto de Firebase**:
    -   Ejecuta `firebase use [TU_PROJECT_ID]` para vincular el directorio con tu proyecto.

## Comandos

-   **Desarrollo Local**: Inicia el frontend de Vite con el backend de Express integrado como middleware.
    ```bash
    npm run dev
    ```
-   **Build para Producción**: Compila tanto el cliente como el servidor.
    ```bash
    npm run build
    ```
-   **Despliegue a Firebase**: Despliega el frontend a Hosting y el backend a Cloud Functions.
    ```bash
    firebase deploy
    ```

## Flujo de la Aplicación

1.  **Login**: El usuario se autentica con Firebase Authentication (Google).
2.  **Conexión QR**: La app verifica el estado de la conexión de WhatsApp. Si no hay sesión, muestra un QR que se obtiene del backend. El QR se guarda en Firestore para persistencia.
3.  **Chat**: Una vez conectado, el usuario ve la lista de chats, que se carga desde Firestore. Puede seleccionar un chat, ver el historial y enviar/recibir mensajes en tiempo real.
4.  **Persistencia**: La sesión se mantiene activa gracias a `minInstances: 1` y las credenciales en Firestore, sobreviviendo a despliegues y reinicios.
