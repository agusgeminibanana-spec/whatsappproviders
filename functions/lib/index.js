"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRole = exports.addDefaultRole = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
/**
 * Asigna un rol de 'user' por defecto a cada nuevo usuario que se registra.
 */
exports.addDefaultRole = functions.auth.user().onCreate(async (user) => {
    try {
        await admin.auth().setCustomUserClaims(user.uid, { role: 'user' });
        console.log(`Rol 'user' asignado a ${user.uid}`);
        return { message: `Rol 'user' asignado a ${user.email}.` };
    }
    catch (error) {
        console.error("Error al asignar rol por defecto:", error);
        throw new functions.https.HttpsError("internal", "Error al asignar rol por defecto.");
    }
});
/**
 * Función HTTPS para que un administrador asigne un rol a otro usuario.
 * El llamador DEBE ser un administrador.
 */
exports.setRole = functions.https.onCall(async (data, context) => {
    // 1. Verificar que el que llama es un administrador.
    if (context.auth?.token?.role !== 'admin') {
        throw new functions.https.HttpsError("permission-denied", "Solo los administradores pueden asignar roles.");
    }
    const { uid, newRole } = data;
    // 2. Validar que el rol sea uno de los permitidos.
    const allowedRoles = ['admin', 'user'];
    if (!allowedRoles.includes(newRole)) {
        throw new functions.https.HttpsError("invalid-argument", `El rol '${newRole}' no es válido.`);
    }
    // 3. Asignar el nuevo rol (custom claim) al usuario especificado.
    try {
        await admin.auth().setCustomUserClaims(uid, { role: newRole });
        console.log(`Rol '${newRole}' asignado a ${uid} por ${context.auth?.uid}`);
        return { result: `Rol '${newRole}' asignado correctamente.` };
    }
    catch (error) {
        console.error("Error al asignar el rol:", error);
        throw new functions.https.HttpsError("internal", "Ocurrió un error al intentar asignar el rol.");
    }
});
//# sourceMappingURL=index.js.map