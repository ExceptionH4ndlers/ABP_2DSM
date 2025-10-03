import { Router } from "express";
import { getAll, getAllSimple } from "../../controllers/sima/estacao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/simple", getAllSimple);

export default router;
