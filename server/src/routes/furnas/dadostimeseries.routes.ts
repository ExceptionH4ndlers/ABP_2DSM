import { Router } from "express";
import { getAll } from "../../controllers/furnas/dadostimeseries.controllers";

const router = Router();

router.get("/", getAll);

export default router;
