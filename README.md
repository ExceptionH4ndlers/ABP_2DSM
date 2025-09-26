# Portal de Dados Limnológicos - INPE

Portal integrado de acesso aos dados limnológicos dos projetos SIMA, Balanço de Carbono e BALCAR desenvolvido pelo Instituto Nacional de Pesquisas Espaciais (INPE) em parceria com Furnas Centrais Elétricas S.A.

## 🚀 Visão Geral

Este portal moderno oferece acesso unificado aos dados de monitoramento ambiental coletados em reservatórios hidrelétricos através de três projetos principais:

- **SIMA**: Sistema Integrado de Monitoramento Ambiental
- **Balanço de Carbono**: Projeto Furnas Centrais Elétricas S.A.
- **BALCAR**: Emissões de Gases de Efeito Estufa em Reservatórios

## ✨ Características

### 🎨 Interface Moderna
- **Single Page Application (SPA)** com navegação suave
- Design responsivo para desktop, tablet e mobile
- Identidade visual alinhada com padrões do INPE
- Animações e transições fluidas

### 📊 Funcionalidades Interativas
- **Dashboard Unificado**: Visualização de todos os dados em um painel
- **Filtros Avançados**: Por projeto, reservatório, período e parâmetros
- **Mapas Interativos**: Localização geográfica dos dados
- **Gráficos Temporais**: Séries temporais dos parâmetros monitorados
- **Exportação CSV**: Download de dados filtrados

### 🔧 Tecnologias Utilizadas

#### Frontend
- **React 19** com TypeScript
- **Styled Components** para estilização
- **Lucide React** para ícones
- **Vite** como bundler

#### Backend
- **Node.js** com TypeScript
- **Express.js** para APIs RESTful
- **PostgreSQL** como banco de dados
- **Docker** para containerização

## 🏗️ Estrutura do Projeto

```
ABP_2DSM/
├── front/                    # Frontend React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── sections/    # Seções do portal
│   │   │   ├── Navigation.tsx
│   │   │   ├── BarraBrasil.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   └── PortalPage.tsx
│   │   ├── styles/          # Temas e estilos globais
│   │   └── App.tsx
│   └── package.json
├── server/                   # Backend Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores das APIs
│   │   ├── models/         # Modelos de dados
│   │   ├── routes/         # Rotas da API
│   │   └── configs/        # Configurações
│   └── package.json
├── sima/                    # Dados do projeto SIMA
├── furnas-campanha/         # Dados do projeto Balanço de Carbono
├── balcar-campanha/        # Dados do projeto BALCAR
└── docker-compose.dev.yml  # Configuração Docker
```

## 🎯 Seções do Portal

### 1. **Hero Section**
- Apresentação geral dos projetos
- Estatísticas principais
- Navegação para outras seções

### 2. **SIMA Section**
- Descrição do Sistema Integrado de Monitoramento Ambiental
- Funcionamento e componentes
- Parâmetros monitorados

### 3. **Balanço de Carbono Section**
- Objetivos do projeto Furnas
- Gases de efeito estufa monitorados
- Informações sobre participantes

### 4. **BALCAR Section**
- Foco do projeto BALCAR
- Áreas de estudo (água-sedimento, coluna d'água, água-atmosfera)
- Parâmetros principais

### 5. **Dashboard Interativo**
- Filtros avançados
- Visualização de dados
- Exportação CSV

### 6. **Mapas Interativos**
- Localização dos reservatórios
- Estações de monitoramento
- Navegação geográfica

### 7. **Gráficos Temporais**
- Séries temporais dos parâmetros
- Análise de tendências
- Comparação de dados

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- PostgreSQL

### Desenvolvimento

1. **Clone o repositório**
```bash
git clone <repository-url>
cd ABP_2DSM
```

2. **Instale as dependências**
```bash
# Frontend
cd front
npm install

# Backend
cd ../server
npm install
```

3. **Configure o banco de dados**
```bash
# Execute os scripts SQL para criar as tabelas
# sima/create-table.sql
# furnas-campanha/create-table.sql
# balcar-campanha/create-table.sql
```

4. **Execute com Docker**
```bash
docker-compose -f docker-compose.dev.yml up
```

5. **Ou execute localmente**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd front
npm run dev
```

## 📱 Responsividade

O portal é totalmente responsivo e otimizado para:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptação de grid e navegação
- **Mobile**: Interface simplificada com navegação por abas

## 🎨 Design System

### Cores Principais
- **Azul INPE**: `#1e40af` (primária)
- **Verde**: `#22c55e` (sucesso)
- **Laranja**: `#f59e0b` (aviso)
- **Vermelho**: `#ef4444` (erro)

### Tipografia
- **Títulos**: Inter, font-weight: 700
- **Corpo**: Inter, font-weight: 400-600
- **Responsiva**: Escalas adaptativas por dispositivo

## 📊 Dados Disponíveis

### Projeto SIMA
- Temperatura da água
- pH
- Turbidez
- Oxigênio dissolvido
- CO₂ dissolvido
- Condutividade

### Projeto Balanço de Carbono
- CO₂ (Dióxido de Carbono)
- CH₄ (Metano)
- N₂O (Óxido Nitroso)
- Parâmetros limnológicos
- Dados meteorológicos

### Projeto BALCAR
- Interface água-sedimento
- Coluna d'água
- Interface água-atmosfera
- Fluxos gasosos
- Parâmetros físicos e químicos

## 🤝 Contribuição

Este projeto foi desenvolvido como parte do ABP (Aprendizagem Baseada em Projetos) do curso de Desenvolvimento de Software Multiplataforma da FATEC Jacareí, em parceria com o INPE.

### Equipe
- **Focal Point**: Arley Ferreira de Souza
- **Parceiro**: INPE - Laboratório de Instrumentação de Sistemas Aquáticos (labISA)
- **Contato**: Cláudio Clemente Faria Barbosa, Evlyn Márcia Leão de Moraes Novo

## 📄 Licença

© 2025 INPE - Instituto Nacional de Pesquisas Espaciais. Todos os direitos reservados.

## 🔗 Links Relacionados

- [INPE](http://www.inpe.br)
- [Furnas Centrais Elétricas](http://www.furnas.com.br)
- [DSR/INPE](http://www.dsr.inpe.br)
- [Projeto Balanço de Carbono](http://www.dsr.inpe.br/projetofurnas/)
- [Projeto BALCAR](http://www.dsr.inpe.br/hidrosfera/balanco/)
- [Sistema SIMA](http://www.dsr.inpe.br/hidrosfera/sima/)