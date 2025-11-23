import { Router } from "express";
import { getAll, getDateRange } from "../../controllers/sima/sima.controller";

const router = Router();

router.get("/all", getAll);
router.get("/date-range", getDateRange);

export default router;
