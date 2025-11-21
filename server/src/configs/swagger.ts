import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ABP 2DSM API",
      version: "1.0.0",
      description:
        "API para consulta de dados de campanhas científicas (SIMA, Furnas e BALCAR). " +
        "Fornece acesso a dados de reservatórios, estações, campanhas e metadados.",
      contact: {
        name: "Equipe ABP 2DSM",
      },
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Endpoints de verificação de saúde do sistema",
      },
      {
        name: "SIMA",
        description: "Endpoints para dados do Sistema de Monitoramento Ambiental (SIMA)",
      },
      {
        name: "Furnas",
        description: "Endpoints para dados de campanhas Furnas",
      },
      {
        name: "BALCAR",
        description: "Endpoints para dados de campanhas BALCAR",
      },
      {
        name: "Filtros",
        description: "Endpoints para metadados de filtros",
      },
      {
        name: "Parâmetros",
        description: "Endpoints para consulta de parâmetros",
      },
    ],
    components: {
      schemas: {
        PaginatedResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            page: {
              type: "integer",
              example: 1,
            },
            limit: {
              type: "integer",
              example: 10,
            },
            total: {
              type: "integer",
              example: 100,
            },
            totalPages: {
              type: "integer",
              example: 10,
            },
            data: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
              example: "Mensagem de erro",
            },
          },
        },
        QueryRequest: {
          type: "object",
          required: ["query"],
          properties: {
            query: {
              type: "string",
              description: "Query SQL SELECT",
              example: "SELECT * FROM tbsima LIMIT 10",
            },
            params: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Parâmetros para a query (opcional)",
            },
            format: {
              type: "string",
              enum: ["json", "csv"],
              description: "Formato de resposta (opcional, padrão: json)",
            },
          },
        },
        HealthResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["ok", "degraded"],
              example: "ok",
            },
            uptimeSec: {
              type: "integer",
              example: 3600,
            },
            responseTimeMs: {
              type: "integer",
              example: 50,
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2025-01-15T10:30:00.000Z",
            },
            dependencies: {
              type: "object",
              properties: {
                furnasDb: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    latencyMs: { type: "integer" },
                  },
                },
                simaDb: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    latencyMs: { type: "integer" },
                  },
                },
                balcarDb: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    latencyMs: { type: "integer" },
                  },
                },
              },
            },
            memory: {
              type: "object",
              properties: {
                rss: { type: "integer" },
                heapUsed: { type: "integer" },
                heapTotal: { type: "integer" },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts", "./src/index.ts", "./src/docs/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
