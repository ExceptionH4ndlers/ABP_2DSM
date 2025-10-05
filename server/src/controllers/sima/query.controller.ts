import { Request, Response } from "express";
import { Parser } from "json2csv";
import { simaPool } from "../../configs/db";

export async function runSelect(req: Request, res: Response) {
  try {
    const { sql, params, format } = req.body ?? {};
    if (!sql || typeof sql !== "string" || !/^\s*select\s+/i.test(sql)) {
      return res.status(400).json({ error: "Somente SELECT é permitido" });
    }
    const result = await simaPool.query(sql, Array.isArray(params) ? params : []);
    if (format === "csv") {
      const parser = new Parser();
      const csv = parser.parse(result.rows);
      res.header("Content-Type", "text/csv");
      res.attachment("consulta.csv");
      return res.send(csv);
    }
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: "Erro na consulta", details: String(err) });
  }
}


