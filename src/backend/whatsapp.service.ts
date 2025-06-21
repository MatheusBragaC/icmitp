import axios, { AxiosResponse } from 'axios';

interface WhatsAppConfig {
  baseUrl: string;
  sessionId: string;
  groupId?: string;
}

interface SendImageResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export class WhatsAppService {
  private config: WhatsAppConfig;

  constructor() {
    this.config = {
      baseUrl: 'http://192.168.15.13:3000', // URL do seu WPPConnect
      sessionId: 'default' // Você pode alterar isso conforme necessário
    };
  }

  /**
   * Configura a sessão do WhatsApp
   * @param sessionId - ID da sessão
   */
  setSession(sessionId: string): void {
    this.config.sessionId = sessionId;
  }

  /**
   * Configura o grupo de destino
   * @param groupId - ID do grupo
   */
  setGroup(groupId: string): void {
    this.config.groupId = groupId;
  }

  /**
   * Verifica se a sessão está conectada
   * @returns Promise<boolean>
   */
  async isSessionConnected(): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.config.baseUrl}/api/${this.config.sessionId}/connection-state`
      );
      return response.data.state === 'open';
    } catch (error) {
      console.error('Erro ao verificar conexão:', error);
      return false;
    }
  }

  /**
   * Obtém a lista de grupos disponíveis
   * @returns Promise<Array>
   */
  async getGroups(): Promise<any[]> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.config.baseUrl}/api/${this.config.sessionId}/groups`
      );
      return response.data || [];
    } catch (error) {
      console.error('Erro ao obter grupos:', error);
      throw new Error('Falha ao obter lista de grupos');
    }
  }

  /**
   * Envia imagem para um grupo específico
   * @param imageBase64 - Imagem em base64
   * @param groupId - ID do grupo (opcional, usa o configurado se não fornecido)
   * @param caption - Legenda da imagem (opcional)
   * @returns Promise<SendImageResponse>
   */
  async sendImageToWhatsApp(
    imageBase64: string, 
    groupId?: string, 
    caption?: string
  ): Promise<SendImageResponse> {
    try {
      const targetGroupId = groupId || this.config.groupId;
      
      if (!targetGroupId) {
        throw new Error('ID do grupo não especificado');
      }

      console.log('Enviando imagem para WhatsApp...');

      const payload = {
        number: targetGroupId,
        base64: imageBase64,
        caption: caption || 'Screenshot capturado automaticamente',
        delay: 1000
      };

      const response: AxiosResponse = await axios.post(
        `${this.config.baseUrl}/api/${this.config.sessionId}/send-image`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Imagem enviada com sucesso:', response.data);
      
      return {
        success: true,
        message: 'Imagem enviada com sucesso para o WhatsApp'
      };

    } catch (error) {
      console.error('Erro ao enviar imagem para WhatsApp:', error);
      
      let errorMessage = 'Erro desconhecido';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: `Falha ao enviar imagem: ${errorMessage}`
      };
    }
  }

  /**
   * Envia mensagem de texto para um grupo
   * @param message - Mensagem a ser enviada
   * @param groupId - ID do grupo (opcional)
   * @returns Promise<SendImageResponse>
   */
  async sendTextMessage(message: string, groupId?: string): Promise<SendImageResponse> {
    try {
      const targetGroupId = groupId || this.config.groupId;
      
      if (!targetGroupId) {
        throw new Error('ID do grupo não especificado');
      }

      const payload = {
        number: targetGroupId,
        text: message
      };

      await axios.post(
        `${this.config.baseUrl}/api/${this.config.sessionId}/send-text`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        message: 'Mensagem enviada com sucesso'
      };

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      let errorMessage = 'Erro desconhecido';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: `Falha ao enviar mensagem: ${errorMessage}`
      };
    }
  }

  /**
   * Testa a conexão com o WPPConnect
   * @returns Promise<boolean>
   */
  async testConnection(): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.get(`${this.config.baseUrl}/api/status`);
      return response.status === 200;
    } catch (error) {
      console.error('Erro ao testar conexão com WPPConnect:', error);
      return false;
    }
  }
} 