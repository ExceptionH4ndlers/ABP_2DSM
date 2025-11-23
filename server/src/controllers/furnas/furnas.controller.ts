import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 20;

export const getFurnasData = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Query params de filtros
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const reservatorios = req.query.reservatorios
      ? (Array.isArray(req.query.reservatorios) ? req.query.reservatorios : [req.query.reservatorios])
      : [];
    const instituicao = req.query.instituicao as string | undefined;
    const nivelMin = req.query.nivelMin ? Number(req.query.nivelMin) : undefined;
    const nivelMax = req.query.nivelMax ? Number(req.query.nivelMax) : undefined;
    const volumeUtilMin = req.query.volumeUtilMin ? Number(req.query.volumeUtilMin) : undefined;
    const volumeUtilMax = req.query.volumeUtilMax ? Number(req.query.volumeUtilMax) : undefined;
    const geracaoMin = req.query.geracaoMin ? Number(req.query.geracaoMin) : undefined;
    const geracaoMax = req.query.geracaoMax ? Number(req.query.geracaoMax) : undefined;
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = (req.query.sortOrder as string) || "asc";

    // Construir WHERE clause dinamicamente
    const whereConditions: string[] = [];
    const queryParams: unknown[] = [];
    let paramIndex = 1;

    // Filtro de data
    if (startDate) {
      whereConditions.push(`a.datamedida >= $${paramIndex}`);
      queryParams.push(startDate);
      paramIndex++;
    }
    if (endDate) {
      whereConditions.push(`a.datamedida <= $${paramIndex}`);
      queryParams.push(endDate);
      paramIndex++;
    }

    // Filtro de reservatórios
    if (reservatorios.length > 0) {
      const reservatoriosPlaceholders = reservatorios
        .map(() => {
          const placeholder = `$${paramIndex}`;
          paramIndex++;
          return placeholder;
        })
        .join(", ");
      whereConditions.push(`b.nome IN (${reservatoriosPlaceholders})`);
      queryParams.push(...reservatorios);
    }

    // Filtro de instituição (se aplicável - pode precisar de JOIN com outras tabelas)
    // Por enquanto, vamos pular este filtro se não houver relação direta

    // Filtro de nível
    if (nivelMin !== undefined) {
      whereConditions.push(`a.nivelreservatorio >= $${paramIndex}`);
      queryParams.push(nivelMin);
      paramIndex++;
    }
    if (nivelMax !== undefined) {
      whereConditions.push(`a.nivelreservatorio <= $${paramIndex}`);
      queryParams.push(nivelMax);
      paramIndex++;
    }

    // Filtro de volume útil
    if (volumeUtilMin !== undefined) {
      whereConditions.push(`a.volutilreservatorio >= $${paramIndex}`);
      queryParams.push(volumeUtilMin);
      paramIndex++;
    }
    if (volumeUtilMax !== undefined) {
      whereConditions.push(`a.volutilreservatorio <= $${paramIndex}`);
      queryParams.push(volumeUtilMax);
      paramIndex++;
    }

    // Filtro de geração
    if (geracaoMin !== undefined) {
      whereConditions.push(`a.geracao >= $${paramIndex}`);
      queryParams.push(geracaoMin);
      paramIndex++;
    }
    if (geracaoMax !== undefined) {
      whereConditions.push(`a.geracao <= $${paramIndex}`);
      queryParams.push(geracaoMax);
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    // Construir ORDER BY
    let orderByClause = "ORDER BY a.datamedida";
    if (sortBy) {
      const sortColumns = sortBy.split(",").map((col) => {
        // Mapear nomes de colunas do frontend para nomes do banco
        const columnMap: Record<string, string> = {
          data: "a.datamedida",
          nivel: "a.nivelreservatorio",
          volume_util: "a.volutilreservatorio",
          geracao: "a.geracao",
        };
        return columnMap[col.trim()] || `a.${col.trim()}`;
      });
      orderByClause = `ORDER BY ${sortColumns.join(", ")}`;
    }
    orderByClause += ` ${sortOrder.toUpperCase()}`;

    // Query principal
    const dataQuery = `
      SELECT 
        a.iddadosrepresa,
        a.datamedida,
        a.nivelreservatorio,
        a.volutilreservatorio,
        a.porvolutilreservatorio,
        a.geracao,
        a.vazaoafluente,
        a.vazaodefluente,
        b.idreservatorio,
        b.nome AS reservatorio_nome
      FROM tbdadosrepresa AS a
      LEFT JOIN tbreservatorio AS b
        ON a.idreservatorio = b.idreservatorio
      ${whereClause}
      ${orderByClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    queryParams.push(limit, offset);

    const result = await furnasPool.query(dataQuery, queryParams);

    // Query de contagem total
    const countQuery = `
      SELECT COUNT(*) 
      FROM tbdadosrepresa AS a
      LEFT JOIN tbreservatorio AS b
        ON a.idreservatorio = b.idreservatorio
      ${whereClause}
    `;
    const countParams = queryParams.slice(0, -2); // Remove limit e offset
    const countResult = await furnasPool.query(countQuery, countParams);
    const total = Number(countResult.rows[0].count);

    // Formatar dados para o formato esperado pelo frontend
    const data = result.rows.map((row: any) => ({
      iddadosrepresa: row.iddadosrepresa,
      datamedida: row.datamedida,
      nivelreservatorio: row.nivelreservatorio,
      volutilreservatorio: row.volutilreservatorio,
      porvolutilreservatorio: row.porvolutilreservatorio,
      geracao: row.geracao,
      vazaoafluente: row.vazaoafluente,
      vazaodefluente: row.vazaodefluente,
      reservatorio_nome: row.reservatorio_nome,
    }));

    res.status(200).json({
      data,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar dados de Furnas", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
      details: error.message,
    });
  }
};

