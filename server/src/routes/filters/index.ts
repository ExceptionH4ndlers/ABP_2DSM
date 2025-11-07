import { Router } from "express";
import meta from "./meta.routes";

const router = Router();

router.use("/meta", meta);

export default router;
