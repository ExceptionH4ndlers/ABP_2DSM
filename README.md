# 🌊 Sistema de Visualização e Disseminação de Dados Limnológicos

## 📋 Projeto ABP - Aprendizagem Baseada em Projetos

**Faculdade de Tecnologia Professor Francisco de Moura – FATEC Jacareí**  
**Versão do documento: 11/09/2025**  
**Período/Curso: 2º DSM - 2025-2**

### 🎯 Informações do Projeto

| **Categoria** | **Detalhes** |
|----------------|--------------|
| 📍 **Instituição** | FATEC Jacareí |
| 📚 **Curso** | Desenvolvimento de Software Multiplataforma (DSM) |
| 🔄 **Metodologia** | Aprendizagem Baseada em Projetos (ABP) |
| 👤 **Focal Point** | André Olímpio |
| 🤝 **Parceiro** | INPE – Laboratório de Instrumentação de Sistemas Aquáticos (labISA) |
| 👥 **Contatos** | Cláudio Clemente Faria Barbosa, Evlyn Márcia Leão de Moraes Novo |
| 📅 **Kick off** | 16/09/2025 |
| 📊 **Status** | Em desenvolvimento |

### 🌊 Tema do Semestre

**Aplicação Web para visualização e disseminação de dados limnológicos**

### 🔍 Desafio (Problema)

O INPE, a UFRJ, a UFJF e o IIE, em cooperação com Furnas Centrais Elétricas S.A., participaram de dois projetos voltados à coleta de dados limnológicos e meteorológicos, com o objetivo de subsidiar estudos sobre o **Balanço de Carbono nos Reservatórios de Furnas Centrais Elétricas S.A.**

Cada instituição foi responsável pela coleta de dados em campo, cabendo ao INPE o monitoramento por meio do **SIMA (Sistema Integrado de Monitoração Ambiental)**, um conjunto de hardware e software desenvolvido para a coleta e a monitoração em tempo real de sistemas hidrológicos.

#### 📊 Tipos de Dados Coletados

- **Parâmetros limnológicos**: Coletados manualmente em diversos locais dos reservatórios, em curtos períodos de tempo (chamados de **campanhas**)
- **Dados do SIMA**: Coletados automaticamente durante longos períodos, em um único ponto do reservatório

**Objetivo**: Para que esse vasto conjunto de informações possa ser utilizado em pesquisas no Brasil e no exterior, faz-se necessária a criação de uma plataforma que possibilite a disseminação e o acesso aberto a esses dados.

---

<details>
<summary><b>📋 Análise de Requisitos</b></summary>

Esta seção contém a análise detalhada dos requisitos funcionais, não funcionais e restrições do projeto, baseada no documento oficial da ABP.

### ⚙️ Requisitos Funcionais

#### **RF01: Painel Interativo de Visualização**
- **Descrição**: Permitir aos usuários visualizar todos os parâmetros armazenados, filtrando por instituição, reservatório e período de tempo – em formato semelhante a um painel interativo.
- **Critérios de Aceitação**:
  - ✅ Interface com filtros por instituição (INPE, UFRJ, UFJF, IIE)
  - ✅ Filtros por reservatório específico
  - ✅ Seleção de período de tempo (data início/fim)
  - ✅ Visualização em formato de dashboard/painel
  - ✅ Atualização dinâmica dos dados conforme filtros aplicados

#### **RF02: Visualização em Tabelas**
- **Descrição**: Consultar e visualizar os dados no formato de tabelas.
- **Critérios de Aceitação**:
  - ✅ Tabelas paginadas para grandes volumes de dados
  - ✅ Ordenação por colunas
  - ✅ Busca textual nos dados
  - ✅ Responsividade para diferentes tamanhos de tela

#### **RF03: Exportação CSV**
- **Descrição**: Consultar e exportar os dados no formato CSV.
- **Critérios de Aceitação**:
  - ✅ Exportação de dados filtrados
  - ✅ Formato CSV compatível com Excel/LibreOffice
  - ✅ Inclusão de metadados no arquivo
  - ✅ Download automático do arquivo

#### **RF04: Mapa Interativo**
- **Descrição**: Consultar e visualizar a localização dos dados em um mapa interativo.
- **Critérios de Aceitação**:
  - ✅ Mapa com localização das estações SIMA
  - ✅ Marcadores para pontos de coleta de campanhas
  - ✅ Informações detalhadas ao clicar nos marcadores
  - ✅ Zoom e navegação no mapa

#### **RF05: Gráficos de Séries Temporais**
- **Descrição**: Exibir os dados de séries temporais (parâmetros coletados pelo SIMA) em gráficos.
- **Critérios de Aceitação**:
  - ✅ Gráficos de linha para séries temporais
  - ✅ Múltiplos parâmetros no mesmo gráfico
  - ✅ Zoom e pan nos gráficos
  - ✅ Exportação de gráficos

### 🛠️ Requisitos Não Funcionais

#### **RNF01: Usabilidade Crítica**
- **Descrição**: A usabilidade será um requisito crítico, exigindo uma interface intuitiva, clara e de fácil navegação, mesmo para usuários sem conhecimento técnico aprofundado.
- **Métricas**:
  - Tempo de aprendizado < 15 minutos
  - Taxa de erro do usuário < 5%
  - Satisfação do usuário > 4.0/5.0

#### **RNF02: Performance Otimizada**
- **Descrição**: A aplicação deve apresentar desempenho otimizado, garantindo carregamento rápido dos dados.
- **Métricas**:
  - Tempo de carregamento inicial < 3 segundos
  - Tempo de resposta das consultas < 2 segundos
  - Suporte a 100 usuários simultâneos

#### **RNF03: Padrões Institucionais**
- **Descrição**: A interface deve seguir os padrões institucionais do INPE e a identidade visual definida pelo cliente.
- **Critérios**:
  - Cores e logo do INPE
  - Tipografia institucional
  - Layout responsivo e acessível

### 🔧 Restrições de Projeto

#### **RP01: Banco de Dados PostgreSQL**
- **Justificativa**: Requisito específico do cliente para compatibilidade com sistemas existentes
- **Impacto**: Define a escolha tecnológica do banco de dados

#### **RP02: Back-end Node.js + TypeScript**
- **Justificativa**: Padronização tecnológica e facilidade de desenvolvimento
- **Impacto**: Define a stack tecnológica do servidor

#### **RP03: Front-end React + TypeScript**
- **Justificativa**: Modernidade, reutilização de componentes e tipagem estática
- **Impacto**: Define a stack tecnológica do cliente

#### **RP04: Containerização Docker**
- **Justificativa**: Facilita deployment, isolamento e escalabilidade
- **Impacto**: Define a arquitetura de deployment

</details>

<details>
<summary><b>🏃‍♂️ Metodologia Scrum</b></summary>

Esta seção documenta a estrutura completa da metodologia Scrum aplicada no projeto, incluindo papéis, cerimônias, artefatos e métricas de qualidade.

### 📊 Estrutura da Equipe Scrum

| **Papel** | **Responsável** | **Responsabilidades** |
|-----------|-----------------|------------------------|
| **Product Owner** | Alicia Silva Dias | Definição de requisitos, priorização do backlog, validação de funcionalidades |
| **Scrum Master** | João Victor Lopes Rosa | Facilitação das cerimônias, remoção de impedimentos, coaching da equipe |
| **Development Team** | Pedro Claudino, Manuela Lemes, Gabrielly Neu, Leonardo Irineu | Desenvolvimento, testes, documentação técnica |

### 📅 Cerimônias Scrum

#### **Sprint Planning**
- **Frequência**: Início de cada Sprint (2 semanas)
- **Duração**: 2 horas
- **Objetivo**: Planejar o trabalho do Sprint, definir Sprint Goal

#### **Daily Scrum**
- **Frequência**: Diariamente
- **Duração**: 15 minutos
- **Objetivo**: Sincronização da equipe, identificação de impedimentos

#### **Sprint Review**
- **Frequência**: Final de cada Sprint
- **Duração**: 1 hora
- **Objetivo**: Demonstração do incremento para stakeholders

#### **Sprint Retrospective**
- **Frequência**: Final de cada Sprint
- **Duração**: 1 hora
- **Objetivo**: Melhoria contínua do processo

### 📋 Artefatos Scrum

#### **Product Backlog**
- **Responsável**: Product Owner
- **Conteúdo**: Histórias de usuário, requisitos funcionais e não funcionais
- **Localização**: [`Scrum/Product Backlog/Product Backlog Completo.pdf`](Scrum/Product%20Backlog/Product%20Backlog%20Completo.pdf)

#### **Sprint Backlog**
- **Responsável**: Development Team
- **Conteúdo**: Tarefas técnicas para implementar as histórias do Sprint
- **Localização**: [`Scrum/Sprints/Sprint 1/Sprint Backlog.pdf`](Scrum/Sprints/Sprint%201/Sprint%20Backlog/Sprint%20Backlog.pdf)

#### **Incremento**
- **Responsável**: Development Team
- **Conteúdo**: Funcionalidades prontas para produção
- **Critério**: Definition of Done atendida

### 📈 Acompanhamento do Progresso

#### **Burndown Chart**
- **Objetivo**: Visualizar o progresso do Sprint
- **Localização**: [`Scrum/Burndown Chart/Sprint 1/BurndownIdeal.png`](Scrum/Burndown%20Chart/Sprint%201/BurndownIdeal.png)

#### **Velocity Tracking**
- **Métrica**: Story Points completados por Sprint
- **Objetivo**: Planejamento de Sprints futuros

### 📝 Registros das Dailys

| **Data** | **ATA** | **Principais Discussões** |
|----------|---------|---------------------------|
| 12/09/2025 | [`ATA_DAILY_12.09.2025.pdf`](Dailys/ATA_DAILY_12.09.2025.pdf) | Kick-off do projeto, definição de papéis |
| 16/09/2025 | [`ATA_DAILY_16.09.2025.pdf`](Dailys/ATA_DAILY_16.09.2025.pdf) | Setup do ambiente de desenvolvimento |
| 18/09/2025 | [`ATA_DAILY_18.09.2025.pdf`](Dailys/ATA_DAILY_18.09.2025.pdf) | Análise dos requisitos funcionais |
| 22/09/2025 | [`ATA_DAILY_22.09.2025.pdf`](Dailys/ATA_DAILY_22.09.2025.pdf) | Implementação da estrutura base |
| 24/09/2025 | [`ATA_DAILY_24.09.2025.pdf`](Dailys/ATA_DAILY_24.09.2025.pdf) | Desenvolvimento das APIs |
| 26/09/2025 | [`ATA_DAILY_26.09.2025.pdf`](Dailys/ATA_DAILY_26.09.2025.pdf) | Integração frontend-backend |

### 🎯 Definition of Done

Para que uma história de usuário seja considerada "Done", deve atender aos seguintes critérios:

- [ ] **Funcionalidade implementada** conforme especificação
- [ ] **Testes unitários** escritos e passando
- [ ] **Code review** aprovado por outro membro da equipe
- [ ] **Documentação** atualizada (README, comentários no código)
- [ ] **Deploy** realizado com sucesso no ambiente de desenvolvimento
- [ ] **Validação** pelo Product Owner
- [ ] **Sem bugs** conhecidos ou críticos

### 📊 Métricas de Qualidade

#### **Código**
- Cobertura de testes > 80%
- Complexidade ciclomática < 10
- Duplicação de código < 5%

#### **Performance**
- Tempo de resposta API < 2 segundos
- Carregamento inicial < 3 segundos
- Uso de memória < 512MB

#### **Usabilidade**
- Tempo de aprendizado < 15 minutos
- Taxa de erro < 5%
- Satisfação do usuário > 4.0/5.0

</details>

<details>
<summary><b>🏗️ Análise Técnica e Arquitetura</b></summary>

Esta seção apresenta a análise técnica detalhada do projeto, incluindo stack tecnológica, arquitetura do sistema, estrutura de dados e considerações de segurança e escalabilidade.

### 🎯 Stack Tecnológica (Baseada nas Restrições)

#### **Frontend: React + TypeScript**
- **Justificativa**: RP03 - Requisito específico do projeto
- **Benefícios**:
  - Componentização e reutilização de código
  - Tipagem estática para redução de bugs
  - Ecossistema maduro e comunidade ativa
  - Compatibilidade com ferramentas de desenvolvimento modernas

#### **Backend: Node.js + TypeScript**
- **Justificativa**: RP02 - Requisito específico do projeto
- **Benefícios**:
  - Mesma linguagem frontend/backend (TypeScript)
  - Performance adequada para APIs REST
  - Ecossistema npm rico em bibliotecas
  - Facilidade de deployment e escalabilidade

#### **Banco de Dados: PostgreSQL**
- **Justificativa**: RP01 - Requisito específico do cliente
- **Benefícios**:
  - Suporte robusto a dados científicos complexos
  - Funcionalidades avançadas (JSON, arrays, tipos customizados)
  - Compatibilidade com sistemas existentes do INPE
  - Performance otimizada para consultas analíticas

#### **Containerização: Docker**
- **Justificativa**: RP04 - Requisito específico do projeto
- **Benefícios**:
  - Isolamento de ambientes
  - Facilidade de deployment
  - Consistência entre desenvolvimento e produção
  - Escalabilidade horizontal

### 🏛️ Arquitetura do Sistema

#### **Padrão Arquitetural: Microserviços com Containers**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Databases     │
│   React App     │◄──►│   Node.js API   │◄──►│   PostgreSQL    │
│   (Port 3002)   │    │   (Port 3001)   │    │   (Ports 5433+) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### **Separação de Responsabilidades**

1. **Frontend Container**
   - Interface de usuário
   - Consumo de APIs
   - Gerenciamento de estado
   - Validação de entrada

2. **Backend Container**
   - Lógica de negócio
   - APIs REST
   - Validação de dados
   - Integração com bancos

3. **Database Containers** (3 instâncias)
   - **SIMA**: Dados de monitoramento ambiental
   - **Furnas Campanha**: Dados de campanhas Furnas
   - **Balcar Campanha**: Dados de campanhas BALCAR

### 📊 Estrutura de Dados

#### **Banco SIMA**
- **Propósito**: Dados coletados automaticamente pelo SIMA
- **Tabelas principais**: `tbsima`, `tbestacao`, `tbsensor`
- **Volume**: Alto (séries temporais contínuas)
- **Características**: Dados em tempo real, alta frequência

#### **Banco Furnas Campanha**
- **Propósito**: Dados coletados manualmente em campanhas
- **Tabelas principais**: `tbcampanha`, `tbreservatorio`, `tbsitio`
- **Volume**: Médio (dados pontuais)
- **Características**: Dados georreferenciados, múltiplos parâmetros

#### **Banco Balcar Campanha**
- **Propósito**: Dados específicos do projeto BALCAR
- **Tabelas principais**: `tbcampanha`, `tbinstituicao`, `tbfluxoinpe`
- **Volume**: Baixo a médio
- **Características**: Dados institucionais, fluxos específicos

### 🔄 Fluxo de Dados

#### **1. Coleta de Dados**
```
SIMA Hardware → PostgreSQL SIMA → API Backend → Frontend
Campanhas → PostgreSQL Furnas/Balcar → API Backend → Frontend
```

#### **2. Visualização**
```
Frontend → API Backend → PostgreSQL → Processamento → Resposta JSON → Frontend
```

#### **3. Exportação**
```
Frontend → API Backend → PostgreSQL → Parser CSV → Download
```

### 🛡️ Considerações de Segurança

#### **Isolamento de Containers**
- Cada serviço em container independente
- Rede Docker isolada (`abp-network`)
- Volumes persistentes para dados críticos

#### **Controle de Acesso**
- CORS configurado para domínios específicos
- Validação de entrada em todas as APIs
- Sanitização de dados antes do banco

#### **Backup e Recuperação**
- Volumes Docker persistentes
- Scripts de backup automático
- Procedimentos de recuperação documentados

### 📈 Escalabilidade

#### **Horizontal Scaling**
- Múltiplas instâncias do backend
- Load balancer para distribuição de carga
- Cache Redis para sessões (futuro)

#### **Vertical Scaling**
- Aumento de recursos dos containers
- Otimização de queries PostgreSQL
- Índices estratégicos nos bancos

### 🔧 Monitoramento e Logs

#### **Estrutura de Logs**
- **Winston** para logging estruturado
- **Níveis**: error, warn, info, debug
- **Rotação** automática de arquivos
- **Formato** JSON para análise

#### **Métricas Importantes**
- Tempo de resposta das APIs
- Uso de memória e CPU
- Conexões ativas no banco
- Erros e exceções

</details>

<details>
<summary><b>📊 Diagramas UML e Modelagem</b></summary>

Esta seção documenta todos os diagramas UML do projeto, incluindo estrutura de classes, casos de uso e ferramentas de modelagem utilizadas.

### 🎯 Diagramas do Projeto

O projeto possui diagramas UML estruturados para cada módulo do sistema, facilitando a compreensão da arquitetura e relacionamentos entre entidades.

#### 📁 **Estrutura dos Diagramas**

| **Diagrama** | **Arquivo** | **Descrição** | **Ferramenta** |
|--------------|-------------|---------------|----------------|
| **SIMA** | [`sima.asta`](diagramas/sima.asta) | Diagrama de classes do Sistema Integrado de Monitoramento Ambiental | Astah Professional |
| **Furnas Campanha** | [`furnas_campanha.asta`](diagramas/furnas_campanha.asta) | Diagrama de classes das campanhas Furnas | Astah Professional |
| **Balcar Campanha** | [`balcar_campanha.asta`](diagramas/balcar_campanha.asta) | Diagrama de classes das campanhas BALCAR | Astah Professional |
| **Use Case ABP** | [`UseCase_ABP.asta`](diagramas/UseCase_ABP.asta) | Diagrama de casos de uso do projeto ABP | Astah Professional |

#### 🏗️ **Modelagem de Classes**

O projeto utiliza **TypeScript** para implementação das classes modeladas nos diagramas UML:

```typescript
// Exemplo de classe do módulo BALCAR
export class Reservatorio {
  constructor(
    public idreservatorio: number,
    public nome: string,
    public lat: number,
    public lng: number
  ) {}

  getReservatorio(): string {
    return `Reservatório: ${this.nome} (ID: ${this.idreservatorio})`;
  }
}
```

#### 📋 **Principais Entidades Modeladas**

##### **SIMA (Sistema Integrado de Monitoramento Ambiental)**
- **Estacao**: Representa estações de monitoramento
- **Sensor**: Sensores utilizados nas estações
- **Sima**: Dados coletados pelo sistema
- **CampoTabela**: Campos das tabelas de dados

##### **Furnas Campanha**
- **Campanha**: Campanhas de coleta de dados
- **Reservatorio**: Reservatórios monitorados
- **Sitio**: Sítios específicos de coleta
- **Instituicao**: Instituições participantes
- **DadosAbioticos**: Parâmetros abióticos coletados
- **DadosBioticos**: Parâmetros bióticos coletados

##### **Balcar Campanha**
- **Campanha**: Campanhas específicas do projeto BALCAR
- **Reservatorio**: Reservatórios do projeto BALCAR
- **Instituicao**: Instituições participantes
- **Sitio**: Sítios de coleta BALCAR
- **FluxoInpe**: Fluxos de dados do INPE

#### 🎯 **Casos de Uso Principais**

O diagrama de casos de uso (`UseCase_ABP.asta`) documenta as principais funcionalidades do sistema:

- **Visualizar Dados**: Consulta e visualização de parâmetros
- **Filtrar Dados**: Aplicação de filtros por instituição, reservatório e período
- **Exportar CSV**: Exportação de dados em formato CSV
- **Visualizar Mapa**: Localização geográfica dos dados
- **Gerar Gráficos**: Visualização de séries temporais

#### 🔧 **Ferramentas de Modelagem**

- **Astah Professional**: Ferramenta principal para criação dos diagramas UML
- **TypeScript**: Implementação das classes modeladas
- **PostgreSQL**: Persistência das entidades modeladas

#### 📚 **Benefícios da Modelagem UML**

1. **Documentação Visual**: Facilita compreensão da arquitetura
2. **Comunicação**: Melhora comunicação entre equipe e stakeholders
3. **Implementação**: Guia para desenvolvimento das classes TypeScript
4. **Manutenção**: Facilita futuras modificações e expansões
5. **Padronização**: Segue padrões UML estabelecidos

#### 📖 **Como Visualizar os Diagramas**

1. **Instalar Astah Professional** (versão gratuita disponível)
2. **Abrir arquivos .asta** na ferramenta
3. **Navegar pelos diagramas** usando a estrutura de pastas
4. **Exportar imagens** se necessário para documentação

#### 🔄 **Atualização dos Diagramas**

Os diagramas são atualizados conforme o projeto evolui:
- **Sprint Planning**: Revisão dos diagramas existentes
- **Desenvolvimento**: Atualização quando novas entidades são criadas
- **Sprint Review**: Validação dos diagramas com stakeholders
- **Retrospectiva**: Melhoria da modelagem baseada em feedback

</details>

<details>
<summary><b>🚀 Como Executar o Projeto</b></summary>

Esta seção contém instruções práticas para executar o projeto, incluindo configuração com Docker, acesso às aplicações e estrutura dos bancos de dados.

### ▶️ Com Docker (Recomendado)
```bash
# Subir todos os containers
docker compose -f docker-compose.dev.yml up --build -d

# Parar os containers
docker compose -f docker-compose.dev.yml down
```

### 🌐 Acessando a Aplicação

- **Front-end (React)**: http://localhost:3002
- **Back-end (API Node)**: http://localhost:3001
  - Exemplo: http://localhost:3001/sima/sima/all?page=1&limit=20

### 🗄️ Bancos de Dados

O sistema utiliza três bancos PostgreSQL independentes:

| **Banco** | **Porta** | **Descrição** | **Container** |
|-----------|-----------|---------------|---------------|
| **Furnas Campanha** | 5433 | Dados das campanhas Furnas | `postgres-furnas-campanha` |
| **SIMA** | 5434 | Dados do Sistema Integrado de Monitoramento Ambiental | `postgres-sima` |
| **Balcar Campanha** | 5435 | Dados das campanhas BALCAR | `postgres-balcar-campanha` |

**Credenciais padrão:**
- Usuário: `postgres`
- Senha: `postgres`
- Host: `localhost` (ou nome do container no Docker)

</details>

<details>
<summary><b>📂 Estrutura do Projeto</b></summary>

Esta seção apresenta a organização completa do projeto, incluindo estrutura de pastas, configurações técnicas e pipeline CI/CD.

#### 📂 Estrutura de Pastas

A organização do projeto segue uma separação clara entre bancos de dados (scripts e dados), servidor (código da aplicação) e configurações gerais.

```bash
app/
├── balcar-campanha/            
│   ├── csv/                       # Arquivos de dados (CSV) carregados nas tabelas
│   ├── copy-table.sql             # Script SQL para importar os arquivos CSV para o banco
│   ├── create-table.sql           # Script SQL para criar a estrutura das tabelas
│   └── balcar-campanha-modelo.xml # Modelo conceitual do banco, visualizável no DBDesigner
│  
├── furnas-campanha/
│   ├── csv/                       # Arquivos de dados (CSV) carregados nas tabelas
│   ├── copy-table.sql             # Script SQL para importar os arquivos CSV para o banco
│   ├── create-table.sql           # Script SQL para criar a estrutura das tabelas
│   └── furnas-campanha-modelo.xml # Modelo conceitual do banco, visualizável no DBDesigner
│   
├── sima/
│   ├── csv/                       # Arquivos de dados (CSV) específicos do SIMA
│   ├── copy-table.sql             # Script SQL para importação dos CSV
│   ├── create-table.sql           # Script SQL para criação das tabelas
│   └── sima-modelo.xml            # Modelo conceitual do banco SIMA (para DBDesigner)
│ 
├── server/
│   ├── src/                       # Código-fonte da aplicação
│   │   ├── configs/               # Configurações, como conexão com banco de dados
│   │   ├── controllers/           # Lógica de controle (recebem requisições, chamam serviços)
│   │   ├── routes/                # Definição das rotas da API
│   │   └── index.ts               # Arquivo principal que inicializa o servidor
│   ├── Dockerfile                 # Receita para construção da imagem Docker do servidor
│   ├── package.json               # Dependências e scripts NPM
│   └── tsconfig.json              # Configurações do compilador TypeScript
│
├── front/                        # Front-end React + Vite + styled-components
│   ├── src/
│   │   ├── api/                  # Consumo da API (axios)
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── pages/                # Páginas (ex.: SimaPage)
│   │   └── styles/               # GlobalStyle + ThemeProvider
│   ├── Dockerfile
│   ├── vite.config.ts
│   └── package.json
│
├── .github/workflows/ci.yml       # Pipeline de Integração Contínua
└── docker-compose.dev.yml         # Definições dos serviços Docker para ambiente de desenvolvimento
```

#### 🔑 Configurações Técnicas

**Back-end (`server/`)**
- Node.js + Express + TypeScript
- Estrutura em camadas (configs, controllers, routes)
- Conexão com múltiplos bancos via `pg.Pool`
- Middlewares: JSON parser, erro global, CORS configurado
- ESLint + Prettier para padronização de código
- Dockerfile com hot reload (ts-node-dev)

**Front-end (`front/`)**
- React + Vite + TypeScript
- styled-components com `ThemeProvider` global
- GlobalStyle para reset de estilos
- Barra Brasil + Menu responsivo
- Estrutura organizada (`api/`, `components/`, `pages/`, `styles/`)
- Axios configurado com `VITE_SERVER_PORT`

**Banco de Dados**
- PostgreSQL 17 (um container por domínio: furnas-campanha, sima, balcar-campanha)
- Scripts SQL para `CREATE TABLE` e `COPY FROM CSV`
- Volumes persistentes para dados
- Cada banco acessível em uma porta distinta (5433, 5434, 5435)

**CI/CD**
- GitHub Actions (`.github/workflows/ci.yml`)
- Pipeline roda automaticamente em push e pull requests para a branch `main`
- Estrutura de Jobs: `server-ci`, `front-ci` e `docker-ci`

</details>

<details>
<summary><b>📤 Exportação de Dados em CSV</b></summary>

Esta seção detalha o sistema completo de exportação CSV, incluindo compatibilidade com diferentes ferramentas, exemplos de uso e estrutura dos arquivos gerados.

#### Com Docker (Recomendado)
```bash
# Subir todos os containers
docker compose -f docker-compose.dev.yml up --build -d

# Parar os containers
docker compose -f docker-compose.dev.yml down
```

#### Desenvolvimento Local
```bash
# Back-end
cd server
npm install
npm run dev
# API disponível em: http://localhost:3001

# Front-end
cd front
npm install
npm run dev
# App disponível em: http://localhost:3002
```

### 🌐 Acessando a Aplicação

- **Front-end (React)**: http://localhost:3002
- **Back-end (API Node)**: http://localhost:3001
  - Exemplo: http://localhost:3001/sima/sima/all?page=1&limit=20

---

<details>
<summary><b>📤 Exportação de Dados em CSV</b></summary>

Este projeto oferece a funcionalidade de **exportação de dados em formato CSV**, permitindo que os usuários consultem, filtrem e salvem os dados para uso em ferramentas como **Excel, LibreOffice, R e Python**.

### 🔧 **Como Funciona o Sistema de Exportação CSV**

O sistema utiliza um **parser CSV personalizado** desenvolvido em TypeScript que:

#### 📊 **Processamento de Dados**
- **Extrai dados dinamicamente** do banco PostgreSQL
- **Gera cabeçalhos automaticamente** baseados nos campos disponíveis
- **Aplica filtros** conforme especificado pelo usuário
- **Valida dados** antes da exportação
- **Formata datas** em diferentes padrões (ISO, BR, US)

#### 🏗️ **Arquitetura do Parser**
```typescript
// Estrutura principal do parser
class SimaCsvParser {
  // Gera cabeçalhos dinamicamente
  private generateHeaders(options, sampleData): string[]
  
  // Cria metadados do arquivo
  private generateMetadata(data, options): CsvMetadata
  
  // Formata linhas de dados
  private formatDataRow(data, options): string[]
  
  // Gera CSV completo
  public generateCsv(data, options): Promise<string>
  
  // Baixa arquivo automaticamente
  public downloadCsv(data, filename, options): Promise<void>
}
```

#### ⚙️ **Opções de Configuração**
- **Separador**: `;` (padrão), `,` ou `\t`
- **Encoding**: UTF-8 (padrão) ou ISO-8859-1
- **Formato de data**: ISO, BR ou US
- **Metadados**: Incluir/excluir informações do arquivo
- **Cabeçalhos**: Incluir/excluir nomes das colunas

### 🌐 **Compatibilidade Multiplataforma**

#### 📊 **Microsoft Excel**
- **Codificação**: UTF-8 com BOM para caracteres especiais
- **Separador**: Ponto e vírgula (`;`) - padrão brasileiro
- **Formato**: Abre diretamente sem configurações adicionais
- **Metadados**: Linhas iniciadas com `#` são ignoradas automaticamente

#### 📈 **LibreOffice Calc**
- **Codificação**: UTF-8
- **Separador**: Detecta automaticamente o ponto e vírgula
- **Importação**: Use "Arquivo > Abrir" e selecione UTF-8
- **Compatibilidade**: 100% compatível com Excel

#### 🔬 **R (Linguagem de Estatística)**
```r
# Carregamento básico
library(readr)
dados <- read_csv2("arquivo.csv", locale = locale(encoding = "UTF-8"))

# Com metadados ignorados
dados <- read.csv2("arquivo.csv", 
                   header = TRUE, 
                   sep = ";", 
                   comment.char = "#",
                   encoding = "UTF-8")

# Para análise de séries temporais
dados$datahora <- as.POSIXct(dados$datahora, format = "%Y-%m-%d %H:%M:%S")
```

#### 🐍 **Python (Pandas)**
```python
import pandas as pd

# Carregamento básico
dados = pd.read_csv("arquivo.csv", 
                   sep=";", 
                   comment="#",
                   encoding="utf-8")

# Para análise de séries temporais
dados['datahora'] = pd.to_datetime(dados['datahora'])

# Para análise estatística
import numpy as np
estatisticas = dados.describe()
```

#### 📊 **Outras Ferramentas**
- **SPSS**: Importa diretamente com separador `;`
- **SAS**: Use `PROC IMPORT` com `DELIMITER=';'`
- **Stata**: `import delimited` com `delimiter(";")`
- **MATLAB**: `readtable()` detecta automaticamente o formato

### ✅ Funcionalidades Disponíveis

- Exportação de **todos os registros** da base de dados.
- Exportação de **registros filtrados**, com base nos filtros aplicados na interface.
- Inclusão de **cabeçalhos** (nomes das colunas) e **metadados** (como data de exportação e filtros aplicados).
- Arquivos compatíveis com:
  - Microsoft Excel (.csv com codificação UTF-8)
  - LibreOffice Calc
  - Linguagens de análise de dados: R, Python, etc.

### 📁 Como Gerar e Utilizar os Arquivos CSV

#### 1. Acesse a área de exportação
- Navegue até a tela/listagem da tabela desejada (por exemplo: `Campos da Tabela`, `Estações`, `Sensores`).
- Aplique os filtros necessários (opcional).

#### 2. Clique em "Exportar CSV"
- Um botão **Exportar CSV** estará visível.
- Sem filtros: todos os registros serão exportados.
- Com filtros: apenas os registros filtrados serão exportados.

#### 3. Download automático
- O arquivo será baixado automaticamente para o seu dispositivo.
- O nome seguirá o padrão:
exportacao_nomeTabela_YYYY-MM-DD_HH-MM.csv

### 🧾 Estrutura dos Arquivos CSV Gerados

#### 🧩 Exemplo: `tbcampotabela.csv`

##### Cabeçalho
idcampotabela;idsensor;nomecampo;rotulo;unidademedida;ordem

##### Dados
1;;sonda_bateria;Bateria da PTT;V;26
2;8;sonda_chl;Clorofila;ug/l;25
3;10;sonda_DO;Conc. de DO;mg/l;20

#### 🧩 Exemplo: `tbestacao.csv`

##### Cabeçalho
idestacao;idHexadecimal;rotulo;lat;lng;inicio;fim

##### Dados
30842;e1ea9;Balbina;-1.903697222;-59.46910833;2013-08-16;
30913;e3074;Ibitinga 3;-21.76121;-48.98112;2013-03-22;
30931;e34fd;Itumbiara 3;-18.283875;-48.906598;2009-11-18;2011-09-25

#### 🧩 Exemplo: `tbsensor.csv`

##### Cabeçalho
idSensor;nome;fabricante;modelo;faixa;precisao

##### Dados
1;Vento;R. M. Young Company;Marine Model 05106;0° a 360° Azimute;±3°
8;Sensor de Clorofila;Yellow Spring;YSI 6025;0 a 400 ug/l;0.1 ug/l
10;Sensor de Oxigênio Dissolvido;Yellow Spring;YSI 6562;0 a 50 mg/l;0.01 mg/l

### 📌 **Metadados no CSV**

Ao início do arquivo, estão presentes linhas de metadados, iniciadas com `#`, contendo informações úteis como:

```csv
# METADADOS DO ARQUIVO CSV SIMA
# Título: Dados SIMA - Estação e1ea9
# Descrição: Dados de monitoramento hidrosférico coletados pelo Sistema Integrado de Monitoramento Ambiental (SIMA)
# Fonte: SIMA - Sistema Integrado de Monitoramento Ambiental
# Data de Geração: 2025-09-26T14:32:00.000Z
# Versão: 1.0
# Estação: Balbina
# Coordenadas: Lat -1.903697222, Lng -59.46910833
# Período: 2013-08-16 a 2025-09-26
# Total de Registros: 32
# Campos Incluídos: 25
#
# ESTRUTURA DOS DADOS:
# ID_SIMA: Identificador único do registro
# ID_ESTACAO: Identificador da estação de coleta
# DATA_HORA: Data e hora da coleta
#
# DADOS:
```

> ⚠️ **Importante**: Linhas iniciadas com `#` são **ignoradas por leitores CSV padrão**, mas fornecem **contexto útil** para análise e documentação.

### 📥 **Como Abrir os Arquivos CSV**

#### 📊 **Excel / LibreOffice**
- Abra diretamente no software
- Se necessário, escolha a codificação UTF-8
- O separador padrão é `;` (ponto e vírgula). Altere nas configurações de importação, se necessário

#### 📈 **R**
```r
# Método recomendado
dados <- read.csv2("caminho/do/arquivo.csv", 
                   header = TRUE, 
                   sep = ";", 
                   comment.char = "#",
                   encoding = "UTF-8")

# Para análise de séries temporais
dados$datahora <- as.POSIXct(dados$datahora)
```

#### 🐍 **Python (pandas)**
```python
import pandas as pd

# Carregamento básico
dados = pd.read_csv("caminho/do/arquivo.csv", 
                   sep=";", 
                   comment="#")

# Para análise de séries temporais
dados['datahora'] = pd.to_datetime(dados['datahora'])
```

### ⚠️ **Observações Importantes**

- **Codificação**: Arquivos CSV são gerados com codificação UTF-8, garantindo suporte a acentos e caracteres especiais
- **Performance**: Para volumes grandes de dados, a geração pode levar alguns segundos
- **Filtros**: Para exportar registros específicos, aplique os filtros desejados antes da exportação
- **Validação**: O sistema valida automaticamente os dados antes da exportação
- **Compatibilidade**: Arquivos são compatíveis com todas as principais ferramentas de análise de dados
- **Metadados**: Informações contextuais são preservadas para facilitar a análise posterior

</details>

</details>


<details>
<summary><b>🏃‍♂️ Artefatos Scrum - Acesso Rápido</b></summary>

Este dropdown contém todos os artefatos e documentos relacionados à metodologia Scrum utilizada no desenvolvimento do projeto. Aqui você encontrará acesso direto aos documentos de planejamento, acompanhamento e reuniões da equipe.

### 📋 **Acesso Direto aos Artefatos**

| **Artefato** | **Link Direto** | **Descrição** |
|--------------|-----------------|---------------|
| **📋 Product Backlog** | [`Product Backlog Completo.pdf`](Scrum/Product%20Backlog/Product%20Backlog%20Completo.pdf) | Documento completo com todas as histórias de usuário, requisitos funcionais e não funcionais do projeto |
| **🏃‍♂️ Sprint Planning** | [`Sprint Backlog.pdf`](Scrum/Sprints/Sprint%201/Sprint%20Backlog/Sprint%20Backlog.pdf) | Tarefas e atividades planejadas para o Sprint 1, incluindo estimativas e responsáveis |
| **📊 Burndown Chart** | [`BurndownIdeal.png`](Scrum/Burndown%20Chart/Sprint%201/BurndownIdeal.png) | Gráfico de progresso ideal do Sprint 1 para acompanhamento da evolução das atividades |

### 📅 **Dailys (Reuniões Diárias)**

As reuniões diárias (Daily Scrums) são realizadas para sincronização da equipe, identificação de impedimentos e planejamento das atividades do dia. Cada ATA contém:

- **Resumo das atividades realizadas** no dia anterior
- **Planejamento das atividades** para o dia atual
- **Impedimentos identificados** e ações para resolução
- **Acompanhamento do progresso** do Sprint

| **Data** | **Link Direto** | **Descrição** |
|----------|-----------------|---------------|
| **12/09/2025** | [`ATA_DAILY_12.09.2025.pdf`](Dailys/ATA_DAILY_12.09.2025.pdf) | ATA da reunião diária de 12 de setembro |
| **16/09/2025** | [`ATA_DAILY_16.09.2025.pdf`](Dailys/ATA_DAILY_16.09.2025.pdf) | ATA da reunião diária de 16 de setembro |
| **18/09/2025** | [`ATA_DAILY_18.09.2025.pdf`](Dailys/ATA_DAILY_18.09.2025.pdf) | ATA da reunião diária de 18 de setembro |
| **22/09/2025** | [`ATA_DAILY_22.09.2025.pdf`](Dailys/ATA_DAILY_22.09.2025.pdf) | ATA da reunião diária de 22 de setembro |
| **24/09/2025** | [`ATA_DAILY_24.09.2025.pdf`](Dailys/ATA_DAILY_24.09.2025.pdf) | ATA da reunião diária de 24 de setembro |
| **26/09/2025** | [`ATA_DAILY_26.09.2025.pdf`](Dailys/ATA_DAILY_26.09.2025.pdf) | ATA da reunião diária de 26 de setembro |

### 📁 **Estrutura de Pastas Scrum**

A organização dos artefatos Scrum segue a estrutura padrão da metodologia, facilitando a localização e manutenção dos documentos:

```
ABP_2DSM/
├── Scrum/                           # Pasta principal dos artefatos Scrum
│   ├── Product Backlog/             # Backlog do produto
│   │   └── Product Backlog Completo.pdf
│   ├── Sprints/                     # Artefatos dos Sprints
│   │   └── Sprint 1/                # Sprint 1
│   │       └── Sprint Backlog/      # Backlog do Sprint
│   │           └── Sprint Backlog.pdf
│   └── Burndown Chart/              # Gráficos de progresso
│       └── Sprint 1/                # Burndown do Sprint 1
│           └── BurndownIdeal.png
└── Dailys/                          # Registros das reuniões diárias
    ├── ATA_DAILY_12.09.2025.pdf     # Daily de 12/09/2025
    ├── ATA_DAILY_16.09.2025.pdf     # Daily de 16/09/2025
    ├── ATA_DAILY_18.09.2025.pdf     # Daily de 18/09/2025
    ├── ATA_DAILY_22.09.2025.pdf     # Daily de 22/09/2025
    ├── ATA_DAILY_24.09.2025.pdf     # Daily de 24/09/2025
    └── ATA_DAILY_26.09.2025.pdf     # Daily de 26/09/2025
```

### 🎯 **Como Usar Este Dropdown**

1. **Para consultar requisitos**: Acesse o Product Backlog para ver todas as funcionalidades planejadas
2. **Para acompanhar o Sprint**: Use o Sprint Backlog e o Burndown Chart para monitorar o progresso
3. **Para consultar reuniões**: Acesse as ATAs das Dailys por data para ver o histórico de atividades
4. **Para navegação rápida**: Use os links diretos nas tabelas acima

### 📝 **Próximos Artefatos**

Conforme o projeto evolui, novos artefatos serão adicionados:
- **Sprint 2**: Novos Sprint Backlogs e Burndown Charts
- **Sprint Review**: Relatórios de revisão dos Sprints
- **Retrospectivas**: Análises de melhoria da equipe
- **Novas Dailys**: Registros das reuniões diárias futuras

</details>

<details>
<summary><b>📊 Arquivos CSV dos Bancos de Dados</b></summary>

Este projeto utiliza três bancos de dados distintos, cada um com seus próprios arquivos CSV contendo dados específicos das campanhas e monitoramento ambiental.

### 🗂️ **Estrutura dos Arquivos CSV**

#### 📁 **BALCAR Campanha**

| **Arquivo** | **Descrição** | **Link Direto** |
|-------------|---------------|-----------------|
| `tbcampanha.csv` | Dados das campanhas BALCAR | [`tbcampanha.csv`](balcar-campanha/csv/tbcampanha.csv) |
| `tbfluxoinpe.csv` | Fluxos de dados do INPE | [`tbfluxoinpe.csv`](balcar-campanha/csv/tbfluxoinpe.csv) |
| `tbinstituicao.csv` | Informações das instituições | [`tbinstituicao.csv`](balcar-campanha/csv/tbinstituicao.csv) |
| `tbreservatorio.csv` | Dados dos reservatórios | [`tbreservatorio.csv`](balcar-campanha/csv/tbreservatorio.csv) |
| `tbsitio.csv` | Informações dos sítios de coleta | [`tbsitio.csv`](balcar-campanha/csv/tbsitio.csv) |
| `tbtabelacampo.csv` | Campos das tabelas | [`tbtabelacampo.csv`](balcar-campanha/csv/tbtabelacampo.csv) |

#### 📁 **Furnas Campanha**

| **Arquivo** | **Descrição** | **Link Direto** |
|-------------|---------------|-----------------|
| `tbabioticocoluna.csv` | Dados abióticos da coluna d'água | [`tbabioticocoluna.csv`](furnas-campanha/csv/tbabioticocoluna.csv) |
| `tbabioticosuperficie.csv` | Dados abióticos da superfície | [`tbabioticosuperficie.csv`](furnas-campanha/csv/tbabioticosuperficie.csv) |
| `tbaguamateriaorganicasedimento.csv` | Água e matéria orgânica no sedimento | [`tbaguamateriaorganicasedimento.csv`](furnas-campanha/csv/tbaguamateriaorganicasedimento.csv) |
| `tbbioticocoluna.csv` | Dados bióticos da coluna d'água | [`tbbioticocoluna.csv`](furnas-campanha/csv/tbbioticocoluna.csv) |
| `tbbioticosuperficie.csv` | Dados bióticos da superfície | [`tbbioticosuperficie.csv`](furnas-campanha/csv/tbbioticosuperficie.csv) |
| `tbbolhas.csv` | Dados de bolhas de gás | [`tbbolhas.csv`](furnas-campanha/csv/tbbolhas.csv) |
| `tbcamarasolo.csv` | Dados de câmaras de solo | [`tbcamarasolo.csv`](furnas-campanha/csv/tbcamarasolo.csv) |
| `tbcampanha.csv` | Dados das campanhas Furnas | [`tbcampanha.csv`](furnas-campanha/csv/tbcampanha.csv) |
| `tbcampanhaportabela.csv` | Portas das tabelas de campanha | [`tbcampanhaportabela.csv`](furnas-campanha/csv/tbcampanhaportabela.csv) |
| `tbcampoportabela.csv` | Campos das tabelas de campanha | [`tbcampoportabela.csv`](furnas-campanha/csv/tbcampoportabela.csv) |
| `tbcarbono.csv` | Dados de carbono | [`tbcarbono.csv`](furnas-campanha/csv/tbcarbono.csv) |
| `tbconcentracaogasagua.csv` | Concentração de gases na água | [`tbconcentracaogasagua.csv`](furnas-campanha/csv/tbconcentracaogasagua.csv) |
| `tbconcentracaogassedimento.csv` | Concentração de gases no sedimento | [`tbconcentracaogassedimento.csv`](furnas-campanha/csv/tbconcentracaogassedimento.csv) |
| `tbdadosprecipitacao.csv` | Dados de precipitação | [`tbdadosprecipitacao.csv`](furnas-campanha/csv/tbdadosprecipitacao.csv) |
| `tbdadosrepresa.csv` | Dados das represas | [`tbdadosrepresa.csv`](furnas-campanha/csv/tbdadosrepresa.csv) |
| `tbdifusao.csv` | Dados de difusão | [`tbdifusao.csv`](furnas-campanha/csv/tbdifusao.csv) |
| `tbdupladessorcaoagua.csv` | Dessorção dupla da água | [`tbdupladessorcaoagua.csv`](furnas-campanha/csv/tbdupladessorcaoagua.csv) |
| `tbfluxobolhasinpe.csv` | Fluxo de bolhas do INPE | [`tbfluxobolhasinpe.csv`](furnas-campanha/csv/tbfluxobolhasinpe.csv) |
| `tbfluxocarbono.csv` | Fluxo de carbono | [`tbfluxocarbono.csv`](furnas-campanha/csv/tbfluxocarbono.csv) |
| `tbfluxodifusivo.csv` | Fluxo difusivo | [`tbfluxodifusivo.csv`](furnas-campanha/csv/tbfluxodifusivo.csv) |
| `tbfluxodifusivoinpe.csv` | Fluxo difusivo do INPE | [`tbfluxodifusivoinpe.csv`](furnas-campanha/csv/tbfluxodifusivoinpe.csv) |
| `tbgasesembolhas.csv` | Gases em bolhas | [`tbgasesembolhas.csv`](furnas-campanha/csv/tbgasesembolhas.csv) |
| `tbhoriba.csv` | Dados do equipamento Horiba | [`tbhoriba.csv`](furnas-campanha/csv/tbhoriba.csv) |
| `tbinstituicao.csv` | Informações das instituições | [`tbinstituicao.csv`](furnas-campanha/csv/tbinstituicao.csv) |
| `tbionsnaaguaintersticialdosedimento.csv` | Íons na água intersticial do sedimento | [`tbionsnaaguaintersticialdosedimento.csv`](furnas-campanha/csv/tbionsnaaguaintersticialdosedimento.csv) |
| `tbmedidacampocoluna.csv` | Medidas de campo da coluna | [`tbmedidacampocoluna.csv`](furnas-campanha/csv/tbmedidacampocoluna.csv) |
| `tbmedidacamposuperficie.csv` | Medidas de campo da superfície | [`tbmedidacamposuperficie.csv`](furnas-campanha/csv/tbmedidacamposuperficie.csv) |
| `tbnutrientessedimento.csv` | Nutrientes no sedimento | [`tbnutrientessedimento.csv`](furnas-campanha/csv/tbnutrientessedimento.csv) |
| `tbparametrosbiologicosfisicosagua.csv` | Parâmetros biológicos e físicos da água | [`tbparametrosbiologicosfisicosagua.csv`](furnas-campanha/csv/tbparametrosbiologicosfisicosagua.csv) |
| `tbpfq.csv` | Dados PFQ | [`tbpfq.csv`](furnas-campanha/csv/tbpfq.csv) |
| `tbreservatorio.csv` | Dados dos reservatórios | [`tbreservatorio.csv`](furnas-campanha/csv/tbreservatorio.csv) |
| `tbsitio.csv` | Informações dos sítios | [`tbsitio.csv`](furnas-campanha/csv/tbsitio.csv) |
| `tbtabela.csv` | Estrutura das tabelas | [`tbtabela.csv`](furnas-campanha/csv/tbtabela.csv) |
| `tbtc.csv` | Dados TC | [`tbtc.csv`](furnas-campanha/csv/tbtc.csv) |
| `tbvariaveisfisicasquimicasdaagua.csv` | Variáveis físicas e químicas da água | [`tbvariaveisfisicasquimicasdaagua.csv`](furnas-campanha/csv/tbvariaveisfisicasquimicasdaagua.csv) |

#### 📁 **SIMA (Sistema Integrado de Monitoramento Ambiental)**

| **Arquivo** | **Descrição** | **Link Direto** |
|-------------|---------------|-----------------|
| `tbcampotabela.csv` | Campos das tabelas SIMA | [`tbcampotabela.csv`](sima/csv/tbcampotabela.csv) |
| `tbestacao.csv` | Dados das estações | [`tbestacao.csv`](sima/csv/tbestacao.csv) |
| `tbsensor.csv` | Informações dos sensores | [`tbsensor.csv`](sima/csv/tbsensor.csv) |
| `tbsima.csv` | Dados principais do SIMA | [`tbsima.csv`](sima/csv/tbsima.csv) |
| `tbsimaoffline.csv` | Dados offline do SIMA | [`tbsimaoffline.csv`](sima/csv/tbsimaoffline.csv) |

### 📋 **Como Utilizar os Arquivos CSV**

1. **Para desenvolvimento**: Use os scripts SQL (`create-table.sql` e `copy-table.sql`) para criar e popular as tabelas
2. **Para análise**: Importe os arquivos diretamente em ferramentas como Excel, R ou Python
3. **Para consulta**: Acesse os dados através da interface web do projeto

### 🔧 **Scripts de Importação**

Cada pasta de banco contém scripts SQL para facilitar a importação:
- `create-table.sql`: Cria a estrutura das tabelas
- `copy-table.sql`: Importa os dados dos arquivos CSV

</details>

<details>
<summary><b>👥 Nossa Equipe</b></summary>

Esta seção apresenta todos os membros da equipe do projeto, incluindo papéis Scrum, links para GitHub e LinkedIn.

### 🎯 Gestão

| **Função** | **Nome** | **Links** |
|------------|----------|-----------|
| **Product Owner** | **Alicia Silva Dias** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/TIALICIA) |
| **Scrum Master** | **João Victor Lopes Rosa** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/JV-L0pes) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://br.linkedin.com/in/jv-l0pes) |


### 💻 Development Team

| **Nome** | **Links** |
|----------|-----------|
| **Pedro Claudino Nunes** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/PeClaudino2006) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://br.linkedin.com/in/pedro-claudino-0566472b9) |
| **Manuela Lucia Lemes de Castro** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/manuelalemes) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manuela-lemes-castro) |
| **Gabrielly Neu dos Santos** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/Gabrielly209) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrielly-neu-753906239) |
| **Leonardo da Silva Irineu** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/Leo-Slv) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leonardo-irineu-8418b0288) |

</details>

<details>
<summary><b>🎓 Contexto Acadêmico - ABP</b></summary>

Esta seção apresenta o contexto educacional do projeto, incluindo objetivos de aprendizagem, resultados esperados e impacto para estudantes, INPE e comunidade científica.

### 📚 Objetivos de Aprendizagem

Este projeto ABP visa desenvolver competências essenciais para profissionais de desenvolvimento de software:

#### **Competências Técnicas**
- **Desenvolvimento Full-Stack**: React + Node.js + PostgreSQL
- **Containerização**: Docker e Docker Compose
- **APIs REST**: Design e implementação de endpoints
- **Banco de Dados**: Modelagem e otimização de consultas
- **TypeScript**: Tipagem estática e desenvolvimento robusto

#### **Competências Metodológicas**
- **Scrum**: Metodologia ágil aplicada na prática
- **Gestão de Projeto**: Planejamento, execução e acompanhamento
- **Trabalho em Equipe**: Colaboração e comunicação eficaz
- **Documentação**: Criação de documentação técnica completa

#### **Competências de Domínio**
- **Ciência de Dados**: Manipulação e visualização de dados científicos
- **Sistemas Ambientais**: Compreensão de monitoramento hidrológico
- **Usabilidade**: Design de interfaces para usuários não-técnicos

### 🎯 Resultados Esperados

#### **Para os Estudantes**
- Experiência prática em desenvolvimento de software real
- Portfólio com projeto de impacto científico
- Competências alinhadas com mercado de trabalho
- Certificação em metodologias ágeis

#### **Para o INPE**
- Plataforma funcional para disseminação de dados
- Interface moderna e intuitiva
- Base para futuras expansões
- Documentação técnica completa

#### **Para a Comunidade Científica**
- Acesso aberto a dados limnológicos
- Ferramentas de análise e visualização
- Facilitação de pesquisas colaborativas
- Padronização de acesso a dados ambientais

### 📈 Impacto e Contribuição

Este projeto representa uma ponte entre:
- **Academia** (FATEC Jacareí) e **Pesquisa** (INPE)
- **Teoria** (conceitos de desenvolvimento) e **Prática** (aplicação real)
- **Tecnologia** (ferramentas modernas) e **Ciência** (dados ambientais)
- **Estudantes** (aprendizado) e **Sociedade** (benefício científico)

</details>

---

<div align="center">

**🌊 Sistema de Visualização e Disseminação de Dados Limnológicos**

*Projeto ABP - FATEC Jacareí | DSM 2025-2*

*Desenvolvido com ❤️ pela equipe ExceptionHandlers*

[![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Powered by React](https://img.shields.io/badge/Powered%20by-React-61dafb.svg)](https://reactjs.org/)
[![Database PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)](https://www.postgresql.org/)
[![Containerized with Docker](https://img.shields.io/badge/Containerized%20with-Docker-2496ED.svg)](https://www.docker.com/)

</div>

