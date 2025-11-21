import { Router } from "express";
import { consultarParametros } from "../../controllers/furnas/parametrosController";

const router = Router();

router.get("/", consultarParametros);

export default router;
