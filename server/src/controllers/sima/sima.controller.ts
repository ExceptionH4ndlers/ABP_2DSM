import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { queryWithRetry } from "../../utils/dbRetry";
import { logger } from "../../configs/logger";

// Função auxiliar para somar 1 dia à data no formato YYYY-MM-DD
function addOneDay(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const estacao = req.query.estacao as string;
    // Suporte para múltiplas estações
    const estacoes = req.query.estacoes
      ? Array.isArray(req.query.estacoes)
        ? (req.query.estacoes as string[])
        : typeof req.query.estacoes === "string"
          ? req.query.estacoes.split(",").map((e) => e.trim())
          : []
      : [];
    const sortOrder = (req.query.sortOrder as string) || "desc";

    // Validações básicas
    if (!page || page < 1) {
      res.status(400).json({ success: false, error: "Parâmetro 'page' inválido." });
      return;
    }
    if (!limit || limit < 1) {
      res.status(400).json({ success: false, error: "Parâmetro 'limit' inválido." });
      return;
    }
    if (!startDate || !endDate) {
      res
        .status(400)
        .json({ success: false, error: "Parâmetros 'startDate' e 'endDate' são obrigatórios." });
      return;
    }

    const offset = (page - 1) * limit;
    const startDateTime = `${startDate} 00:00:00`;
    const endDateTime = `${addOneDay(endDate)} 00:00:00`;

    // Cláusulas base
    let whereClause = "WHERE s.datahora >= $3 AND s.datahora < $4";
    let countWhereClause = "WHERE datahora >= $1 AND datahora < $2";

    const queryParams: (string | number)[] = [limit, offset, startDateTime, endDateTime];
    const countParams: (string | number)[] = [startDateTime, endDateTime];
    let paramIndex = 5; // Começar após os parâmetros base
    let countParamIndex = 3; // Para countWhereClause, começar após startDateTime e endDateTime

    // Filtro opcional por estação(ões)
    // Priorizar múltiplas estações sobre estação única
    if (estacoes.length > 0) {
      // Normalizar IDs das estações (remover espaços)
      const normalizedEstacoes = estacoes.map((e) => String(e).trim());

      logger.info("Filtrando por múltiplas estações", {
        estacoesRecebidas: estacoes,
        estacoesNormalizadas: normalizedEstacoes,
      });

      const estacoesPlaceholders = normalizedEstacoes
        .map(() => {
          const placeholder = `$${paramIndex}`;
          paramIndex++;
          return placeholder;
        })
        .join(", ");
      whereClause += ` AND TRIM(s.idestacao) IN (${estacoesPlaceholders})`;

      // Para countWhereClause
      const countEstacoesPlaceholders = normalizedEstacoes
        .map(() => {
          const placeholder = `$${countParamIndex}`;
          countParamIndex++;
          return placeholder;
        })
        .join(", ");
      countWhereClause += ` AND TRIM(idestacao) IN (${countEstacoesPlaceholders})`;

      queryParams.push(...normalizedEstacoes);
      countParams.push(...normalizedEstacoes);
    } else if (estacao) {
      const normalizedEstacao = String(estacao).trim();
      whereClause += ` AND TRIM(s.idestacao) = $${paramIndex}`;
      countWhereClause += " AND TRIM(idestacao) = $3";
      queryParams.push(normalizedEstacao);
      countParams.push(normalizedEstacao);
    }

    // Consulta principal com JOIN para obter nome da estação
    const result = await queryWithRetry(
      simaPool,
      `SELECT s.*, e.rotulo AS nome_estacao FROM tbsima s
       INNER JOIN tbestacao e ON s.idestacao = e.idestacao
       ${whereClause}
       ORDER BY s.datahora ${sortOrder === "asc" ? "ASC" : "DESC"}
       LIMIT $1 OFFSET $2`,
      queryParams,
      { retries: 6, delayMs: 800 },
    );

    // Contagem total
    const countResult = await queryWithRetry(
      simaPool,
      `SELECT COUNT(*) FROM tbsima
       ${countWhereClause}`,
      countParams,
      { retries: 6, delayMs: 800 },
    );

    const total = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(total / limit);

    logger.info("Consulta SIMA concluída", {
      total,
      dataLength: result.rows.length,
      estacoesFiltradas: estacoes.length > 0 ? estacoes : estacao,
    });

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro interno ao consultar os dados.",
    });
  }
};

/**
 * Buscar datas mínima e máxima para as estações selecionadas
 */
export const getDateRange = async (req: Request, res: Response): Promise<void> => {
  try {
    const estacao = req.query.estacao as string;
    const estacoes = req.query.estacoes
      ? Array.isArray(req.query.estacoes)
        ? (req.query.estacoes as string[])
        : typeof req.query.estacoes === "string"
          ? req.query.estacoes.split(",").map((e) => e.trim())
          : []
      : [];

    let whereClause = "";
    const queryParams: string[] = [];

    // Filtro por estação(ões)
    if (estacoes.length > 0) {
      const normalizedEstacoes = estacoes.map((e) => String(e).trim());
      const placeholders = normalizedEstacoes.map((_, index) => `$${index + 1}`).join(", ");
      whereClause = `WHERE TRIM(idestacao) IN (${placeholders})`;
      queryParams.push(...normalizedEstacoes);
    } else if (estacao) {
      const normalizedEstacao = String(estacao).trim();
      whereClause = "WHERE TRIM(idestacao) = $1";
      queryParams.push(normalizedEstacao);
    }

    // Buscar data mínima e máxima
    const result = await queryWithRetry(
      simaPool,
      `SELECT 
        MIN(datahora) AS min_date,
        MAX(datahora) AS max_date
       FROM tbsima
       ${whereClause}`,
      queryParams,
      { retries: 6, delayMs: 800 },
    );

    if (result.rows.length > 0 && result.rows[0].min_date && result.rows[0].max_date) {
      const minDate = new Date(result.rows[0].min_date);
      const maxDate = new Date(result.rows[0].max_date);

      res.status(200).json({
        success: true,
        minDate: minDate.toISOString().split("T")[0],
        maxDate: maxDate.toISOString().split("T")[0],
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Nenhum dado encontrado para as estações selecionadas.",
      });
    }
  } catch (error: any) {
    logger.error("Erro ao buscar range de datas", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro interno ao buscar range de datas.",
    });
  }
};
