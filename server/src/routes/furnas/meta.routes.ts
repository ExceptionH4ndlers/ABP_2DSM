import { Router } from "express";
import { listTables, listColumns } from "../../controllers/furnas/meta.controller";

const router = Router();

router.get("/tables", listTables);
router.get("/tables/:table/columns", listColumns);

export default router;


