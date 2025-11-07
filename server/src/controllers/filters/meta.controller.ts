import { Request, Response } from "express";
import { balcarPool, furnasPool, simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";

type FilterOption = {
  id: string;
  label: string;
};

type OptionCollection = {
  total: number;
  items: FilterOption[];
};

type DateRange = {
  startDate: string | null;
  endDate: string | null;
};

type FiltersMetaPayload = {
  sima: {
    period: DateRange;
    anos: number[];
    estacoes: OptionCollection;
  };
  furnas: {
    period: DateRange;
    anos: number[];
    reservatorios: OptionCollection;
    instituicoes: OptionCollection;
    campanhas: OptionCollection;
  };
  balcar: {
    period: DateRange;
    anos: number[];
    reservatorios: OptionCollection;
    instituicoes: OptionCollection;
    campanhas: OptionCollection;
    sitios: OptionCollection;
  };
};

export async function getFiltersMeta(_req: Request, res: Response) {
  try {
    const [sima, furnas, balcar] = await Promise.all([
      buildSimaMeta(),
      buildFurnasMeta(),
      buildBalcarMeta(),
    ]);

    const payload: FiltersMetaPayload = {
      sima,
      furnas,
      balcar,
    };

    res.status(200).json({
      success: true,
      generatedAt: new Date().toISOString(),
      filters: payload,
    });
  } catch (error: any) {
    logger.error("Erro ao montar metadados de filtros", {
      message: error?.message,
      stack: error?.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao montar listas de filtros.",
    });
  }
}

async function buildSimaMeta() {
  const [stationsResult, datesResult, yearsResult] = await Promise.all([
    simaPool.query(`
      SELECT DISTINCT
        e.idestacao AS id,
        COALESCE(
          NULLIF(TRIM(e.rotulo), ''),
          NULLIF(TRIM(e.idhexadecimal), ''),
          'Estacao ' || e.idestacao::text
        ) AS label
      FROM tbsima s
      INNER JOIN tbestacao e ON e.idestacao = s.idestacao
      WHERE e.idestacao IS NOT NULL
      ORDER BY label;
    `),
    simaPool.query(`
      SELECT
        MIN(datahora) AS start_date,
        MAX(datahora) AS end_date
      FROM tbsima;
    `),
    simaPool.query(`
      SELECT DISTINCT
        EXTRACT(YEAR FROM datahora)::int AS value
      FROM tbsima
      WHERE datahora IS NOT NULL
      ORDER BY value;
    `),
  ]);

  return {
    estacoes: buildOptionCollection(stationsResult.rows),
    period: buildDateRange(datesResult.rows[0]),
    anos: buildNumericList(yearsResult.rows),
  };
}

async function buildFurnasMeta() {
  const [reservatoriosResult, instituicoesResult, campanhasResult, datesResult, yearsResult] =
    await Promise.all([
      furnasPool.query(`
        SELECT DISTINCT
          r.idreservatorio AS id,
          COALESCE(
            NULLIF(TRIM(r.nome), ''),
            'Reservatorio ' || r.idreservatorio::text
          ) AS label
        FROM tbdadosrepresa d
        INNER JOIN tbreservatorio r ON r.idreservatorio = d.idreservatorio
        WHERE r.idreservatorio IS NOT NULL
        ORDER BY label;
      `),
      furnasPool.query(`
        SELECT DISTINCT
          i.idinstituicao AS id,
          COALESCE(
            NULLIF(TRIM(i.nome), ''),
            'Instituicao ' || i.idinstituicao::text
          ) AS label
        FROM tbcampanha c
        INNER JOIN tbinstituicao i ON i.idinstituicao = c.idinstituicao
        WHERE i.idinstituicao IS NOT NULL
        ORDER BY label;
      `),
      furnasPool.query(`
        SELECT DISTINCT
          c.idcampanha AS id,
          COALESCE(
            NULLIF(TRIM(c.nrocampanha::text), ''),
            'Campanha ' || c.idcampanha::text
          ) AS label
        FROM tbcampanha c
        ORDER BY label, id;
      `),
      furnasPool.query(`
        SELECT
          MIN(datamedida) AS start_date,
          MAX(datamedida) AS end_date
        FROM tbdadosrepresa;
      `),
      furnasPool.query(`
        SELECT DISTINCT
          EXTRACT(YEAR FROM datamedida)::int AS value
        FROM tbdadosrepresa
        WHERE datamedida IS NOT NULL
        ORDER BY value;
      `),
    ]);

  return {
    reservatorios: buildOptionCollection(reservatoriosResult.rows),
    instituicoes: buildOptionCollection(instituicoesResult.rows),
    campanhas: buildOptionCollection(campanhasResult.rows),
    period: buildDateRange(datesResult.rows[0]),
    anos: buildNumericList(yearsResult.rows),
  };
}

async function buildBalcarMeta() {
  const [
    reservatoriosResult,
    instituicoesResult,
    campanhasResult,
    sitiosResult,
    datesResult,
    yearsResult,
  ] = await Promise.all([
    balcarPool.query(`
      SELECT DISTINCT
        r.idreservatorio AS id,
        COALESCE(
          NULLIF(TRIM(r.nome), ''),
          'Reservatorio ' || r.idreservatorio::text
        ) AS label
      FROM tbcampanha c
      INNER JOIN tbreservatorio r ON r.idreservatorio = c.idreservatorio
      WHERE r.idreservatorio IS NOT NULL
      ORDER BY label;
    `),
    balcarPool.query(`
      SELECT DISTINCT
        i.idinstituicao AS id,
        COALESCE(
          NULLIF(TRIM(i.nome), ''),
          'Instituicao ' || i.idinstituicao::text
        ) AS label
      FROM tbcampanha c
      INNER JOIN tbinstituicao i ON i.idinstituicao = c.idinstituicao
      WHERE i.idinstituicao IS NOT NULL
      ORDER BY label;
    `),
    balcarPool.query(`
      SELECT DISTINCT
        c.idcampanha AS id,
        COALESCE(
          NULLIF(TRIM(c.nrocampanha::text), ''),
          'Campanha ' || c.idcampanha::text
        ) AS label
      FROM tbcampanha c
      ORDER BY label, id;
    `),
    balcarPool.query(`
      SELECT DISTINCT
        s.idsitio AS id,
        COALESCE(
          NULLIF(TRIM(s.nome), ''),
          'Sitio ' || s.idsitio::text
        ) AS label
      FROM tbsitio s
      WHERE s.idsitio IS NOT NULL
      ORDER BY label;
    `),
    balcarPool.query(`
      SELECT
        MIN(datainicio) AS start_date,
        MAX(datafim) AS end_date
      FROM tbcampanha;
    `),
    balcarPool.query(`
      SELECT DISTINCT
        EXTRACT(YEAR FROM datainicio)::int AS value
      FROM tbcampanha
      WHERE datainicio IS NOT NULL
      ORDER BY value;
    `),
  ]);

  return {
    reservatorios: buildOptionCollection(reservatoriosResult.rows),
    instituicoes: buildOptionCollection(instituicoesResult.rows),
    campanhas: buildOptionCollection(campanhasResult.rows),
    sitios: buildOptionCollection(sitiosResult.rows),
    period: buildDateRange(datesResult.rows[0]),
    anos: buildNumericList(yearsResult.rows),
  };
}

function buildOptionCollection(rows: Array<Record<string, any>>): OptionCollection {
  const items: FilterOption[] = rows
    .map((row) => {
      const idValue = row?.id;
      if (idValue === null || idValue === undefined) {
        return null;
      }

      const labelSource = row?.label ?? row?.nome ?? row?.rotulo ?? row?.descricao;
      const labelText =
        typeof labelSource === "string" ? labelSource.trim() : String(labelSource ?? "");

      return {
        id: String(idValue),
        label: labelText.length > 0 ? labelText : String(idValue),
      };
    })
    .filter((option): option is FilterOption => Boolean(option));

  return {
    total: items.length,
    items,
  };
}

function buildNumericList(rows: Array<Record<string, any>>): number[] {
  const values = rows
    .map((row) => Number(row?.value))
    .filter((value) => Number.isFinite(value)) as number[];
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

function buildDateRange(row?: Record<string, any>): DateRange {
  if (!row) {
    return { startDate: null, endDate: null };
  }

  return {
    startDate: formatDate(row.start_date),
    endDate: formatDate(row.end_date),
  };
}

function formatDate(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const asString = String(value);
  if (!asString.trim()) {
    return null;
  }

  const parsed = new Date(asString);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}
