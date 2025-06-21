import { contextBridge, ipcRenderer } from 'electron';

// Expõe APIs seguras para o processo renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Captura screenshot
  captureScreenshot: () => ipcRenderer.invoke('capture-screenshot'),
  
  // Envia para WhatsApp
  sendToWhatsApp: (imageBase64: string) => ipcRenderer.invoke('send-to-whatsapp', imageBase64),
  
  // Seleciona grupo WhatsApp
  selectWhatsAppGroup: () => ipcRenderer.invoke('select-whatsapp-group'),
  
  // Notificações
  showNotification: (title: string, body: string) => {
    new Notification(title, { body, icon: '/assets/icon.png' });
  }
});

// Tipos para TypeScript
declare global {
  interface Window {
    electronAPI: {
      captureScreenshot: () => Promise<{ success: boolean; data?: string; error?: string }>;
      sendToWhatsApp: (imageBase64: string) => Promise<{ success: boolean; data?: any; error?: string }>;
      selectWhatsAppGroup: () => Promise<{ success: boolean; error?: string }>;
      showNotification: (title: string, body: string, type: 'success' | 'error' | 'info') => void;
    };
  }
} 