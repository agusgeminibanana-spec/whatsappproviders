
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * Asigna un rol de 'user' por defecto a cada nuevo usuario que se registra.
 */
export const addDefaultRole = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.auth().setCustomUserClaims(user.uid, { role: 'user' });
    console.log(`Rol 'user' asignado a ${user.uid}`);
    return { message: `Rol 'user' asignado a ${user.email}.` };
  } catch (error) {
    console.error("Error al asignar rol por defecto:", error);
    throw new functions.https.HttpsError("internal", "Error al asignar rol por defecto.");
  }
});

/**
 * Función HTTPS para que un administrador asigne un rol a otro usuario.
 * El llamador DEBE ser un administrador.
 */
export const setRole = functions.https.onCall(async (data, context) => {
  // 1. Verificar que el que llama es un administrador.
  if (context.auth?.token?.role !== 'admin') {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Solo los administradores pueden asignar roles."
    );
  }

  const { uid, newRole } = data;

  // 2. Validar que el rol sea uno de los permitidos.
  const allowedRoles = ['admin', 'user'];
  if (!allowedRoles.includes(newRole)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `El rol '${newRole}' no es válido.`
    );
  }

  // 3. Asignar el nuevo rol (custom claim) al usuario especificado.
  try {
    await admin.auth().setCustomUserClaims(uid, { role: newRole });
    console.log(`Rol '${newRole}' asignado a ${uid} por ${context.auth?.uid}`);
    return { result: `Rol '${newRole}' asignado correctamente.` };
  } catch (error) {
    console.error("Error al asignar el rol:", error);
    throw new functions.https.HttpsError("internal", "Ocurrió un error al intentar asignar el rol.");
  }
});
