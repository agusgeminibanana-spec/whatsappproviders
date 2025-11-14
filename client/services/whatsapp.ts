/**
 * Servicio para interactuar con la API de WhatsApp (Baileys)
 *
 * Uso:
 *   import { whatsappService } from '@/services/whatsapp';
 *
 *   const result = await whatsappService.sendMessage('5491234567890', 'Hola!');
 */

import * as React from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/whatsapp";

interface SendMessageParams {
  phone: string;
  message: string;
  quotedMessageId?: string;
}

interface SendImageParams {
  phone: string;
  image: File;
  caption?: string;
}

interface SendMentionParams {
  phone: string;
  message: string;
  mentions: string[];
}

interface CreateGroupParams {
  name: string;
  members: string[];
}

interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  message?: string;
  data?: T;
  [key: string]: any;
}

/**
 * Verificar estado de conexión a WhatsApp
 */
export async function checkWhatsAppStatus(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    if (!response.ok) throw new Error("Error al verificar estado");
    return await response.json();
  } catch (error) {
    console.error("Error checking WhatsApp status:", error);
    throw error;
  }
}

/**
 * Enviar mensaje de texto
 */
export async function sendMessage(
  params: SendMessageParams,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al enviar mensaje");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

/**
 * Enviar imagen con caption opcional
 */
export async function sendImage(params: SendImageParams): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append("phone", params.phone);
    formData.append("image", params.image);

    if (params.caption) {
      formData.append("caption", params.caption);
    }

    const response = await fetch(`${API_BASE_URL}/send-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al enviar imagen");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending image:", error);
    throw error;
  }
}

/**
 * Enviar mensaje con menciones
 */
export async function sendMention(
  params: SendMentionParams,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/send-mention`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al enviar mención");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending mention:", error);
    throw error;
  }
}

/**
 * Crear grupo
 */
export async function createGroup(
  params: CreateGroupParams,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/create-group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al crear grupo");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}

/**
 * Actualizar asunto/nombre del grupo
 */
export async function updateGroupSubject(
  groupId: string,
  subject: string,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/update-group-subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupId, subject }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al actualizar grupo");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating group subject:", error);
    throw error;
  }
}

/**
 * Bloquear o desbloquear contacto
 */
export async function updateBlockStatus(
  phone: string,
  action: "block" | "unblock",
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/block-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, action }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al actualizar bloqueo");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating block status:", error);
    throw error;
  }
}

/**
 * Archivar o desarchivar chat
 */
export async function archiveChat(
  phone: string,
  archive: boolean = true,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/archive-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, archive }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al archivar chat");
    }

    return await response.json();
  } catch (error) {
    console.error("Error archiving chat:", error);
    throw error;
  }
}

/**
 * Eliminar mensaje
 */
export async function deleteMessage(
  phone: string,
  messageId: string,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, messageId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al eliminar mensaje");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

/**
 * Hook para usar el servicio en componentes React (opcional)
 */
export function useWhatsAppApi() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [data, setData] = React.useState<ApiResponse | null>(null);

  const execute = React.useCallback(
    async (
      apiFunction: (...args: any[]) => Promise<ApiResponse>,
      ...args: any[]
    ) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { execute, loading, error, data };
}

// Exportar como objeto para facilitar el uso
export const whatsappService = {
  checkStatus: checkWhatsAppStatus,
  sendMessage,
  sendImage,
  sendMention,
  createGroup,
  updateGroupSubject,
  blockContact: updateBlockStatus,
  archiveChat,
  deleteMessage,
};
