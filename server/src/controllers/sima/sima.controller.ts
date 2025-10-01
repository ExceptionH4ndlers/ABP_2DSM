import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
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
    let whereClause = "WHERE datahora >= $3 AND datahora < $4";
    let countWhereClause = "WHERE datahora >= $1 AND datahora < $2";

    const queryParams: (string | number)[] = [limit, offset, startDateTime, endDateTime];
    const countParams: (string | number)[] = [startDateTime, endDateTime];

    // Filtro opcional por estação
    if (estacao) {
      whereClause += " AND idestacao = $5";
      countWhereClause += " AND idestacao = $3";
      queryParams.push(estacao);
      countParams.push(estacao);
    }

    // Consulta principal
    const result = await simaPool.query(
      `SELECT * FROM tbsima
       ${whereClause}
       ORDER BY datahora ${sortOrder === "asc" ? "ASC" : "DESC"}
       LIMIT $1 OFFSET $2`,
      queryParams,
    );

    // Contagem total
    const countResult = await simaPool.query(
      `SELECT COUNT(*) FROM tbsima
       ${countWhereClause}`,
      countParams,
    );

    const total = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(total / limit);

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
