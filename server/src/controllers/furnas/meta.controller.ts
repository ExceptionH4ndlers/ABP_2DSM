import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";

export async function listTables(req: Request, res: Response) {
  try {
    const { rows } = await furnasPool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name",
    );
    res.json(rows.map((r) => r.table_name));
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar tabelas", details: String(err) });
  }
}

export async function listColumns(req: Request, res: Response) {
  try {
    const table = String(req.params.table);
    const { rows } = await furnasPool.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position",
      [table],
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar colunas", details: String(err) });
  }
}


