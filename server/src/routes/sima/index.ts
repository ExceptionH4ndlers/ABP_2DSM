import express from "express";
import sima from "./sima.routes";
import simaoffline from "./simaoffline.routes";
import estacao from "./estacao.routes";
import meta from "./meta.routes";
import query from "./query.routes";

const router = express.Router();

router.use("/", sima);
router.use("/simaoffline", simaoffline);
router.use("/estacao", estacao);
router.use("/meta", meta);
router.use("/query", query);

export default router;
