# Screenshot WhatsApp App

Um aplicativo desktop desenvolvido com Electron, TypeScript e Node.js para capturar screenshots e enviar automaticamente para grupos do WhatsApp via WPPConnect.

## 🚀 Funcionalidades

- **Captura de Screenshot**: Captura automática da tela do computador
- **Prévia da Imagem**: Visualização da imagem capturada antes do envio
- **Integração WhatsApp**: Envio automático para grupos via WPPConnect
- **Interface Moderna**: Design responsivo e intuitivo
- **Notificações**: Sistema de notificações para sucesso e erro
- **Log de Atividades**: Histórico completo das operações
- **Configurações Flexíveis**: Personalização de grupos e legendas

## 🛠️ Tecnologias Utilizadas

- **Electron**: Framework para aplicações desktop
- **TypeScript**: Linguagem de programação tipada
- **Node.js**: Runtime JavaScript
- **screenshot-desktop**: Biblioteca para captura de tela
- **WPPConnect**: API para integração com WhatsApp
- **Axios**: Cliente HTTP para requisições
- **HTML/CSS/JavaScript**: Interface do usuário

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Yarn (gerenciador de pacotes)
- WPPConnect rodando localmente
- Acesso ao WhatsApp Web

## 🔧 Instalação

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd icmItp
```

2. **Instale as dependências**:
```bash
yarn install
```

3. **Configure o WPPConnect**:
   - Certifique-se de que o WPPConnect está rodando em `http://192.168.15.13:3000`
   - Se necessário, altere a URL no arquivo `src/config/app.config.ts`

4. **Compile o projeto**:
```bash
yarn build
```

5. **Execute o aplicativo**:
```bash
yarn start
```

## 🎯 Como Usar

### 1. Configuração Inicial

1. Abra o aplicativo
2. Configure o ID do grupo WhatsApp no campo correspondente
3. (Opcional) Adicione uma legenda padrão para as imagens

### 2. Captura e Envio

1. Clique no botão **"Tirar e Enviar Screenshot"**
2. O aplicativo capturará automaticamente a tela
3. Uma prévia da imagem será exibida
4. A imagem será enviada automaticamente para o grupo configurado
5. Uma notificação confirmará o sucesso ou erro da operação

### 3. Seleção de Grupo

1. Clique em **"Selecionar Grupo"**
2. Siga as instruções na tela
3. Selecione o grupo desejado no WhatsApp Web

## 📁 Estrutura do Projeto

```
icmItp/
├── src/
│   ├── main/           # Processo principal do Electron
│   │   ├── main.ts     # Arquivo principal
│   │   └── preload.ts  # Script de preload
│   ├── renderer/       # Interface do usuário
│   │   ├── index.html  # Página principal
│   │   ├── styles.css  # Estilos
│   │   └── renderer.js # Lógica da interface
│   ├── backend/        # Serviços de backend
│   │   ├── screenshot.service.ts  # Serviço de captura
│   │   └── whatsapp.service.ts    # Serviço WhatsApp
│   └── config/         # Configurações
│       └── app.config.ts
├── dist/               # Arquivos compilados
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
└── README.md          # Documentação
```

## ⚙️ Configuração

### Configurações do WPPConnect

Edite o arquivo `src/config/app.config.ts` para alterar:

```typescript
whatsapp: {
  baseUrl: 'http://192.168.15.13:3000', // URL do seu WPPConnect
  sessionId: 'default',                  // ID da sessão
  timeout: 30000,                        // Timeout em ms
}
```

### Configurações de Screenshot

```typescript
screenshot: {
  format: 'png',    // Formato da imagem
  quality: 90,      // Qualidade (1-100)
  delay: 1000,      // Delay antes da captura (ms)
}
```

## 🚀 Scripts Disponíveis

- `yarn start`: Executa o aplicativo
- `yarn dev`: Executa em modo desenvolvimento com hot reload
- `yarn build`: Compila o projeto TypeScript
- `yarn build:watch`: Compila em modo watch
- `yarn clean`: Limpa arquivos compilados
- `yarn rebuild`: Limpa e recompila o projeto

## 🔍 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com WPPConnect**:
   - Verifique se o WPPConnect está rodando
   - Confirme a URL no arquivo de configuração
   - Verifique se a porta 3000 está acessível

2. **Erro de captura de screenshot**:
   - Verifique as permissões do sistema
   - Reinicie o aplicativo
   - Verifique se não há outros aplicativos bloqueando a captura

3. **Erro de envio para WhatsApp**:
   - Verifique se o WhatsApp Web está conectado
   - Confirme se o ID do grupo está correto
   - Verifique se a sessão do WPPConnect está ativa

### Logs

O aplicativo mantém um log detalhado de todas as operações. Verifique a seção "Log de Atividades" para diagnosticar problemas.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a seção de troubleshooting
2. Consulte os logs do aplicativo
3. Abra uma issue no repositório
4. Entre em contato com a equipe de desenvolvimento

## 🔄 Atualizações

Para atualizar o aplicativo:

1. Pare o aplicativo
2. Execute `yarn install` para instalar novas dependências
3. Execute `yarn build` para recompilar
4. Execute `yarn start` para iniciar

---

**Desenvolvido com ❤️ usando Electron, TypeScript e WPPConnect** 