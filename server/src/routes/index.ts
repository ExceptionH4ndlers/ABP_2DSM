import express from "express";
import sima from "./sima";
import balcar from "./balcar";
import furnas from "./furnas";
import { furnasPool, simaPool, balcarPool } from "../configs/db";

const router = express.Router();

router.use("/sima", sima);
router.use("/balcar", balcar);
router.use("/furnas", furnas);

// util simples para aplicar timeout em uma Promise
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

async function checkDb(pool: any) {
  const started = Date.now();
  try {
    // consulta leve apenas para validar conectividade
    await withTimeout(pool.query("SELECT 1"), 2000);
    return { ok: true, latencyMs: Date.now() - started };
  } catch (err: any) {
    return {
      ok: false,
      latencyMs: Date.now() - started,
      error: err?.message ?? String(err),
    };
  }
}

router.get("/health", async (req, res) => {
  const startedAt = Date.now();

  const [furnasDb, simaDb, balcarDb] = await Promise.all([
    checkDb(furnasPool),
    checkDb(simaPool),
    checkDb(balcarPool),
  ]);

  const dependencies = {
    furnasDb,
    simaDb,
    balcarDb,
  } as const;

  const allOk = Object.values(dependencies).every((d) => d.ok);

  const payload = {
    status: allOk ? "ok" : "degraded",
    uptimeSec: Math.round(process.uptime()),
    responseTimeMs: Date.now() - startedAt,
    timestamp: new Date().toISOString(),
    dependencies,
    memory: {
      rss: process.memoryUsage().rss,
      heapUsed: process.memoryUsage().heapUsed,
      heapTotal: process.memoryUsage().heapTotal,
    },
  };

  res.status(allOk ? 200 : 503).json(payload);
});

export default router;
