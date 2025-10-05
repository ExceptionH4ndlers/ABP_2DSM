import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta na tabela tbfluxoinpe
    const result = await balcarPool.query(
      `
      SELECT 
        idfluxoinpe,
        idsitio,
        idcampanha,
        datamedida,
        ch4,
        batimetria,
        tempar,
        tempcupula,
        tempaguasubsuperficie,
        tempaguameio,
        tempaguafundo,
        phsubsuperficie,
        phmeio,
        phfundo,
        orpsubsuperficie,
        orpmeio,
        orpfundo,
        condutividadesubsuperficie,
        condutividademeio,
        condutividadefundo,
        odsubsuperficie,
        odmeio,
        odfundo,
        tsdsubsuperficie,
        tsdmeio,
        tsdfundo
      FROM tbfluxoinpe
      ORDER BY idfluxoinpe ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbfluxoinpe");
    const total = Number(countResult.rows[0].count);

    // resposta formatada
    const data = result.rows.map((row: any) => ({
      idfluxoinpe: row.idfluxoinpe,
      idsitio: row.idsitio,
      idcampanha: row.idcampanha,
      datamedida: row.datamedida,
      ch4: row.ch4,
      batimetria: row.batimetria,
      tempar: row.tempar,
      tempcupula: row.tempcupula,
      tempaguasubsuperficie: row.tempaguasubsuperficie,
      tempaguameio: row.tempaguameio,
      tempaguafundo: row.tempaguafundo,
      phsubsuperficie: row.phsubsuperficie,
      phmeio: row.phmeio,
      phfundo: row.phfundo,
      orpsubsuperficie: row.orpsubsuperficie,
      orpmeio: row.orpmeio,
      orpfundo: row.orpfundo,
      condutividadesubsuperficie: row.condutividadesubsuperficie,
      condutividademeio: row.condutividademeio,
      condutividadefundo: row.condutividadefundo,
      odsubsuperficie: row.odsubsuperficie,
      odmeio: row.odmeio,
      odfundo: row.odfundo,
      tsdsubsuperficie: row.tsdsubsuperficie,
      tsdmeio: row.tsdmeio,
      tsdfundo: row.tsdfundo,
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
    logger.error("Erro ao consultar tbfluxoinpe", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
