import { Router } from "express";
import { postBufferCoverage } from "../controllers/analysis/bufferCoverage.controller";

const router = Router();

router.post("/buffer/coverage", postBufferCoverage);

export default router;
