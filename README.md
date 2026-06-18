# Totem de Senhas 🎫

Aplicativo mobile desenvolvido com **Ionic Framework + Angular**, que simula um sistema de gerenciamento de filas de atendimento, similar aos totens utilizados em hospitais, clínicas e repartições públicas. O app permite emitir senhas por tipo, chamar senhas na ordem da fila e visualizar relatórios de atendimento.

---

## 📱 Funcionalidades

### Aba 1 — Emitir Senha
- Três tipos de senha disponíveis:
  - **Senha Geral (SG)** — atendimento padrão
  - **Senha Prioritária (SP)** — para pessoas com prioridade
  - **Senha Exame (SE)** — para realização de exames
- Ao clicar em um tipo, gera uma senha com formato: `YYMMDD-TIPO#`
  - Exemplo: `260615-SG1` → emitida em 15/06/2026, Senha Geral número 1
- A senha gerada é exibida em campo de leitura na tela
- Senhas ficam armazenadas em fila para serem chamadas posteriormente

### Aba 2 — Chamar Senha
- Botão **"Chamar senha"** que chama a próxima senha da fila
- Exibe o histórico de senhas chamadas durante a sessão
- Simula o painel de atendimento do operador

### Aba 3 — Relatório
- Dashboard com contadores em tempo real:
  - Total de senhas emitidas
  - Senhas Gerais emitidas
  - Senhas Prioritárias emitidas
  - Senhas de Exame emitidas

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| [Angular](https://angular.io/) | 16 | Framework principal |
| [Ionic Framework](https://ionicframework.com/) | 7 | Componentes UI mobile |
| [TypeScript](https://www.typescriptlang.org/) | ~5.0 | Linguagem principal |
| [RxJS](https://rxjs.dev/) | ~7.8 | Programação reativa |
| [Cordova SQLite Storage](https://github.com/storesafe/cordova-sqlite-storage) | 6.1 | Persistência local (configurado) |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

Verifique as versões instaladas:
```bash
node -v
npm -v
```

### 1. Instalar as dependências

```bash
npm install
```

### 2. Rodar no navegador

```bash
npm start
```

Acesse em: **http://localhost:4200**

### 3. Rodar no Android (opcional)

Requisitos adicionais: [Android Studio](https://developer.android.com/studio) + JDK 17+

```bash
# Gerar o build
npm run build

# Adicionar plataforma Android (apenas na primeira vez)
npx cap add android

# Sincronizar o build com o projeto nativo
npx cap sync android

# Abrir no Android Studio
npx cap open android
```

No Android Studio, clique em **Run** para executar no emulador ou em um dispositivo físico conectado via USB.

---

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── services/
│   │   └── senhas.service.ts     # Lógica de geração, contagem e armazenamento de senhas
│   ├── tab1/                     # Tela de emissão de senhas
│   ├── tab2/                     # Tela de chamada de senhas (painel do atendente)
│   ├── tab3/                     # Tela de relatórios
│   └── tabs/                     # Navegação por abas
├── assets/
├── environments/
└── theme/
```

---

## 🔑 Lógica de Geração de Senhas

As senhas são geradas pelo `SenhasService` com o seguinte formato:

```
YYMMDD-TIPO#
```

| Parte | Descrição | Exemplo |
|---|---|---|
| `YY` | Ano com 2 dígitos | `26` |
| `MM` | Mês com 2 dígitos | `06` |
| `DD` | Dia com 2 dígitos | `15` |
| `TIPO` | Tipo da senha | `SG`, `SP` ou `SE` |
| `#` | Número sequencial do tipo | `1`, `2`, `3`... |

Exemplo completo: `260615-SG3` → 3ª Senha Geral emitida no dia 15/06/2026

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run lint` | Executa a análise de código (ESLint) |
| `npm test` | Executa os testes unitários |
