import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta simples
    const result = await furnasPool.query(
      `
      SELECT 
        idreservatorio,
        nome,
        localizacao,
        capacidade,
        area,
        profundidademaxima,
        profundidademedia,
        latitude,
        longitude
      FROM tbreservatorio
      ORDER BY nome ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbreservatorio");
    const total = Number(countResult.rows[0].count);

    // dados formatados
    const data = result.rows.map((row: any) => ({
      idreservatorio: row.idreservatorio,
      nome: row.nome,
      localizacao: row.localizacao,
      capacidade: row.capacidade,
      area: row.area,
      profundidademaxima: row.profundidademaxima,
      profundidademedia: row.profundidademedia,
      latitude: row.latitude,
      longitude: row.longitude,
    }));

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbreservatorio", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
