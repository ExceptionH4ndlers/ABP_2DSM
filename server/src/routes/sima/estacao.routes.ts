import { Router } from "express";
import { getAll } from "../../controllers/sima/estacao.controller";

const router = Router();

router.get("/all", getAll);

export default router;
