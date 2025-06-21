export interface AppConfig {
  whatsapp: {
    baseUrl: string;
    sessionId: string;
    defaultGroupId?: string;
    timeout: number;
  };
  screenshot: {
    format: 'png' | 'jpg';
    quality: number;
    delay: number;
  };
  app: {
    name: string;
    version: string;
    window: {
      width: number;
      height: number;
      minWidth: number;
      minHeight: number;
    };
  };
  notifications: {
    enabled: boolean;
    duration: number;
  };
}

export const defaultConfig: AppConfig = {
  whatsapp: {
    baseUrl: 'http://192.168.15.13:3000',
    sessionId: 'default',
    timeout: 30000, // 30 segundos
  },
  screenshot: {
    format: 'png',
    quality: 90,
    delay: 1000, // 1 segundo de delay antes da captura
  },
  app: {
    name: 'Screenshot WhatsApp App',
    version: '1.0.0',
    window: {
      width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 400,
    },
  },
  notifications: {
    enabled: true,
    duration: 5000, // 5 segundos
  },
};

export class ConfigManager {
  private config: AppConfig;

  constructor() {
    this.config = { ...defaultConfig };
    this.loadConfig();
  }

  private loadConfig(): void {
    try {
      // Aqui você pode carregar configurações de um arquivo
      // Por enquanto, usamos as configurações padrão
      console.log('Configurações carregadas:', this.config);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  }

  getConfig(): AppConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }

  private saveConfig(): void {
    try {
      // Aqui você pode salvar as configurações em um arquivo
      console.log('Configurações salvas:', this.config);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  }

  getWhatsAppConfig() {
    return this.config.whatsapp;
  }

  getScreenshotConfig() {
    return this.config.screenshot;
  }

  getAppConfig() {
    return this.config.app;
  }

  getNotificationConfig() {
    return this.config.notifications;
  }
}

// Instância global do gerenciador de configurações
export const configManager = new ConfigManager(); 