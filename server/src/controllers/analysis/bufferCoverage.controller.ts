import { Request, Response } from "express";
import { calculateBufferCoverage, BufferGeometry } from "../../utils/bufferIntersections";
import { logger } from "../../configs/logger";

type BufferCoverageRequest = {
  bufferA?: BufferGeometry;
  bufferB?: BufferGeometry;
};

export const postBufferCoverage = (req: Request, res: Response): void => {
  const { bufferA, bufferB } = req.body as BufferCoverageRequest;

  if (!bufferA || !bufferB) {
    logger.warn("Payload inválido em /analysis/buffer/coverage", { hasBufferA: !!bufferA, hasBufferB: !!bufferB });
    res.status(400).json({
      success: false,
      error: "Requisição inválida: envie bufferA e bufferB no corpo (GeoJSON Polygon ou MultiPolygon).",
    });
    return;
  }

  try {
    logger.info("Calculando coverage", {
      bufferASummary: {
        type: bufferA?.type,
      },
      bufferBSummary: {
        type: bufferB?.type,
      },
    });
    const metrics = calculateBufferCoverage(bufferA, bufferB);

    logger.info("Coverage calculado", metrics);
    res.status(200).json({
      success: true,
      metrics,
    });
  } catch (error: any) {
    logger.error("Erro ao calcular cobertura de buffers", {
      message: error?.message,
      stack: error?.stack,
      bufferAError: typeof bufferA,
      bufferBError: typeof bufferB,
      bufferASummary: {
        type: bufferA?.type,
      },
      bufferBSummary: {
        type: bufferB?.type,
      },
    });

    res.status(500).json({
      success: false,
      error: "Erro ao calcular cobertura entre buffers.",
    });
  }
};
