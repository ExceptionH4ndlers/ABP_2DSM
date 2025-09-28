# 🌊 Sistema de Visualização e Disseminação de Dados Limnológicos

Sistema web desenvolvido para visualização e disseminação de dados limnológicos coletados pelo INPE em cooperação com UFRJ, UFJF e IIE, com o objetivo de subsidiar estudos sobre o Balanço de Carbono nos Reservatórios de Furnas Centrais Elétricas S.A.

<details>
<summary><b>📋 Informações do Projeto</b></summary>

### 📊 Dados Básicos

| Categoria | Detalhes |
|-----------|----------|
| 📍 Instituição | FATEC Jacareí |
| 📚 Curso | DSM - 2º Semestre 2025 |
| 🔄 Metodologia | Aprendizagem Baseada em Projetos (ABP) |
| 👤 Focal Point | André Olimpio |
| 🤝 Parceiro | INPE - Laboratório de Instrumentação de Sistemas Aquáticos (labISA) |
| 📅 Kick off | 16/09/2025 |
| 📊 Status | Em desenvolvimento |

### 🎯 Tema do Semestre

Desenvolver uma aplicação web para visualização e disseminação de dados limnológicos, permitindo acesso aberto a informações coletadas em campanhas e pelo SIMA (Sistema Integrado de Monitoração Ambiental).

### 🔍 Desafio e Tipos de Dados

O INPE, UFRJ, UFJF e IIE, em cooperação com Furnas Centrais Elétricas S.A., coletaram vasto conjunto de dados limnológicos e meteorológicos. Para que essas informações possam ser utilizadas em pesquisas no Brasil e no exterior, é necessária uma plataforma que possibilite a disseminação e o acesso aberto a esses dados.

#### 📊 Tipos de Dados

- **Parâmetros limnológicos**: Coletados manualmente em diversos locais dos reservatórios, em curtos períodos de tempo (campanhas)
- **Dados do SIMA**: Coletados automaticamente durante longos períodos, em um único ponto do reservatório

### ⚙️ Requisitos Funcionais

- **RF01**: Visualizar todos os parâmetros armazenados, filtrando por instituição, reservatório e período de tempo
- **RF02**: Consultar e visualizar os dados no formato de tabelas
- **RF03**: Consultar e exportar os dados no formato CSV
- **RF04**: Consultar e visualizar a localização dos dados em um mapa interativo
- **RF05**: Exibir os dados de séries temporais (parâmetros coletados pelo SIMA) em gráficos

### 🛠️ Requisitos Não Funcionais

- **RNF01**: Interface intuitiva, clara e de fácil navegação para usuários sem conhecimento técnico
- **RNF02**: Desempenho otimizado com carregamento rápido dos dados
- **RNF03**: Interface seguindo padrões institucionais do INPE

### 🔧 Restrições de Projeto

- **RP01**: Dados armazenados no SGBD PostgreSQL
- **RP02**: Back-end desenvolvido em Node.js com TypeScript
- **RP03**: Front-end desenvolvido em React com TypeScript
- **RP04**: Aplicação utilizando containers independentes para banco de dados, back-end e front-end


### 🚀 Tecnologias Utilizadas

- **Frontend**: React + TypeScript
- **Backend**: Node.js + TypeScript
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker
- **Metodologia**: Scrum/Agile

### 🏗️ Arquitetura e Estrutura Técnica

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

### ▶️ Como Executar o Projeto

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

### 📤 Exportação de Dados em CSV

Este projeto oferece a funcionalidade de **exportação de dados em formato CSV**, permitindo que os usuários consultem, filtrem e salvem os dados para uso em ferramentas como **Excel, LibreOffice, R e Python**.

---

### ✅ Funcionalidades Disponíveis

- Exportação de **todos os registros** da base de dados.
- Exportação de **registros filtrados**, com base nos filtros aplicados na interface.
- Inclusão de **cabeçalhos** (nomes das colunas) e **metadados** (como data de exportação e filtros aplicados).
- Arquivos compatíveis com:
  - Microsoft Excel (.csv com codificação UTF-8)
  - LibreOffice Calc
  - Linguagens de análise de dados: R, Python, etc.

---

### 📁 Como Gerar e Utilizar os Arquivos CSV

#### 1. Acesse a área de exportação
- Navegue até a tela/listagem da tabela desejada (por exemplo: `Campos da Tabela`, `Estações`, `Sensores`).
- Aplique os filtros necessários (opcional).

#### 2. Clique em “Exportar CSV”
- Um botão **Exportar CSV** estará visível.
- Sem filtros: todos os registros serão exportados.
- Com filtros: apenas os registros filtrados serão exportados.

#### 3. Download automático
- O arquivo será baixado automaticamente para o seu dispositivo.
- O nome seguirá o padrão:
exportacao_nomeTabela_YYYY-MM-DD_HH-MM.csv

---

### 🧾 Estrutura dos Arquivos CSV Gerados

#### 🧩 Exemplo: `tbcampotabela.csv`

##### Cabeçalho
idcampotabela;idsensor;nomecampo;rotulo;unidademedida;ordem

##### Dados
1;;sonda_bateria;Bateria da PTT;V;26
2;8;sonda_chl;Clorofila;ug/l;25
3;10;sonda_DO;Conc. de DO;mg/l;20

---

#### 🧩 Exemplo: `tbestacao.csv`

##### Cabeçalho
idestacao;idHexadecimal;rotulo;lat;lng;inicio;fim

##### Dados
30842;e1ea9;Balbina;-1.903697222;-59.46910833;2013-08-16;
30913;e3074;Ibitinga 3;-21.76121;-48.98112;2013-03-22;
30931;e34fd;Itumbiara 3;-18.283875;-48.906598;2009-11-18;2011-09-25

---

#### 🧩 Exemplo: `tbsensor.csv`

##### Cabeçalho
idSensor;nome;fabricante;modelo;faixa;precisao

##### Dados
1;Vento;R. M. Young Company;Marine Model 05106;0° a 360° Azimute;±3°
8;Sensor de Clorofila;Yellow Spring;YSI 6025;0 a 400 ug/l;0.1 ug/l
10;Sensor de Oxigênio Dissolvido;Yellow Spring;YSI 6562;0 a 50 mg/l;0.01 mg/l

---

### 📌 Metadados no CSV

Ao início ou fim do arquivo, podem estar presentes linhas de metadados, iniciadas com `#`, contendo informações úteis como:

Dados exportados em: 2025-09-26 14:32
Tabela: tbcampotabela
Total de registros exportados: 32
Filtros aplicados: idsensor = 10

> ⚠️ Linhas iniciadas com `#` são **ignoradas por leitores CSV padrão**, mas fornecem **contexto útil** para análise.

---

### 📥 Como Abrir os Arquivos CSV

#### 📊 Excel / LibreOffice
- Abra diretamente no software.
- Se necessário, escolha a codificação UTF-8.
- O separador padrão é `;` (ponto e vírgula). Altere nas configurações de importação, se necessário.

#### 📈 R
```r
dados <- read.csv2("caminho/do/arquivo.csv", header = TRUE, sep = ";", comment.char = "#")

#### 🐍 Python (pandas)
import pandas as pd

dados = pd.read_csv("caminho/do/arquivo.csv", sep=";", comment="#")

---

⚠️ Observações Importantes

Arquivos CSV são gerados com codificação UTF-8, garantindo suporte a acentos e caracteres especiais.

Para volumes grandes de dados, a geração pode levar alguns segundos.

Para exportar registros específicos, aplique os filtros desejados antes da exportação.

---

### 🛠️ Boas Práticas Aplicadas

- Separação clara de camadas (DB / API / Front)
- Containers independentes para cada banco
- Hot reload para server e front em dev
- ESLint + Prettier (garantindo padronização de código)
- CI no GitHub Actions

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

## 👥 Nossa Equipe

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

## 👨‍🏫 Coordenação e Orientação

| **Focal Point** |
|---------------|
| **André Olimpio** | 
