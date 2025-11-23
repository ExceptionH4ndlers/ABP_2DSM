import { getAxiosInstance } from "./axiosConfig";
import type { BufferCoverageMetrics, BufferGeometry } from "../utils/bufferIntersections";

type BufferCoverageResponse = {
  success: boolean;
  metrics: BufferCoverageMetrics;
};

export async function fetchBufferCoverage(
  bufferA: BufferGeometry,
  bufferB: BufferGeometry,
): Promise<BufferCoverageMetrics> {
  const axios = getAxiosInstance();
  const { data } = await axios.post<BufferCoverageResponse>("/analysis/buffer/coverage", {
    bufferA,
    bufferB,
  });

  return data.metrics;
}
