import { Router } from "express";
import { runSelect } from "../../controllers/balcar/query.controller";

const router = Router();

router.post("/select", runSelect);

export default router;
