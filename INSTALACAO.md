# 🚀 Guia de Instalação - Screenshot WhatsApp App

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **Yarn** (gerenciador de pacotes)
- **Git** (para clonar o repositório)

## 🔧 Passo a Passo da Instalação

### 1. Verificar Instalações

Primeiro, verifique se você tem as ferramentas necessárias:

```bash
# Verificar Node.js
node --version

# Verificar Yarn
yarn --version

# Verificar Git
git --version
```

### 2. Instalar Dependências

Na pasta do projeto, execute:

```bash
# Instalar todas as dependências
yarn install
```

### 3. Compilar o Projeto

```bash
# Compilar o TypeScript
yarn build
```

### 4. Executar o Aplicativo

```bash
# Iniciar o aplicativo
yarn start
```

## 🎯 Configuração do WPPConnect

### 1. Verificar WPPConnect

Certifique-se de que o WPPConnect está rodando em:
```
http://192.168.15.13:3000
```

### 2. Configurar Sessão

1. Abra o navegador e acesse `http://192.168.15.13:3000`
2. Crie uma nova sessão ou use uma existente
3. Conecte o WhatsApp Web
4. Anote o ID da sessão (geralmente é 'default')

### 3. Obter ID do Grupo

1. No WhatsApp Web, abra o grupo desejado
2. O ID do grupo aparece na URL ou pode ser obtido via API
3. Copie o ID para usar no aplicativo

## 🔧 Solução de Problemas

### Erro: "Cannot find module"

Se aparecer erro de módulo não encontrado:

```bash
# Limpar cache e reinstalar
rm -rf node_modules
yarn install
yarn build
```

### Erro: "Permission denied"

No Windows, execute o PowerShell como administrador.

### Erro de conexão com WPPConnect

1. Verifique se o WPPConnect está rodando
2. Teste a URL no navegador
3. Verifique se a porta 3000 não está bloqueada

### Erro de captura de screenshot

1. Verifique permissões do sistema
2. Feche outros aplicativos que possam estar interferindo
3. Reinicie o aplicativo

## 📱 Primeiro Uso

1. **Abra o aplicativo**
2. **Configure o grupo**:
   - Digite o ID do grupo WhatsApp
   - Adicione uma legenda (opcional)
3. **Teste a captura**:
   - Clique em "Tirar e Enviar Screenshot"
   - Verifique se a imagem aparece na prévia
   - Confirme o envio para o WhatsApp

## 🔄 Comandos Úteis

```bash
# Desenvolvimento (com hot reload)
yarn dev

# Compilar em modo watch
yarn build:watch

# Limpar arquivos compilados
yarn clean

# Recompilar tudo
yarn rebuild

# Verificar estrutura
ls -la
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs no aplicativo
2. Consulte a seção de troubleshooting
3. Verifique se todas as dependências estão instaladas
4. Teste a conexão com o WPPConnect

## ✅ Checklist de Instalação

- [ ] Node.js instalado
- [ ] Yarn instalado
- [ ] Dependências instaladas (`yarn install`)
- [ ] Projeto compilado (`yarn build`)
- [ ] WPPConnect rodando
- [ ] WhatsApp Web conectado
- [ ] ID do grupo configurado
- [ ] Aplicativo executando (`yarn start`)

---

**🎉 Parabéns! Seu aplicativo está pronto para uso!** 