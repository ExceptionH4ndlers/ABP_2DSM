import { Router } from "express";
import { runSelect } from "../../controllers/sima/query.controller";

const router = Router();

router.post("/select", runSelect);

export default router;
