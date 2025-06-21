import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import { ScreenshotService } from '../backend/screenshot.service';
import { WhatsAppService } from '../backend/whatsapp.service';


class MainProcess {
  private mainWindow: BrowserWindow | null = null;
  private screenshotService: ScreenshotService;
  private whatsAppService: WhatsAppService;

  constructor() {
    this.screenshotService = new ScreenshotService();
    this.whatsAppService = new WhatsAppService();
    this.setupApp();
  }

  private setupApp(): void {
    app.whenReady().then(() => {
      this.createWindow();
      this.setupIPC();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }

  private createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      icon: path.join(__dirname, '../assets/icon.png'),
      title: 'Screenshot WhatsApp App'
    });

    // Carrega o arquivo HTML
    this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

    // Abre DevTools em desenvolvimento
    if (process.env['NODE_ENV'] === 'development') {
      this.mainWindow.webContents.openDevTools();
    }

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }

  private setupIPC(): void {
    // Handler para capturar screenshot
    ipcMain.handle('capture-screenshot', async () => {
      try {
        const screenshot = await this.screenshotService.captureScreenshot();
        return { success: true, data: screenshot };
      } catch (error) {
        console.error('Erro ao capturar screenshot:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
      }
    });

    // Handler para enviar para WhatsApp
    ipcMain.handle('send-to-whatsapp', async (_event, imageBase64: string) => {
      try {
        const result = await this.whatsAppService.sendImageToWhatsApp(imageBase64);
        return { success: true, data: result };
      } catch (error) {
        console.error('Erro ao enviar para WhatsApp:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
      }
    });

    // Handler para mostrar diálogo de seleção de grupo
    ipcMain.handle('select-whatsapp-group', async () => {
      try {
        await dialog.showMessageBox(this.mainWindow!, {
          type: 'info',
          title: 'Selecionar Grupo',
          message: 'Por favor, selecione o grupo no WhatsApp Web que está aberto no navegador.',
          buttons: ['OK']
        });
        return { success: true };
      } catch (error) {
        return { success: false, error: 'Erro ao mostrar diálogo' };
      }
    });
  }
}

// Inicia o processo principal
new MainProcess(); 