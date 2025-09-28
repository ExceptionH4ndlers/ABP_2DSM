import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com joins
    const result = await furnasPool.query(
      `
      SELECT 
        a.idcampanha,
        a.nrocampanha,
        a.datainicio,
        a.datafim,
        a.descricao,
        b.idreservatorio,
        b.nome AS reservatorio_nome,
        c.idinstituicao,
        c.nome AS instituicao_nome
      FROM tbcampanha AS a
      LEFT JOIN tbreservatorio AS b
        ON a.idreservatorio = b.idreservatorio
      LEFT JOIN tbinstituicao AS c
        ON a.idinstituicao = c.idinstituicao
      ORDER BY a.datainicio DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbcampanha");
    const total = Number(countResult.rows[0].count);

    // dados formatados
    const data = result.rows.map((row: any) => ({
      idcampanha: row.idcampanha,
      nrocampanha: row.nrocampanha,
      datainicio: row.datainicio,
      datafim: row.datafim,
      descricao: row.descricao,
      reservatorio: row.idreservatorio
        ? {
            idreservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
          }
        : undefined,
      instituicao: row.idinstituicao
        ? {
            idinstituicao: row.idinstituicao,
            nome: row.instituicao_nome,
          }
        : undefined,
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
    logger.error("Erro ao consultar tbcampanha", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
