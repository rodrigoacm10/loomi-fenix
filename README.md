# Projeto Fênix - Desafio Loomi Front-end

Este repositório contém o **Projeto Fênix**, uma interface de operador moderna desenvolvida para o sistema Nortus. O projeto foi construído como parte do desafio técnico para a Loomi, utilizando tecnologias de ponta para superar as limitações de uma API legada e proporcionar uma experiência de usuário fluida e responsiva.

---

## 🚀 Contexto do Projeto

O sistema original da Nortus possui quase uma década e opera sobre um backend monolítico robusto, porém lento para a web moderna. O **Projeto Fênix** nasceu com a missão de revitalizar essa experiência sem alterar a API v1 (legacy).

O foco principal foi:
- **Performance**: Superar travamentos em listas grandes de clientes.
- **Interatividade**: Eliminar o congelamento da tela em ações críticas.
- **Feedback**: Prover respostas visuais claras e imediatas para cada ação do usuário.
- **Sincronização**: Gerenciar estados de forma eficiente para evitar a necessidade de atualizações constantes da página (F5).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando um stack moderno e focado em escalabilidade:

- **Framework**: [Next.js v14+](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [TailwindCSS](https://tailwindcss.com/)
- **Gerenciamento de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Gráficos**: [ApexCharts.js](https://apexcharts.com/)
- **Mapas**: [OpenLayers](https://openlayers.org/)
- **Validação de Formulários**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Internacionalização**: [next-intl](https://next-intl-docs.vercel.app/)
- **Feedback Visual**: [Sonner](https://sonner.steventey.com/)
- **Consumo de API**: [Axios](https://axios-http.com/)
- **Autenticação**: Tokens armazenados em Cookies e LocalStorage.

---

## ✨ Funcionalidades

### 1. Autenticação (Login)
Fluxo de acesso seguro com validação de campos e proteção de rotas privadas. Os dados de sessão são persistidos para garantir uma experiência de uso contínua.

### 2. Dashboard de KPIs
Visualização de dados críticos como **ARPU, Retenção, Churn e Conversão** por meio de gráficos interativos. Inclui um mapa geográfico para monitoramento de clientes por região.

### 3. Gestão de Tickets
Interface completa para listagem, filtro, criação e edição de tickets, com feedback instantâneo via toasts e estados de loading tratados.

### 4. Chat com IA
Simulador de atendimento assistido por inteligência artificial, oferecendo sugestões contextuais e ações rápidas para o operador.

### 5. Simulador de Planos
Ferramenta interativa para personalização de planos com atualização de valores em tempo real, facilitando a decisão do consultor.

---

## 📁 Estrutura do Projeto

```text
src/
├── app/          # Rotas e layouts (Next.js App Router)
├── components/   # Componentes de UI e lógica de interface
├── hooks/        # Hooks customizados para lógica reutilizável
├── i18n/         # Configurações de internacionalização
├── lib/          # Configurações de bibliotecas externas (Axios, etc)
├── services/     # Camada de comunicação com a API legada
├── store/        # Gerenciamento de estado global com Zustand
├── types/        # Definições de tipos TypeScript
└── utils/        # Funções utilitárias e ajudantes
```

---

---

## 📈 Relatório de Progresso (Entregável Obrigatório)

### 📋 Ferramenta de Gestão e Backlog
A organização das atividades foi realizada por meio de uma estrutura de **backlog técnico e funcional**, onde cada requisito do desafio foi transformado em uma tarefa específica. O acompanhamento do progresso foi feito utilizando o **Trello** para gestão de cards e o versionamento semântico do Git.

**Link do Quadro:** [Trello - Projeto Fênix](https://trello.com/invite/b/699b41df34e204fa2b9732a3/ATTI150aa8c918fafc6c18bb315b44f9702b4F79E460/projeto-fenix)

### 🎯 Organização e Priorização
A definição da ordem de desenvolvimento seguiu uma lógica de **dependência e complexidade**:
1.  **Fundação e Autenticação (Auth)**: O ponto de partida foi o fluxo de Login, pois ele provê a base de segurança e o contexto de usuário necessário para as demais rotas.
2.  **Layout Base**: Desenvolvimento do shell da aplicação (Sidebar, Header e Containers), servindo de base para todas as telas do dashboard.
3.  **Gestão de Tickets (Mais trabalhoso)**: Priorizado logo após o layout por envolver fluxos de CRUD, estados complexos de modais e integração com dados.
4.  **Chat com IA**: Implementação da interface de conversa e lógica de sugestões.
5.  **Simulador de Planos**: Desenvolvimento da lógica de cálculo e interatividade dos sliders.
6.  **Dashboard de KPIs**: Implementação final congregando os gráficos e o mapa, consolidando a visão geral do sistema.
7.  **Perfil do Usuário**: Ajustes finais e gerenciamento de informações de conta.

### 🧠 Principais Dificuldades
- **Integração com OpenLayers**: A configuração do mapa para aceitar markers customizados, cores dinâmicas e camadas de estilo escuro sobre uma API de mapas aberta exigiu um estudo aprofundado da documentação da biblioteca.
- **Padronização Visual (Gráficos e Mapas)**: Garantir que bibliotecas externas (ApexCharts e OpenLayers) seguissem rigorosamente a identidade visual (Dark Mode, paleta Loomi).
- **Lógica do Simulador**: Entender e implementar a reatividade necessária para que sliders, checkboxes e planos se influenciassem mutuamente em tempo real sem prejudicar a performance.

### 🚀 O que faria diferente com mais tempo
- **Fidelidade Visual dos Gráficos**: Gostaria de dedicar mais tempo para customizar o OpenLayers e deixá-lo 100% idêntico ao protótipo do Figma (detalhes de tema, icons e zoom).
- **Animações**: Implementaria transições mais fluidas e micro-interações interessantes (usando Framer Motion) para elevar ainda mais a percepção de modernidade da interface.
- **Testes Automatizados**: Implementação de testes unitários com Jest/React Testing Library e testes E2E com Playwright para garantir a resiliência dos fluxos críticos.

---

## 🤖 Uso de Inteligência Artificial

O desenvolvimento deste projeto foi realizado com o suporte estratégico de ferramentas de Inteligência Artificial, seguindo as diretrizes de uso consciente e ético.

**Ferramenta Utilizada**: **Antigravity (by Google DeepMind)**
**Modelos**: **Gemini 3 Flash**

### Exemplos de Prompts (Objetividade):
- *"Estruture um componente de dashboard no Next.js que consuma dados da API `/nortus-v1/dashboard` e os exiba usando ApexCharts."*
- *"Gere um schema Zod para validação do formulário de criação de tickets baseado no contrato da API legada."*
- *"Refatore a lógica de cálculo do Simulador de Planos para garantir que o estado seja atualizado em tempo real conforme os sliders mudam."*

### Impacto nas Decisões Técnicas:
- **Arquitetura de Estado Atômica por Domínio**: Emprego de múltiplas **Stores especializadas** (Auth, Ticket, Dashboard) com **Zustand**, garantindo um estado global granular que evita re-renderizações em cascata e facilita a manutenção de fluxos complexos como a sincronização entre o Mapa e os KPIs do Dashboard.
- **Eficiência**: O uso da IA permitiu uma prototipagem rápida de componentes complexos (como o Mapa OpenLayers e Gráficos), garantindo mais tempo para o refino da lógica de negócio e UX.
- **Qualidade**: Padrões de **Clean Code** e tipagem de qualidade com **TypeScript** foram mantidos através de revisões constantes auxiliadas pelo modelo Gemini.

> [!IMPORTANT]
> A Inteligência Artificial foi utilizada estritamente como ferramenta de suporte e aceleração. Toda a lógica de negócio, arquitetura final e decisões criativas foram concebidas e validadas por mim, garantindo a autoria e integridade da entrega.

---

## ⚙️ Como Executar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/rodrigoacm10/loomi-fenix.git
   ```
2. **Configure as variáveis de ambiente**:
   Copie o arquivo `.env.example` para `.env` e preencha a URL da API:
   ```bash
   cp .env.example .env
   ```
3. **Instale as dependências**:
   ```bash
   npm install
   ```
4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
5. **Acesse**: `http://localhost:3000`

---

## 📌 Diferenciais Implementados

- ✅ **Internacionalização (i18n)**: Suporte para múltiplos idiomas.
- ✅ **Acessibilidade**: Uso de componentes ShadcnUI para garantir semântica e acessibilidade.
- ✅ **Loading Skeletons**: Tratamento de estados vazios e carregamento.
- ✅ **Clean Code**: Separação clara de responsabilidades e tipagem rigorosa.

---

Desenvolvido por **Rodrigo**, como parte do processo seletivo da **Loomi**.
