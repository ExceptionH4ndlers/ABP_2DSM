import { Router } from "express";
import { runSelect } from "../../controllers/furnas/query.controller";

const router = Router();

router.post("/select", runSelect);

export default router;
