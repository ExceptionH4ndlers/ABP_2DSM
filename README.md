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

</details>

<details>
<summary><b>⚙️ Requisitos do Projeto</b></summary>

### ⚙️ Requisitos Funcionais

- **RF01**: Visualizar todos os parâmetros armazenados, filtrando por instituição, reservatório e período de tempo
- **RF02**: Consultar e visualizar os dados no formato de tabelas
- **RF03**: Consultar e exportar os dados no formato CSV
- **RF04**: Consultar e visualizar a localização dos dados em um mapa interativo
  - Implementado com Leaflet.js + OpenStreetMap
  - Markers diferenciados por tipo (SIMA, Furnas, BALCAR)
  - Clustering automático para melhor visualização
  - Filtros interativos por tipo, período e região
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

</details>

<details>
<summary><b>🚀 Tecnologias e Arquitetura</b></summary>

### 🚀 Tecnologias Utilizadas

- **Frontend**: React + TypeScript
- **Backend**: Node.js + TypeScript
- **Banco de Dados**: PostgreSQL
- **Mapeamento**: Leaflet.js, react-leaflet, leaflet.markercluster
- **Containerização**: Docker
- **Metodologia**: Scrum/Agile

### 🏗️ Arquitetura e Estrutura Técnica

#### 📂 Estrutura de Pastas

A organização do projeto segue uma separação clara entre bancos de dados (scripts e dados), servidor (código da aplicação) e configurações gerais.

```bash
ABP_2DSM/
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
│   │   │   ├── InteractiveMap.tsx      # Componente principal do mapa
│   │   │   ├── MapMarker.tsx           # Markers customizados com popups
│   │   │   ├── MapFilters.tsx          # Sistema de filtros do mapa
│   │   │   ├── MarkerClusterGroup.tsx  # Agrupamento de markers
│   │   ├── hooks/                # Hooks customizados
│   │   │   ├── useMapData.ts           # Hook para dados geográficos
│   │   ├── pages/                # Páginas (ex.: SimaPage)
│   │   └── styles/               # GlobalStyle + ThemeProvider
│   ├── Dockerfile
│   ├── vite.config.ts
│   └── package.json
│
├── scripts/                       # Scripts auxiliares
│   └── import-neon-data.py       # Script para importação de dados no Neon
├── Documentação/                  # Documentação do projeto
│   ├── Documentar fluxo de build e deploy responsivo .pdf
│   ├── Teste de usabilidade básica.pdf
│   └── Validação de Responsividade em diferentes Dispositivos – Sprint 1.pdf
├── testes/                        # Documentos de testes
│   └── Conduzir teste de usabilidade com usuários reais.pdf
├── diagramas/                     # Diagramas do projeto (Astah)
│   ├── balcar_campanha.asta
│   ├── furnas_campanha.asta
│   ├── sima.asta
│   └── UseCase_ABP.asta
├── figma/                         # Protótipos de interface
│   ├── Desktop - 3.pdf
│   ├── Desktop - 7.pdf
│   ├── Desktop - 8.pdf
│   └── Desktop - 9.pdf
├── TP_Requisitos/                 # Modelos TypeScript dos requisitos
├── koyeb.toml                     # Configuração de deploy no Koyeb
├── docker-compose.dev.yml         # Definições dos serviços Docker para ambiente de desenvolvimento
└── README.md                      # Documentação principal do projeto
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
- Leaflet.js v1.9.4 para mapas interativos
- OpenStreetMap como provedor de tiles (gratuito)
- Clustering para performance com +50 pontos
- Markers customizados com L.divIcon
- CSS do Leaflet importado no componente

**Banco de Dados**
- PostgreSQL 17 (um container por domínio: furnas-campanha, sima, balcar-campanha)
- Scripts SQL para `CREATE TABLE` e `COPY FROM CSV`
- Volumes persistentes para dados
- Cada banco acessível em uma porta distinta (5433, 5434, 5435)

**Deploy**
- Aplicação deployada e disponível em produção
- Front-end: [https://abp-2-dsm.vercel.app/](https://abp-2-dsm.vercel.app/) (Vercel)
- Script de importação de dados: `scripts/import-neon-data.py`

**CI/CD (planejado)**
- Este repositório ainda não possui pipeline ativo em `.github/workflows`.
- Plano: adicionar lint, build e testes para `server/` e `front/` em PRs na `main`.

</details>

<details>
<summary><b>▶️ Como Executar o Projeto</b></summary>

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
# API disponível em (local): http://localhost:3000

# Front-end
cd front
npm install
npm run dev
# App disponível em (local): http://localhost:5173
```

> Observação: as portas mapeadas via Docker são diferentes das portas padrão em desenvolvimento local (Vite 5173 e API 3000).

</details>

<details>
<summary><b>🔐 Variáveis de Ambiente</b></summary>

Crie um arquivo `.env` em `server/` quando rodar localmente:

```ini
# Porta interna do servidor Express
PORT=3000

# Quando em Docker, o log usa HOST_PORT (mapeado para 3001 no compose)
HOST_PORT=3001

# Bancos quando executando LOCAL (conectando nos containers via host)
DB_FURNAS_HOST=localhost
DB_FURNAS_PORT=5433
DB_FURNAS_USER=postgres
DB_FURNAS_PASSWORD=postgres
DB_FURNAS_NAME=bdfurnas-campanha

DB_SIMA_HOST=localhost
DB_SIMA_PORT=5434
DB_SIMA_USER=postgres
DB_SIMA_PASSWORD=postgres
DB_SIMA_NAME=bdsima

DB_BALCAR_HOST=localhost
DB_BALCAR_PORT=5435
DB_BALCAR_USER=postgres
DB_BALCAR_PASSWORD=postgres
DB_BALCAR_NAME=bdbalcar-campanha

# CORS para o front local
CORS_ORIGIN=http://localhost:5173

# Página padrão de paginação
PAGE_SIZE=20

# Nível de log
LOG_LEVEL=debug
```

No Docker, as variáveis já estão definidas no `docker-compose.dev.yml`.

</details>

<details>
<summary><b>🌐 Acessando a Aplicação</b></summary>

#### 🚀 **Produção (Deploy)**

A aplicação está disponível em produção:

- **Front-end (React)**: [https://abp-2-dsm.vercel.app/](https://abp-2-dsm.vercel.app/)

#### 💻 **Desenvolvimento Local**

- **Front-end (React)**:
  - Local: http://localhost:5173
  - Docker: http://localhost:3002
- **Back-end (API Node)**:
  - Local: http://localhost:3000
  - Docker: http://localhost:3001
  - Exemplo (Docker): http://localhost:3001/sima/sima/all?page=1&limit=20

</details>

---

<details>
<summary><b>📡 Referência de API</b></summary>

### 📡 Referência de API (resumo)

Rotas base:

- `/sima` — dados e metadados do SIMA
- `/furnas` — dados de campanhas Furnas
- `/balcar` — dados de campanhas BALCAR

Exemplos (SIMA):

```http
GET /sima/sima/all?page=1&limit=20
```

```http
POST /sima/query/select
Content-Type: application/json

{
  "query": "SELECT * FROM tbsima LIMIT 10"
}
```

Observações:
- Respostas paginadas respeitam `PAGE_SIZE` padrão (pode ser alterado via env).
- O CORS permite origem do front configurada em `CORS_ORIGIN`.

Endpoints úteis (Furnas):

```http
GET /furnas/campanha/all
GET /furnas/reservatorio/all
GET /furnas/meta/tables
GET /furnas/meta/tables/:table/columns
POST /furnas/query/select
```

Endpoints úteis (BALCAR):

```http
GET /balcar/campanha/all
GET /balcar/reservatorio/all
GET /balcar/instituicao/all
GET /balcar/tabelacampo/all
GET /balcar/meta/tables
GET /balcar/meta/tables/:table/columns
POST /balcar/query/select
```

Endpoints úteis (SIMA):

```http
GET /sima/sima/all
GET /sima/simaoffline/all
GET /sima/estacao/all
GET /sima/estacao/simple
GET /sima/meta/tables
GET /sima/meta/tables/:table/columns
POST /sima/query/select
```

#### Endpoints de Geolocalização (usados pelo Mapa Interativo)

```http
GET /sima/estacao/all
GET /furnas/reservatorio/all
GET /balcar/reservatorio/all
```

Retornam dados com campos `lat` e `lng` para plotagem no mapa.

### 📚 Documentação Swagger/OpenAPI

A API possui documentação completa e interativa usando Swagger UI, disponível em:

- **Interface Swagger UI**: `http://localhost:3000/api-docs`
- **Especificação OpenAPI (JSON)**: `http://localhost:3000/api-docs.json`

A documentação inclui:
- Todos os endpoints da API (SIMA, Furnas, BALCAR)
- Parâmetros de requisição e respostas
- Schemas de dados e exemplos
- Possibilidade de testar endpoints diretamente na interface
- Documentação de erros e códigos de status

#### Como usar a documentação Swagger

1. Inicie o servidor: `cd server && npm run dev`
2. Acesse `http://localhost:3000/api-docs` no navegador
3. Explore os endpoints organizados por tags (SIMA, Furnas, BALCAR)
4. Use o botão "Try it out" para testar os endpoints diretamente

</details>

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

<details>
<summary><b>🗺️ Mapa Interativo com Leaflet.js</b></summary>

Sistema de visualização geográfica que permite consultar a localização das estações SIMA e reservatórios monitorados.

### 🎯 Funcionalidades

- **Visualização Unificada**: Todos os pontos de monitoramento em um único mapa
- **Markers Diferenciados**: 
  - 🔵 Azul = Estações SIMA (~30 estações)
  - 🟢 Verde = Reservatórios Furnas (23 pontos)
  - 🟦 Ciano = Reservatórios BALCAR (18 pontos)
- **Clustering Inteligente**: Agrupamento automático de markers próximos
- **Popups Informativos**: Nome, coordenadas, período, link Google Maps
- **Filtros Avançados**:
  - Toggle por tipo (SIMA/Furnas/BALCAR)
  - Filtro por período (estações SIMA)
- **Desenho de Polígonos**: 
  - Desenhe polígonos no mapa clicando em pontos
  - Identifique estações dentro da área delimitada
  - Múltiplos polígonos simultâneos
  - Visualização destacada das estações selecionadas

### 🛠️ Tecnologias

- **Leaflet.js 1.9.4**: Biblioteca de mapas open source (42KB)
- **react-leaflet 5.0.0**: Wrapper React oficial
- **OpenStreetMap**: Tiles gratuitos, sem API key
- **leaflet.markercluster 1.5.3**: Agrupamento de markers

### 📍 Onde Encontrar

1. **Página Inicial**: Seção "Mapas Interativos"
2. **SIMA SPA**: Aba "Mapa" mostra apenas estações SIMA
3. **Furnas SPA**: Aba "Mapa" mostra apenas reservatórios Furnas
4. **BALCAR SPA**: Aba "Mapa" mostra apenas reservatórios BALCAR

### 🎮 Como Usar

1. **Navegação**:
   - Arraste para mover o mapa
   - Scroll/pinch para zoom
   - Duplo clique para zoom rápido

2. **Filtros**:
   - Clique no botão "Filtros" no canto superior direito
   - Marque/desmarque tipos de dados
   - Defina período para estações SIMA
   - Clique "Aplicar Filtros"

3. **Desenho de Polígonos**:
   - Clique no botão "Desenhar Polígono" para iniciar o modo de desenho
   - Clique em pontos no mapa para adicionar vértices do polígono
   - Clique em "Fechar Polígono" para finalizar a área
   - As estações dentro do polígono serão destacadas automaticamente
   - Use "Limpar Tudo" para remover todos os polígonos desenhados

4. **Markers e Clusters**:
   - Círculos com números = clusters (agrupamento)
   - Clique no cluster para expandir
   - Clique no marker individual para ver detalhes
   - Estações dentro de polígonos são destacadas visualmente

5. **Popups**:
   - Nome da estação/reservatório
   - Coordenadas geográficas
   - Período de monitoramento (SIMA)
   - Botão "Ver no Google Maps"

### ⚙️ Dados Exibidos

**Estações SIMA** (de `/api/sima/estacao/all`):
- ID da estação
- ID Hexadecimal
- Rótulo/Nome
- Latitude e Longitude
- Período início/fim

**Reservatórios Furnas/BALCAR** (de `/api/furnas|balcar/reservatorio/all`):
- ID do reservatório
- Nome
- Latitude e Longitude
- Estado (quando disponível)

### 🎨 Personalização

Markers utilizam cores específicas para cada tipo:
- **SIMA**: `#3b82f6` (azul)
- **Furnas**: `#22c55e` (verde)
- **BALCAR**: `#06b6d4` (ciano)

Clusters mudam de tamanho e cor conforme quantidade:
- 1-10 pontos: pequeno, azul claro
- 11-20 pontos: médio, azul
- 21+ pontos: grande, azul escuro

### 📱 Responsividade

- Desktop: altura 500px
- Mobile: altura 400px
- Touch gestures habilitados
- Controles otimizados para telas pequenas

### 🚀 Performance

- Clustering essencial para +50 pontos
- Renderização otimizada com React
- Cache de dados no frontend
- Lazy loading de tiles do mapa

### ⚠️ Observações

- **Gratuito**: OpenStreetMap não requer API key
- **Coordenadas válidas**: Pontos sem lat/lng são filtrados
- **Erro de rede**: Mensagem amigável exibida
- **Carregamento**: Overlay "Carregando mapa..." durante fetch

#### 🧪 Testes de Usabilidade do Mapa Interativo

O mapa interativo foi submetido a testes de usabilidade para validar funcionalidades e experiência do usuário.

**Testes Realizados**:
- ✅ Navegação intuitiva (zoom, pan, arraste)
- ✅ Cliques em markers e clusters
- ✅ Visualização de popups com informações
- ✅ Uso de filtros (tipos de dados, período)
- ✅ Responsividade em diferentes dispositivos
- ✅ Performance com +50 markers simultâneos
- ✅ Carregamento de dados da API
- ✅ Links para Google Maps funcionais

**Dispositivos Testados**:
- Desktop (Chrome, Edge, Firefox)
- Tablet (iPad, Android)
- Mobile (iOS, Android)

**Resultados**:
- Tempo médio de carregamento: < 2 segundos
- Taxa de sucesso na interação: 95%+
- Feedback positivo dos usuários sobre visualização geográfica
- Clustering melhora significativamente a experiência com muitos pontos

**Melhorias Identificadas**:
- Adicionar legenda permanente de cores
- Implementar busca por nome de estação/reservatório
- Adicionar zoom automático ao selecionar filtros
- Melhorar contraste dos popups (acessibilidade)

</details>

<details>
<summary><b>📊 Gráficos de Séries Temporais com Recharts</b></summary>

Sistema de visualização de dados que permite consultar e analisar séries temporais dos parâmetros limnológicos coletados pelo SIMA através de gráficos interativos.

### 🎯 Funcionalidades

- **Gráficos de Linha (Séries Temporais)**: Visualização da evolução temporal de múltiplos parâmetros simultaneamente
- **Gráficos de Dispersão (Scatter)**: Análise de correlação entre dois parâmetros diferentes
- **Filtros Avançados**: 
  - Seleção de estação específica
  - Seleção de múltiplos parâmetros simultaneamente
  - Filtro por período (data inicial e final)
  - Agrupamento por categoria de parâmetros
- **Seleção de Período Interativa**: 
  - Seletores de data inicial e final
  - Informações sobre o range de dados disponível
  - Filtragem dinâmica dos dados exibidos
- **Exportação de Dados**: Exportação dos dados do gráfico em formato CSV

### 🛠️ Tecnologias

- **Recharts**: Biblioteca de gráficos para React
- **React Hooks**: `useSimaChartData` para processamento de dados
- **TypeScript**: Tipagem completa dos dados e componentes

### 📍 Onde Encontrar

1. **Página Inicial**: Seção "Gráficos Temporais"
2. **SIMA SPA**: Aba "Gráficos" com acesso completo aos gráficos interativos

### 🎮 Como Usar

1. **Seleção de Filtros**:
   - Escolha uma estação do SIMA
   - Selecione os parâmetros que deseja visualizar
   - Defina o período de análise (opcional)
   - Escolha o tipo de gráfico (linha ou dispersão)

2. **Gráficos de Linha**:
   - Visualize múltiplos parâmetros em um único gráfico
   - Cada parâmetro é representado por uma linha colorida
   - Use os seletores de data para filtrar o período exibido
   - Passe o mouse sobre os pontos para ver valores detalhados

3. **Gráficos de Dispersão**:
   - Selecione um parâmetro para o eixo X
   - Selecione um parâmetro para o eixo Y
   - Analise correlações e padrões entre os parâmetros
   - Cada ponto representa uma medição no tempo

4. **Exportação**:
   - Clique em "Exportar Dados (CSV)" para baixar os dados do gráfico
   - O arquivo inclui todos os dados filtrados e exibidos

### ⚙️ Dados Processados

**Gráficos de Linha**:
- Dados agrupados por data/hora
- Múltiplos parâmetros exibidos simultaneamente
- Valores médios quando há múltiplas medições no mesmo período
- Suporte a até 200.000 registros por estação

**Gráficos de Dispersão**:
- Cada ponto representa uma medição individual
- Coordenadas X e Y baseadas nos parâmetros selecionados
- Informações de data/hora e estação no tooltip

### 🎨 Personalização

**Cores dos Parâmetros**:
- Cada parâmetro recebe uma cor única automaticamente
- Paleta de 10 cores pré-definidas
- Cores consistentes entre diferentes visualizações

**Tipos de Gráfico**:
- **Linha**: Ideal para análise temporal e tendências
- **Dispersão**: Ideal para análise de correlações e padrões

### 🚀 Performance

- Processamento otimizado de grandes volumes de dados
- Limite de 200.000 registros por estação para garantir performance
- Renderização eficiente com Recharts
- Cache de dados processados

### ⚠️ Observações

- **Estação Obrigatória**: É necessário selecionar uma estação para visualizar gráficos
- **Parâmetros Obrigatórios**: É necessário selecionar pelo menos um parâmetro
- **Dados Vazios**: Se não houver dados para os filtros selecionados, o gráfico não será exibido
- **Período Longo**: Para períodos muito longos, o processamento pode levar alguns segundos

### 📊 Parâmetros Disponíveis

Os gráficos suportam todos os parâmetros coletados pelo SIMA, incluindo:
- Temperatura da água
- Oxigênio dissolvido
- pH
- Condutividade
- Clorofila
- Turbidez
- E muitos outros parâmetros limnológicos

Cada parâmetro possui:
- Nome descritivo
- Unidade de medida
- Categoria (físico, químico, biológico)

</details>

<details>
<summary><b>🏃‍♂️ Artefatos Scrum - Acesso Rápido</b></summary>

Este dropdown contém todos os artefatos e documentos relacionados à metodologia Scrum utilizada no desenvolvimento do projeto. Aqui você encontrará acesso direto aos documentos de planejamento, acompanhamento e reuniões da equipe.

### 📋 **Acesso Direto aos Artefatos**

| **Artefato** | **Link Direto** | **Descrição** |
|--------------|-----------------|---------------|
| **📋 Product Backlog** | [`Product Backlog Completo.pdf`](Scrum/Product%20Backlog/Product%20Backlog%20Completo.pdf) | Documento completo com todas as histórias de usuário, requisitos funcionais e não funcionais do projeto |
| **🏃‍♂️ Sprint Planning Sprint 1** | [`Sprint Backlog.pdf`](Scrum/Sprints/Sprint%201/Sprint%20Backlog/Sprint%20Backlog.pdf) | Tarefas e atividades planejadas para o Sprint 1, incluindo estimativas e responsáveis |
| **🏃‍♂️ Sprint Planning Sprint 2** | [`SPRINT BACKLOG 2.pdf`](Scrum/Sprints/Sprint%202/Sprint%20Backlog/SPRINT%20BACKLOG%202.pdf) | Tarefas e atividades planejadas para o Sprint 2, incluindo estimativas e responsáveis |
| **🏃‍♂️ Sprint Planning Sprint 3** | [`SPRINT BACKLOG 3.pdf`](Scrum/Sprints/Sprint%203/Sprint%20Backlog/SPRINT%20BACKLOG%203.pdf) | Tarefas e atividades planejadas para o Sprint 3, incluindo estimativas e responsáveis |
| **📊 Burndown Chart Sprint 1** | [`BurndownSP1.png`](Scrum/Burndown%20Chart/Sprint%201/BurndownSP1.png) | Gráfico de progresso do Sprint 1 para acompanhamento da evolução das atividades |
| **📊 Burndown Chart Sprint 2** | [`BurndownSP2.png`](Scrum/Burndown%20Chart/Sprint%202/BurndownSP2.png) | Gráfico de progresso da Sprint 2 para acompanhamento da evolução das atividades |
| **📊 Burndown Chart Sprint 3** | [`BurndownSP3.png`](Scrum/Burndown%20Chart/Sprint%203/BurndownSP3.png) | Gráfico de progresso da Sprint 3 para acompanhamento da evolução das atividades (a ser adicionado) |

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
│   │   ├── Sprint 1/                # Sprint 1
│   │   │   └── Sprint Backlog/      # Backlog do Sprint
│   │   │       └── Sprint Backlog.pdf
│   │   ├── Sprint 2/                # Sprint 2
│   │   │   └── Sprint Backlog/      # Backlog do Sprint
│   │   │       └── SPRINT BACKLOG 2.pdf
│   │   └── Sprint 3/                # Sprint 3
│   │       └── Sprint Backlog/      # Backlog do Sprint
│   │           └── SPRINT BACKLOG 3.pdf
│   └── Burndown Chart/              # Gráficos de progresso
│       ├── Sprint 1/                # Burndown do Sprint 1
│       │   └── BurndownSP1.png
│       ├── Sprint 2/                # Burndown do Sprint 2
│       │   └── BurndownSP2.png
│       └── Sprint 3/                # Burndown do Sprint 3
│           └── BurndownSP3.png
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

### 📝 **Artefatos do Projeto**

Todos os artefatos principais do projeto foram concluídos:
- **Sprint 3**: Sprint Backlog, Burndown Chart (a ser adicionado) e retrospectiva completa
- **Sprint Review**: Relatórios de revisão dos Sprints
- **Retrospectivas**: Análises de melhoria da equipe para todas as sprints
- **Dailys**: Registros das reuniões diárias realizadas durante o projeto

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
<summary><b>🔄 Sprint 1 - Retrospectiva</b></summary>

### 📊 **Resumo da Sprint**

A primeira sprint do projeto foi marcada por desafios significativos que impactaram nossa produtividade, mas mesmo assim conseguimos entregar um MVP funcional próximo ao planejado.

### 📈 **Acompanhamento do Progresso**

O Burndown Chart da Sprint 1 está disponível para consulta:

| **Artefato** | **Link Direto** | **Status** |
|--------------|-----------------|------------|
| **📊 Burndown Chart Sprint 1** | [`BurndownSP1.png`](Scrum/Burndown%20Chart/Sprint%201/BurndownSP1.png) | Concluído |

O gráfico reflete os desafios enfrentados durante a sprint, com ajustes no planejamento devido aos impedimentos iniciais.

## 🧩 Validação de Tasks

As tasks foram validadas conforme os requisitos estabelecidos e a participação e contribuição de cada integrante no projeto, considerando as ideias definidas tanto pelo grupo quanto pelos professores.

### 🔍 Processo de Validação

O passo a passo seguido para a validação foi o seguinte:

1. Verificar se a task estava devidamente **commitada no repositório GitHub** do grupo;  
2. Ir até a **mesa do integrante** responsável para observar como ele(a) desenvolveu cada detalhe, entender suas dúvidas e analisar os resultados obtidos;  
3. Adicionar um **novo comentário no card correspondente no Trello**, descrevendo a avaliação feita sobre o resultado do integrante e a qualidade da entrega.

### 🚧 **Principais Desafios Enfrentados**

#### 📢 **Comunicação e Coordenação**
- **Falta de consenso entre professores**: Não houve um alinhamento inicial entre os professores sobre como seria a nova ABP, com orientações conflitantes
- **Veredito tardio**: A definição final de como seria o projeto só chegou no final da sprint, causando confusão e retrabalho
- **Dúvidas sobre tasks**: Muitos membros da equipe apresentaram incertezas sobre suas responsabilidades devido à falta de clareza geral
- **Falta de clareza nos requisitos**: Os requisitos mudaram conforme os professores chegavam a um consenso, causando retrabalho significativo

#### 🔄 **Gestão de Processos**
- **Muitas refatorações no Kanban**: O quadro de tarefas precisou ser reorganizado várias vezes durante a sprint
- **Mudanças frequentes de escopo**: Algumas tarefas foram modificadas ou canceladas durante o desenvolvimento

#### ⏰ **Impacto no Tempo**
- **Perda de tempo significativa**: A falta de consenso entre professores e o veredito tardio consumiram tempo valioso que poderia ser usado no desenvolvimento
- **Retrabalho excessivo**: Muitas tarefas precisaram ser refeitas ou canceladas para atender às novas solicitações dos professores
- **Atrasos nas entregas**: Algumas funcionalidades foram entregues com atraso devido aos impedimentos causados pela falta de clareza inicial

### ✅ **Resultados Alcançados**

#### 🎯 **MVP Funcional Entregue**
- **Sistema básico funcionando**: Conseguimos entregar um produto mínimo viável com funcionalidades essenciais
- **Interface web operacional**: O front-end está funcional com navegação básica
- **API backend estabelecida**: O servidor está rodando e respondendo às requisições
- **Banco de dados configurado**: Os três bancos (BALCAR, Furnas e SIMA) estão operacionais

#### 🏗️ **Infraestrutura Sólida**
- **Docker configurado**: Ambiente de desenvolvimento containerizado funcionando
- **CI/CD (planejado)**: Pipeline em definição para automatizar lint/build/test
- **Estrutura de projeto definida**: Organização clara entre front-end, back-end e bancos de dados

### 📈 **Lições Aprendidas**

#### 🔧 **Melhorias para Próximas Sprints**
- **Alinhamento inicial com professores**: Buscar clareza total sobre requisitos e expectativas antes do início da sprint
- **Documentação detalhada**: Criar documentação mais específica para cada tarefa baseada nos requisitos finais
- **Padronização de processos**: Definir padrões claros para desenvolvimento e gestão de tarefas
- **Revisões mais frequentes**: Implementar checkpoints regulares para validar o progresso e evitar retrabalho

#### 🎯 **Pontos Positivos**
- **Resiliência da equipe**: Mesmo com os desafios, a equipe manteve o foco na entrega
- **Adaptabilidade**: Conseguimos nos adaptar aos problemas e encontrar soluções
- **Qualidade técnica**: O código entregue mantém boa qualidade apesar dos desafios

### 🚀 **Próximos Passos**

Para a Sprint 2, focaremos em:
- **Garantir alinhamento total** com os professores antes do início das atividades
- **Refinar os processos** de gestão de tarefas baseados nos requisitos finais
- **Expandir as funcionalidades** do MVP entregue
- **Implementar melhorias** baseadas no feedback da Sprint 1

### 🎉 **Conclusão**

Apesar dos desafios significativos enfrentados na Sprint 1, conseguimos entregar um MVP funcional que atende aos requisitos básicos do projeto. Os problemas identificados serão abordados nas próximas sprints para melhorar nossa eficiência e qualidade de entrega.

A experiência desta sprint nos ensinou muito sobre a importância do alinhamento inicial com os stakeholders (professores) e da clareza nos requisitos, lições valiosas que aplicaremos nas próximas iterações do projeto.

</details>

<details>
<summary><b>🔄 Sprint 2 - Retrospectiva</b></summary>

### 📊 **Resumo da Sprint**

A segunda sprint do projeto foi marcada por resultados significativamente mais positivos em relação à Sprint 1. A equipe conseguiu aplicar as lições aprendidas, melhorar a comunicação e coordenação, e entregar funcionalidades avançadas que elevaram a qualidade do produto. O feedback do cliente foi muito positivo, destacando a melhoria na apresentação e na qualidade das entregas.

### 📈 **Acompanhamento do Progresso**

O Burndown Chart da Sprint 2 está disponível para consulta:

| **Artefato** | **Link Direto** | **Status** |
|--------------|-----------------|------------|
| **📊 Burndown Chart Sprint 2** | [`BurndownSP2.png`](Scrum/Burndown%20Chart/Sprint%202/BurndownSP2.png) | Concluído |

O gráfico demonstra o progresso consistente da equipe ao longo da sprint, com entregas regulares e cumprimento do planejamento estabelecido.

### 🧩 Validação de Tasks

As tasks foram validadas seguindo o mesmo processo estabelecido na Sprint 1, mas com maior eficiência e clareza:

1. Verificar se a task estava devidamente **commitada no repositório GitHub** do grupo;  
2. Ir até a **mesa do integrante** responsável para observar como ele(a) desenvolveu cada detalhe, entender suas dúvidas e analisar os resultados obtidos;  
3. Adicionar um **novo comentário no card correspondente no Trello**, descrevendo a avaliação feita sobre o resultado do integrante e a qualidade da entrega.

**Melhorias no processo de validação:**
- Maior clareza nos requisitos desde o início da sprint
- Menos retrabalho e mais eficiência na validação
- Feedback mais rápido e construtivo para os desenvolvedores

### 🚧 **Principais Desafios Enfrentados**

#### 🗺️ **Desafios Técnicos**

- **Integração de bibliotecas de mapas**: A implementação do Leaflet.js exigiu aprendizado sobre renderização de mapas, clustering de markers e integração com React
- **Performance com muitos pontos**: Otimização necessária para renderizar mais de 70 pontos simultaneamente no mapa sem comprometer a performance
- **Exportação CSV avançada**: Desenvolvimento de parser personalizado com múltiplas opções de formatação e metadados ricos
- **Lazy loading e code splitting**: Implementação de carregamento assíncrono de páginas para melhorar o tempo inicial de carregamento

#### 🔄 **Gestão e Coordenação**

- **Melhorias em relação à Sprint 1**: A comunicação com professores foi mais clara desde o início, reduzindo significativamente os problemas de alinhamento
- **Coordenação de features complexas**: O mapa interativo exigiu coordenação entre múltiplos desenvolvedores trabalhando em componentes diferentes
- **Balanceamento de prioridades**: Decisões sobre quais melhorias de UX implementar primeiro

### ✅ **Resultados Alcançados**

#### 🎯 **Funcionalidades Entregues**

##### 🗺️ **Mapa Interativo Completo**
- **Implementação com Leaflet.js**: Sistema completo de visualização geográfica
  - ~30 estações SIMA mapeadas com coordenadas precisas
  - 23 reservatórios Furnas plotados
  - 18 reservatórios BALCAR plotados
  - Total de 71 pontos geográficos visualizáveis
- **Sistema de Clustering**: Agrupamento inteligente de markers próximos para melhor performance
- **Filtros Avançados**: 
  - Toggle por tipo de dados (SIMA/Furnas/BALCAR)
  - Filtro por período para estações SIMA
  - Sidebar de filtros em modo fullscreen
- **Funcionalidades Interativas**:
  - Modo fullscreen para visualização imersiva
  - Popups informativos com coordenadas e links para Google Maps
  - Markers customizados com cores diferenciadas por tipo
  - Navegação intuitiva com zoom, pan e arraste
- **Integração Multi-página**: Mapa disponível em 4 locais diferentes (HomePage, SIMA, Furnas, BALCAR)

##### 📊 **Exportação CSV Aprimorada**
- **Modal de Configuração**: Interface amigável para configurar opções de exportação
- **Opções de Formatação**:
  - Separadores: ponto e vírgula (padrão BR), vírgula ou tabulação
  - Encoding: UTF-8 ou ISO-8859-1
  - Formato de data: ISO, BR ou US
- **Metadados Ricos**: 
  - Informações sobre data de geração, período, estação/reservatório
  - Total de registros e campos incluídos
  - Descrição da estrutura dos dados
- **Compatibilidade Multiplataforma**: Arquivos otimizados para Excel, LibreOffice, R, Python e outras ferramentas

##### 🎨 **Melhorias de Interface e UX**
- **Skeleton Loaders**: Componentes de loading placeholders para melhor feedback visual
  - SkeletonMap para mapas
  - SkeletonTable para tabelas
  - SkeletonCard para cards
- **Loading Modal Global**: Sistema centralizado de loading com mensagens customizáveis
- **Lazy Loading de Páginas**: Carregamento assíncrono usando React.lazy e Suspense
- **Melhorias Visuais**: 
  - Animações suaves em transições
  - Feedback visual em todas as interações
  - Design mais polido e profissional

##### 🔍 **Filtros e Busca**
- **Sistema de Filtros no Mapa**: Filtros interativos com sidebar responsiva
- **Filtros por Período**: Funcionalidade específica para estações SIMA
- **Interface de Filtros Intuitiva**: Toggles e seletores fáceis de usar

##### 🧪 **Testes e Qualidade**
- **Estrutura de Testes**: Implementação de testes básicos no backend
  - Testes de integração para rotas
  - Testes unitários para serviços
- **Validação Manual**: Testes de usabilidade do mapa interativo realizados
- **Documentação Técnica**: Melhorias na documentação de componentes e hooks

#### 🏗️ **Melhorias Técnicas**

- **Performance Otimizada**: 
  - Code splitting com React.lazy
  - Clustering de markers para renderização eficiente
  - Cache de dados no frontend
- **Arquitetura Melhorada**:
  - Componentes mais reutilizáveis e modulares
  - Hooks customizados bem estruturados (useMapData, useCsvExport)
  - Separação clara de responsabilidades
- **Código Mais Limpo**:
  - Padrões consistentes de código
  - Melhor organização de arquivos e pastas
  - TypeScript bem tipado

### 📈 **Lições Aprendidas**

#### ✅ **Melhorias Aplicadas da Sprint 1**

- **Alinhamento com Stakeholders**: A comunicação com professores foi muito mais clara desde o início, evitando retrabalho
- **Processos Mais Eficientes**: O processo de validação de tasks foi mais ágil e menos burocrático
- **Comunicação Melhorada**: Daily Scrums mais focados e produtivos
- **Planejamento Mais Realista**: Estimativas mais precisas baseadas na experiência da Sprint 1

#### 🎯 **Novos Aprendizados**

- **Integração de Bibliotecas Externas**: Experiência valiosa com Leaflet.js e suas particularidades no React
- **Otimização de Performance**: Técnicas de clustering, lazy loading e code splitting
- **UX/UI Avançada**: Importância de skeleton loaders e feedback visual para melhor experiência do usuário
- **Parser CSV Personalizado**: Desenvolvimento de solução customizada para atender necessidades específicas do projeto
- **Testes em TypeScript**: Estruturação de testes em ambiente Node.js com TypeScript

#### 🎯 **Pontos Positivos**

- **Feedback Positivo do Cliente**: O cliente demonstrou satisfação com a melhoria na apresentação e qualidade das entregas
- **Crescimento da Equipe**: Desenvolvedores ganharam confiança e experiência com tecnologias mais avançadas
- **Qualidade Técnica**: Código mais limpo, organizado e manutenível
- **Produtividade Aumentada**: Menos impedimentos e mais foco no desenvolvimento

### 🚀 **Próximos Passos**

Para a Sprint 3, focaremos em:

- **Funcionalidades Avançadas de Visualização**: Gráficos mais sofisticados e dashboards interativos
- **Melhorias no Mapa**: Busca por nome de estação/reservatório, legenda permanente, zoom automático
- **Acessibilidade**: Melhorias na navegação por teclado e suporte a screen readers
- **Testes Automatizados**: Expansão da cobertura de testes no frontend e backend
- **Performance**: Otimizações adicionais baseadas em métricas reais de uso
- **Documentação de Usuário**: Guias mais detalhados para usuários finais

### 🎉 **Conclusão**

A Sprint 2 representou um salto significativo em qualidade e produtividade em relação à Sprint 1. A aplicação das lições aprendidas resultou em um processo mais eficiente, entregas de maior qualidade e feedback extremamente positivo do cliente. 

As funcionalidades implementadas, especialmente o mapa interativo e a exportação CSV aprimorada, elevaram o produto a um novo patamar, tornando-o mais útil e profissional. A equipe demonstrou grande capacidade de aprendizado e adaptação, consolidando uma base sólida para as próximas sprints.

A experiência desta sprint reforçou a importância de um bom planejamento inicial, comunicação clara com stakeholders e foco na qualidade técnica. Esses princípios serão mantidos e aprimorados nas próximas iterações do projeto.

</details>

<details>
<summary><b>🔄 Sprint 3 - Retrospectiva</b></summary>

### 📊 **Resumo da Sprint**

A terceira e última sprint do projeto foi marcada por resultados ainda mais positivos em relação à Sprint 2. A equipe conseguiu se ater ao cronograma estabelecido, finalizar todas as funcionalidades planejadas e entregar um projeto completo e satisfatório. O projeto foi finalizado com sucesso, superando as expectativas e demonstrando a evolução contínua da equipe ao longo das três sprints.

### 📈 **Acompanhamento do Progresso**

O Burndown Chart da Sprint 3 está disponível para consulta:

| **Artefato** | **Link Direto** | **Status** |
|--------------|-----------------|------------|
| **📊 Burndown Chart Sprint 3** | [`BurndownSP3.png`](Scrum/Burndown%20Chart/Sprint%203/BurndownSP3.png) | A ser adicionado |

O gráfico refletirá o progresso consistente da equipe ao longo da sprint, com cumprimento do cronograma e entrega de todas as funcionalidades planejadas.

### 🧩 Validação de Tasks

As tasks foram validadas seguindo o mesmo processo estabelecido nas sprints anteriores, com ainda maior eficiência e maturidade:

1. Verificar se a task estava devidamente **commitada no repositório GitHub** do grupo;  
2. Ir até a **mesa do integrante** responsável para observar como ele(a) desenvolveu cada detalhe, entender suas dúvidas e analisar os resultados obtidos;  
3. Adicionar um **novo comentário no card correspondente no Trello**, descrevendo a avaliação feita sobre o resultado do integrante e a qualidade da entrega.

**Evolução no processo de validação:**
- Processo totalmente consolidado e eficiente
- Validações mais rápidas e objetivas
- Feedback construtivo e imediato
- Maior autonomia dos desenvolvedores

### 🚧 **Principais Desafios Enfrentados**

#### 🎯 **Desafios Técnicos**

- **Finalização de funcionalidades complexas**: Consolidação e refinamento de todas as features desenvolvidas nas sprints anteriores
- **Integração de componentes**: Garantir que todas as partes do sistema funcionem harmoniosamente
- **Documentação completa**: Elaboração de documentação técnica e de usuário abrangente
- **Preparação para deploy final**: Otimizações e ajustes finais para ambiente de produção

#### 🔄 **Gestão e Coordenação**

- **Manter o foco no cronograma**: Disciplina para seguir o planejamento e não se desviar do escopo
- **Coordenação de finalização**: Garantir que todos os membros da equipe finalizassem suas tarefas no prazo
- **Priorização de entregas**: Decisões sobre quais melhorias finais implementar para maximizar o valor do produto

### ✅ **Resultados Alcançados**

#### 🎯 **Funcionalidades Entregues**

##### 📊 **Documentação e Diagramas**

- **Documentação Swagger/OpenAPI Completa**: 
  - Interface interativa disponível em `http://localhost:3000/api-docs`
  - Documentação completa de todos os endpoints (SIMA, Furnas, BALCAR)
  - Possibilidade de testar endpoints diretamente na interface
  - Schemas de dados e exemplos detalhados
  - Documentação de erros e códigos de status
- **Diagrama de Sequência**: 
  - Diagrama completo do fluxo de interação do sistema (`Sequence_ABP.asta`)
  - Documentação visual das interações entre componentes
  - Disponível na pasta `diagramas/` do projeto
- **Diagramas de Modelo de Dados**: 
  - Modelos conceituais dos bancos de dados (BALCAR, Furnas, SIMA)
  - Diagramas de casos de uso (`UseCase_ABP.asta`)
  - Documentação visual completa da arquitetura

##### 🚀 **Deploy e Produção**

- **Aplicação em Produção**: 
  - Front-end deployado e disponível em produção
  - Sistema totalmente funcional e acessível
  - Ambiente estável e otimizado
- **Infraestrutura Consolidada**: 
  - Configuração de deploy finalizada
  - Ambiente de produção configurado e testado
  - Monitoramento e logs implementados

##### 🎨 **Melhorias Finais de Interface**

- **Refinamentos de UX**: 
  - Ajustes finos na interface baseados em feedback
  - Melhorias de acessibilidade
  - Otimizações de performance visual
- **Consistência Visual**: 
  - Padronização completa de componentes
  - Design system consolidado
  - Experiência do usuário uniforme em todas as páginas

##### 🧪 **Testes e Qualidade**

- **Estrutura de Testes Expandida**: 
  - Cobertura de testes aumentada no backend
  - Testes de integração aprimorados
  - Validação completa das funcionalidades principais
- **Qualidade de Código**: 
  - Código revisado e otimizado
  - Padrões de código consistentes
  - Documentação inline completa

#### 🏗️ **Melhorias Técnicas Finais**

- **Performance Otimizada**: 
  - Otimizações finais baseadas em testes reais
  - Cache e lazy loading refinados
  - Tempo de carregamento otimizado
- **Arquitetura Consolidada**: 
  - Estrutura de projeto finalizada e documentada
  - Padrões arquiteturais bem definidos
  - Código modular e manutenível
- **Documentação Técnica Completa**: 
  - README atualizado e completo
  - Documentação de API detalhada
  - Guias de desenvolvimento e deploy

### 📈 **Lições Aprendidas**

#### ✅ **Melhorias Aplicadas das Sprints Anteriores**

- **Cronograma Respeitado**: A disciplina em seguir o planejamento foi fundamental para o sucesso
- **Processos Consolidados**: Todos os processos de desenvolvimento e validação estavam bem estabelecidos
- **Comunicação Eficiente**: Daily Scrums focados e produtivos, sem desperdício de tempo
- **Foco na Qualidade**: Priorização da qualidade sobre quantidade de features

#### 🎯 **Novos Aprendizados**

- **Importância da Documentação**: Documentação completa é essencial para manutenção e evolução do projeto
- **Valor dos Diagramas**: Diagramas de sequência e arquitetura facilitam compreensão e comunicação
- **Deploy e Produção**: Experiência valiosa com deploy e configuração de ambiente de produção
- **Finalização de Projeto**: Habilidades de finalização e consolidação de projetos complexos

#### 🎯 **Pontos Positivos**

- **Projeto Finalizado com Sucesso**: Todas as funcionalidades entregues e funcionando
- **Cronograma Respeitado**: Conseguiram se ater ao cronograma estabelecido
- **Evolução Contínua**: Melhoria constante em relação às sprints anteriores
- **Resultado Satisfatório**: Projeto finalizado com qualidade e dentro do prazo
- **Crescimento da Equipe**: Desenvolvedores demonstraram maturidade técnica e de processos

### 🎉 **Conclusão**

A Sprint 3 representou a consolidação de todo o trabalho desenvolvido nas sprints anteriores. A equipe conseguiu finalizar o projeto com sucesso, respeitando o cronograma e entregando um resultado que superou as expectativas.

O projeto foi finalizado de forma satisfatória, com todas as funcionalidades implementadas, documentação completa e sistema em produção. A evolução da equipe ao longo das três sprints foi notável, passando de desafios iniciais na Sprint 1 para um processo maduro e eficiente na Sprint 3.

A experiência das três sprints ensinou muito sobre desenvolvimento ágil, trabalho em equipe, gestão de projetos e qualidade técnica. O resultado final demonstra que a aplicação das lições aprendidas em cada sprint foi fundamental para o sucesso do projeto.

O projeto está completo, funcional e pronto para uso, representando um marco importante na jornada de aprendizado da equipe e um produto de valor para o parceiro INPE e para a comunidade científica que utilizará os dados limnológicos disponibilizados.

</details>

## 👥 Nossa Equipe

### 🎯 Gestão

| **Função** | **Nome** | **Links** |
|------------|----------|-----------|
| **Product Owner** | **Alicia Silva Dias** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/TIALICIA) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alicia-silva-dias-656b2817a/) |
| **Scrum Master** | **João Victor Lopes Rosa** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/JV-L0pes) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://br.linkedin.com/in/jv-l0pes) |


### 💻 Development Team

| **Nome** | **Links** |
|----------|-----------|
| **Pedro Claudino Nunes** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/PeClaudino2006) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://br.linkedin.com/in/pedro-claudino-0566472b9) |
| **Manuela Lucia Lemes de Castro** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/manuelalemes) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manuela-lemes-castro) |
| **Gabrielly Neu dos Santos** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/Gabrielly209) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrielly-neu-753906239) |
| **Leonardo da Silva Irineu** | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/Leo-Slv) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leonardo-irineu-8418b0288) |



