import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";

// Função auxiliar para somar 1 dia à data no formato YYYY-MM-DD
function addOneDay(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10); // retorna só YYYY-MM-DD
}

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    // Validações
    if (!page || page < 1) {
      res.status(400).json({
        success: false,
        error: "Parâmetro 'page' inválido.",
      });
      return;
    }

    if (!limit || limit < 1) {
      res.status(400).json({
        success: false,
        error: "Parâmetro 'limit' inválido.",
      });
      return;
    }

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        error: "Parâmetros 'startDate' e 'endDate' são obrigatórios.",
      });
      return;
    }

    const offset = (page - 1) * limit;

    // Ajuste do range de datas para a coluna 'inicio'
    const startDateTime = `${startDate} 00:00:00`;
    const endDateTime = `${addOneDay(endDate)} 00:00:00`;

    // Consulta paginada na tabela tbestacao com filtro por data de 'inicio'
    const result = await simaPool.query(
      `SELECT * FROM tbestacao
       WHERE inicio >= $3 AND inicio < $4
       ORDER BY inicio DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset, startDateTime, endDateTime],
    );

    // Total de registros dentro do filtro
    const countResult = await simaPool.query(
      `SELECT COUNT(*) FROM tbestacao
       WHERE inicio >= $1 AND inicio < $2`,
      [startDateTime, endDateTime],
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
    logger.error("Erro ao consultar tbestacao", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro interno ao consultar os dados da estação.",
    });
  }
};
