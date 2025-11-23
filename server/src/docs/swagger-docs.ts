/**
 * @swagger
 * components:
 *   schemas:
 *     PaginatedResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         total:
 *           type: integer
 *           example: 100
 *         totalPages:
 *           type: integer
 *           example: 10
 *         data:
 *           type: array
 *           items:
 *             type: object
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: "Mensagem de erro"
 *
 *     QueryRequest:
 *       type: object
 *       required:
 *         - query
 *       properties:
 *         query:
 *           type: string
 *           description: Query SQL SELECT
 *           example: "SELECT * FROM tbsima LIMIT 10"
 *         params:
 *           type: array
 *           items:
 *             type: string
 *           description: Parâmetros para a query (opcional)
 *         format:
 *           type: string
 *           enum: [json, csv]
 *           description: Formato de resposta (opcional, padrão: json)
 *
 *     HealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [ok, degraded]
 *           example: ok
 *         uptimeSec:
 *           type: integer
 *           example: 3600
 *         responseTimeMs:
 *           type: integer
 *           example: 50
 *         timestamp:
 *           type: string
 *           format: date-time
 *         dependencies:
 *           type: object
 *           properties:
 *             furnasDb:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 latencyMs:
 *                   type: integer
 *             simaDb:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 latencyMs:
 *                   type: integer
 *             balcarDb:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 latencyMs:
 *                   type: integer
 *         memory:
 *           type: object
 *           properties:
 *             rss:
 *               type: integer
 *             heapUsed:
 *               type: integer
 *             heapTotal:
 *               type: integer
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica a saúde do sistema e conectividade com os bancos de dados
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Sistema operacional
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       503:
 *         description: Sistema degradado (algum banco de dados indisponível)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */

/**
 * @swagger
 * /sima/sima/all:
 *   get:
 *     summary: Lista todos os registros do SIMA com paginação
 *     tags: [SIMA]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Quantidade de registros por página
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final (YYYY-MM-DD)
 *       - in: query
 *         name: estacao
 *         schema:
 *           type: string
 *         description: ID da estação (opcional)
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Ordenação por data/hora
 *     responses:
 *       200:
 *         description: Lista de registros do SIMA
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /sima/simaoffline/all:
 *   get:
 *     summary: Lista todos os registros do SIMA Offline
 *     tags: [SIMA]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de registros por página
 *     responses:
 *       200:
 *         description: Lista de registros do SIMA Offline
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /sima/estacao/all:
 *   get:
 *     summary: Lista todas as estações do SIMA
 *     tags: [SIMA]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de registros por página
 *     responses:
 *       200:
 *         description: Lista de estações
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /sima/estacao/simple:
 *   get:
 *     summary: Lista estações do SIMA (versão simplificada)
 *     tags: [SIMA]
 *     responses:
 *       200:
 *         description: Lista simplificada de estações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /sima/estacao/map:
 *   get:
 *     summary: Lista estações do SIMA para visualização no mapa
 *     tags: [SIMA]
 *     responses:
 *       200:
 *         description: Lista de estações com coordenadas geográficas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idestacao:
 *                         type: integer
 *                       lat:
 *                         type: number
 *                       lng:
 *                         type: number
 */

/**
 * @swagger
 * /sima/meta/tables:
 *   get:
 *     summary: Lista todas as tabelas disponíveis no banco SIMA
 *     tags: [SIMA]
 *     responses:
 *       200:
 *         description: Lista de tabelas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */

/**
 * @swagger
 * /sima/meta/tables/{table}/columns:
 *   get:
 *     summary: Lista as colunas de uma tabela específica do SIMA
 *     tags: [SIMA]
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da tabela
 *     responses:
 *       200:
 *         description: Lista de colunas da tabela
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /sima/query/select:
 *   post:
 *     summary: Executa uma query SELECT personalizada no banco SIMA
 *     tags: [SIMA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QueryRequest'
 *     responses:
 *       200:
 *         description: Resultado da query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *           text/csv:
 *             schema:
 *               type: string
 *       400:
 *         description: Query inválida (apenas SELECT permitido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro na execução da query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /furnas/campanha/all:
 *   get:
 *     summary: Lista todas as campanhas Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de registros por página
 *     responses:
 *       200:
 *         description: Lista de campanhas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/reservatorio/all:
 *   get:
 *     summary: Lista todos os reservatórios Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de reservatórios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/instituicao/all:
 *   get:
 *     summary: Lista todas as instituições Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de instituições
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/sitio/all:
 *   get:
 *     summary: Lista todos os sítios Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de sítios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/bolhas/all:
 *   get:
 *     summary: Lista todos os registros de bolhas Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de registros de bolhas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/carbono/all:
 *   get:
 *     summary: Lista todos os registros de carbono Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de registros de carbono
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/dadosrepresa/all:
 *   get:
 *     summary: Lista todos os dados de represa Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de dados de represa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/campanhaportabela/all:
 *   get:
 *     summary: Lista campanhas por tabela Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de campanhas por tabela
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/abioticocoluna/all:
 *   get:
 *     summary: Lista dados abióticos de coluna Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de dados abióticos de coluna
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/abioticosuperficie/all:
 *   get:
 *     summary: Lista dados abióticos de superfície Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de dados abióticos de superfície
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/bioticocoluna/all:
 *   get:
 *     summary: Lista dados bióticos de coluna Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de dados bióticos de coluna
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/bioticosuperficie/all:
 *   get:
 *     summary: Lista dados bióticos de superfície Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de dados bióticos de superfície
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/dupladessorcaoagua/all:
 *   get:
 *     summary: Lista dados de dupla dessorção de água Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de dados de dupla dessorção
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/dadostimeseries:
 *   get:
 *     summary: Lista dados de séries temporais Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de dados de séries temporais
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /furnas/meta/tables:
 *   get:
 *     summary: Lista todas as tabelas disponíveis no banco Furnas
 *     tags: [Furnas]
 *     responses:
 *       200:
 *         description: Lista de tabelas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */

/**
 * @swagger
 * /furnas/meta/tables/{table}/columns:
 *   get:
 *     summary: Lista as colunas de uma tabela específica do Furnas
 *     tags: [Furnas]
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da tabela
 *     responses:
 *       200:
 *         description: Lista de colunas da tabela
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /furnas/query/select:
 *   post:
 *     summary: Executa uma query SELECT personalizada no banco Furnas
 *     tags: [Furnas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QueryRequest'
 *     responses:
 *       200:
 *         description: Resultado da query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *           text/csv:
 *             schema:
 *               type: string
 *       400:
 *         description: Query inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /balcar/campanha/all:
 *   get:
 *     summary: Lista todas as campanhas BALCAR
 *     tags: [BALCAR]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de campanhas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /balcar/reservatorio/all:
 *   get:
 *     summary: Lista todos os reservatórios BALCAR
 *     tags: [BALCAR]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de reservatórios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /balcar/instituicao/all:
 *   get:
 *     summary: Lista todas as instituições BALCAR
 *     tags: [BALCAR]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de instituições
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /balcar/sitio/all:
 *   get:
 *     summary: Lista todos os sítios BALCAR
 *     tags: [BALCAR]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de sítios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /balcar/tabelacampo/all:
 *   get:
 *     summary: Lista todas as tabelas de campo BALCAR
 *     tags: [BALCAR]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de tabelas de campo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /balcar/fluxoinpe/all:
 *   get:
 *     summary: Lista todos os fluxos INPE BALCAR
 *     tags: [BALCAR]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de fluxos INPE
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */

/**
 * @swagger
 * /balcar/meta/tables:
 *   get:
 *     summary: Lista todas as tabelas disponíveis no banco BALCAR
 *     tags: [BALCAR]
 *     responses:
 *       200:
 *         description: Lista de tabelas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */

/**
 * @swagger
 * /balcar/meta/tables/{table}/columns:
 *   get:
 *     summary: Lista as colunas de uma tabela específica do BALCAR
 *     tags: [BALCAR]
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da tabela
 *     responses:
 *       200:
 *         description: Lista de colunas da tabela
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /balcar/query/select:
 *   post:
 *     summary: Executa uma query SELECT personalizada no banco BALCAR
 *     tags: [BALCAR]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QueryRequest'
 *     responses:
 *       200:
 *         description: Resultado da query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *           text/csv:
 *             schema:
 *               type: string
 *       400:
 *         description: Query inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /filters/meta:
 *   get:
 *     summary: Obtém metadados de filtros disponíveis
 *     tags: [Filtros]
 *     responses:
 *       200:
 *         description: Metadados de filtros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 */

/**
 * @swagger
 * /parametros:
 *   get:
 *     summary: Consulta parâmetros disponíveis
 *     tags: [Parâmetros]
 *     responses:
 *       200:
 *         description: Lista de parâmetros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
