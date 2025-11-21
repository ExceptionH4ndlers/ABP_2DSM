import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";

export const consultarParametros = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT 
        pb.idParametrosBiologicosFisicosAgua,
        pb.dataMedida,
        pb.profundidade,
        pb.tempagua,
        pb.ph,
        pb.clorofilaa,
        pb.biomassabacteria,
        pb.densidadebacteria,
        pb.biomassacarbonototalfito,
        pb.densidadetotalfito,
        pb.biomassazoo,
        pb.densidadetotalzoo,
        s.nome AS nome_sitio,
        s.lat,
        s.lng,
        r.nome AS nome_reservatorio,
        c.nroCampanha,
        c.datainicio,
        c.datafim,
        i.nome AS nome_instituicao
      FROM tbparametrosbiologicosfisicosagua pb
      INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
      INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
      INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
      INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
      ORDER BY pb.dataMedida DESC
    `;

    const result = await furnasPool.query(query);

    return res.status(200).json({
      total: result.rows.length,
      dados: result.rows,
    });
  } catch (error: any) {
    console.error("Erro ao consultar parâmetros:", error);
    return res.status(500).json({ error: "Erro ao consultar parâmetros", detalhes: error.message });
  }
};
