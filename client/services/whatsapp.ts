/**
 * Servicio para interactuar con la API de WhatsApp (Baileys)
 */

// Use relative path so it works with Vite proxy (dev) and Firebase rewrites (prod)
const API_BASE_URL = '/api/whatsapp';

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

export async function checkWhatsAppStatus(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    // Handle non-JSON responses (like 404 HTML or 500 HTML)
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
         throw new Error(`Invalid server response: ${response.status}`);
    }
    if (!response.ok) throw new Error('Error checking status');
    return await response.json();
  } catch (error) {
    console.error('Error checking WhatsApp status:', error);
    throw error;
  }
}

export async function sendMessage(params: SendMessageParams): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
         const text = await response.text();
         console.error("Server returned non-JSON:", text);
         throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Error sending message');
    }

    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function sendImage(params: SendImageParams): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append('phone', params.phone);
    formData.append('image', params.image);
    
    if (params.caption) {
      formData.append('caption', params.caption);
    }

    const response = await fetch(`${API_BASE_URL}/send-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error sending image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending image:', error);
    throw error;
  }
}

export const whatsappService = {
  checkStatus: checkWhatsAppStatus,
  sendMessage,
  sendImage,
};
