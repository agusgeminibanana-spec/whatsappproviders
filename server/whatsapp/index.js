/**
 * Archivo: server/whatsapp/index.js
 *
 * Descripción:
 *   Inicializador del módulo WhatsApp con Baileys
 *   Exporta funciones y rutas necesarias
 */

const {
  initializeWhatsApp,
  getSocket,
  isConnected,
  closeConnection,
} = require("./connection");
const whatsappRoutes = require("./routes");

/**
 * Inicializar WhatsApp cuando el servidor inicia
 */
async function startWhatsApp() {
  try {
    console.log("[INFO] Iniciando conexión a WhatsApp...");
    await initializeWhatsApp();
    console.log("[OK] Módulo WhatsApp inicializado");
  } catch (error) {
    console.error("[ERROR] Error al inicializar WhatsApp:", error);
    // No detener el servidor si WhatsApp falla, permitir reconexión manual
  }
}

module.exports = {
  startWhatsApp,
  getSocket,
  isConnected,
  closeConnection,
  whatsappRoutes,
};
