import screenshot from 'screenshot-desktop';

export class ScreenshotService {
  /**
   * Captura um screenshot da tela principal
   * @returns Promise<string> - Base64 da imagem capturada
   */
  async captureScreenshot(): Promise<string> {
    try {
      console.log('Iniciando captura de screenshot...');
      
      // Captura o screenshot
      const imgBuffer = await screenshot();
      
      // Converte para base64
      const base64Image = imgBuffer.toString('base64');
      
      console.log('Screenshot capturado com sucesso');
      return base64Image;
    } catch (error) {
      console.error('Erro ao capturar screenshot:', error);
      throw new Error(`Falha ao capturar screenshot: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  /**
   * Captura screenshot de uma tela específica (se houver múltiplas telas)
   * @param screenIndex - Índice da tela (0 = tela principal)
   * @returns Promise<string> - Base64 da imagem capturada
   */
  async captureScreenshotFromScreen(screenIndex: number = 0): Promise<string> {
    try {
      console.log(`Capturando screenshot da tela ${screenIndex}...`);
      
      // Captura o screenshot da tela específica
      const imgBuffer = await screenshot({ screen: screenIndex });
      
      // Converte para base64
      const base64Image = imgBuffer.toString('base64');
      
      console.log(`Screenshot da tela ${screenIndex} capturado com sucesso`);
      return base64Image;
    } catch (error) {
      console.error(`Erro ao capturar screenshot da tela ${screenIndex}:`, error);
      throw new Error(`Falha ao capturar screenshot da tela ${screenIndex}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  /**
   * Obtém informações sobre as telas disponíveis
   * @returns Promise<Array> - Lista de telas disponíveis
   */
  async getScreensInfo(): Promise<any[]> {
    try {
      // Esta funcionalidade pode variar dependendo da biblioteca
      // Por enquanto, retornamos uma lista básica
      return [
        { id: 0, name: 'Tela Principal' },
        { id: 1, name: 'Tela Secundária' }
      ];
    } catch (error) {
      console.error('Erro ao obter informações das telas:', error);
      return [];
    }
  }
} 