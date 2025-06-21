class ScreenshotApp {
    constructor() {
        this.currentScreenshot = null;
        this.isProcessing = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateConnectionStatus();
        this.addLogEntry('Aplicativo iniciado com sucesso', 'info');
    }

    setupEventListeners() {
        // Botão principal de captura e envio
        const captureBtn = document.getElementById('capture-btn');
        captureBtn.addEventListener('click', () => this.handleCaptureAndSend());

        // Botão de seleção de grupo
        const selectGroupBtn = document.getElementById('select-group-btn');
        selectGroupBtn.addEventListener('click', () => this.handleSelectGroup());

        // Campos de configuração
        const groupIdInput = document.getElementById('group-id');
        const captionInput = document.getElementById('image-caption');

        // Salvar configurações quando alteradas
        groupIdInput.addEventListener('change', () => {
            localStorage.setItem('whatsapp-group-id', groupIdInput.value);
        });

        captionInput.addEventListener('change', () => {
            localStorage.setItem('image-caption', captionInput.value);
        });

        // Carregar configurações salvas
        this.loadSavedSettings();
    }

    loadSavedSettings() {
        const groupId = localStorage.getItem('whatsapp-group-id');
        const caption = localStorage.getItem('image-caption');

        if (groupId) {
            document.getElementById('group-id').value = groupId;
        }

        if (caption) {
            document.getElementById('image-caption').value = caption;
        }
    }

    async handleCaptureAndSend() {
        if (this.isProcessing) {
            this.showNotification('Aguarde, processamento em andamento...', 'warning');
            return;
        }

        this.isProcessing = true;
        this.showLoading('Capturando screenshot...');

        try {
            // Captura o screenshot
            this.addLogEntry('Iniciando captura de screenshot...', 'info');
            const screenshotResult = await window.electronAPI.captureScreenshot();

            if (!screenshotResult.success) {
                throw new Error(screenshotResult.error);
            }

            this.currentScreenshot = screenshotResult.data;
            this.updateImagePreview(this.currentScreenshot);
            this.addLogEntry('Screenshot capturado com sucesso', 'success');

            // Envia para WhatsApp
            this.updateLoadingText('Enviando para WhatsApp...');
            this.addLogEntry('Enviando imagem para WhatsApp...', 'info');

            const groupId = document.getElementById('group-id').value;
            const caption = document.getElementById('image-caption').value;

            if (!groupId) {
                throw new Error('ID do grupo não especificado. Por favor, configure o grupo primeiro.');
            }

            const sendResult = await window.electronAPI.sendToWhatsApp(this.currentScreenshot);

            if (!sendResult.success) {
                throw new Error(sendResult.error);
            }

            this.addLogEntry('Imagem enviada com sucesso para o WhatsApp!', 'success');
            this.showNotification('Screenshot enviado com sucesso!', 'success');

        } catch (error) {
            console.error('Erro no processo:', error);
            this.addLogEntry(`Erro: ${error.message}`, 'error');
            this.showNotification(`Erro: ${error.message}`, 'error');
        } finally {
            this.hideLoading();
            this.isProcessing = false;
        }
    }

    async handleSelectGroup() {
        try {
            this.addLogEntry('Abrindo seletor de grupo...', 'info');
            const result = await window.electronAPI.selectWhatsAppGroup();
            
            if (result.success) {
                this.addLogEntry('Por favor, selecione o grupo no WhatsApp Web', 'info');
                this.showNotification('Selecione o grupo no WhatsApp Web que está aberto', 'info');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            this.addLogEntry(`Erro ao abrir seletor: ${error.message}`, 'error');
            this.showNotification(`Erro: ${error.message}`, 'error');
        }
    }

    updateImagePreview(base64Image) {
        const preview = document.getElementById('image-preview');
        const placeholder = preview.querySelector('.placeholder');

        if (placeholder) {
            placeholder.remove();
        }

        // Remove imagem anterior se existir
        const existingImg = preview.querySelector('img');
        if (existingImg) {
            existingImg.remove();
        }

        // Cria nova imagem
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${base64Image}`;
        img.alt = 'Screenshot capturado';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '8px';

        preview.appendChild(img);
    }

    addLogEntry(message, type = 'info') {
        const logContainer = document.getElementById('activity-log');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;

        const icon = document.createElement('i');
        icon.className = this.getIconClass(type);

        const text = document.createElement('span');
        text.textContent = message;

        logEntry.appendChild(icon);
        logEntry.appendChild(text);

        // Adiciona timestamp
        const timestamp = new Date().toLocaleTimeString();
        const timeSpan = document.createElement('span');
        timeSpan.textContent = ` [${timestamp}]`;
        timeSpan.style.opacity = '0.7';
        timeSpan.style.fontSize = '0.8em';
        logEntry.appendChild(timeSpan);

        logContainer.appendChild(logEntry);

        // Auto-scroll para o final
        logContainer.scrollTop = logContainer.scrollHeight;

        // Limita o número de entradas (máximo 50)
        const entries = logContainer.querySelectorAll('.log-entry');
        if (entries.length > 50) {
            entries[0].remove();
        }
    }

    getIconClass(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    showLoading(text = 'Processando...') {
        const overlay = document.getElementById('loading-overlay');
        const loadingText = document.getElementById('loading-text');
        
        loadingText.textContent = text;
        overlay.classList.remove('hidden');
    }

    updateLoadingText(text) {
        const loadingText = document.getElementById('loading-text');
        loadingText.textContent = text;
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        overlay.classList.add('hidden');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        const notificationIcon = document.getElementById('notification-icon');

        // Remove classes anteriores
        notification.className = 'notification';
        notification.classList.add(type);

        // Define ícone baseado no tipo
        const iconClass = this.getIconClass(type);
        notificationIcon.className = iconClass;

        notificationText.textContent = message;

        // Mostra a notificação
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Esconde após 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 300);
        }, 5000);

        // Também mostra notificação do sistema
        window.electronAPI.showNotification(
            'Screenshot WhatsApp',
            message,
            type
        );
    }

    async updateConnectionStatus() {
        try {
            // Aqui você pode implementar uma verificação real da conexão
            // Por enquanto, vamos simular uma conexão ativa
            const statusDot = document.getElementById('connection-status');
            const statusText = document.getElementById('status-text');

            // Simula verificação de conexão
            const isConnected = true; // Você pode implementar uma verificação real aqui

            if (isConnected) {
                statusDot.className = 'status-dot online';
                statusText.textContent = 'Conectado';
                this.addLogEntry('Conectado ao WPPConnect', 'success');
            } else {
                statusDot.className = 'status-dot offline';
                statusText.textContent = 'Desconectado';
                this.addLogEntry('Desconectado do WPPConnect', 'error');
            }
        } catch (error) {
            console.error('Erro ao verificar status da conexão:', error);
            const statusDot = document.getElementById('connection-status');
            const statusText = document.getElementById('status-text');
            
            statusDot.className = 'status-dot offline';
            statusText.textContent = 'Erro de Conexão';
        }
    }

    // Método para limpar o log
    clearLog() {
        const logContainer = document.getElementById('activity-log');
        logContainer.innerHTML = '';
        this.addLogEntry('Log limpo', 'info');
    }

    // Método para exportar log
    exportLog() {
        const logContainer = document.getElementById('activity-log');
        const entries = Array.from(logContainer.querySelectorAll('.log-entry'))
            .map(entry => entry.textContent.trim())
            .join('\n');

        const blob = new Blob([entries], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `screenshot-log-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Inicializa o aplicativo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ScreenshotApp();
});

// Tratamento de erros globais
window.addEventListener('error', (event) => {
    console.error('Erro global:', event.error);
    if (window.screenshotApp) {
        window.screenshotApp.addLogEntry(`Erro global: ${event.error.message}`, 'error');
    }
});

// Tratamento de promessas rejeitadas
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promessa rejeitada:', event.reason);
    if (window.screenshotApp) {
        window.screenshotApp.addLogEntry(`Promessa rejeitada: ${event.reason}`, 'error');
    }
}); 