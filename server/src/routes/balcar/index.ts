import express from "express";
import reservatorio from "./reservatorio.routes";
import instituicao from "./instituicao.routes";
import tabelacampo from "./tabelacampo.routes";
import campanha from "./campanha.routes";
import fluxoinpe from "./fluxoinpe.routes";
import meta from "./meta.routes";
import query from "./query.routes";

const router = express.Router();

router.use("/reservatorio", reservatorio);
router.use("/instituicao", instituicao);
router.use("/tabelacampo", tabelacampo);
router.use("/campanha", campanha);
router.use("/fluxoinpe", fluxoinpe);
router.use("/meta", meta);
router.use("/query", query);

export default router;
