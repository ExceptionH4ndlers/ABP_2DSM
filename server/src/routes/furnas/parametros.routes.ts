import { Router } from "express";
import { consultarParametros } from "../../controllers/furnas/parametros.controller";

const router = Router();

router.get("/", consultarParametros);

export default router;
