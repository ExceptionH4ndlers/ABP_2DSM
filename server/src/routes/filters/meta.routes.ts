import { Router } from "express";
import { getFiltersMeta } from "../../controllers/filters/meta.controller";

const router = Router();

router.get("/", getFiltersMeta);

export default router;
