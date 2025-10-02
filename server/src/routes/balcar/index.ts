import express from "express";
import reservatorio from "./reservatorio.routes";
import instituicao from "./instituicao.routes";
import tabelacampo from "./tabelacampo.routes";

const router = express.Router();

router.use("/reservatorio", reservatorio);
router.use("/instituicao", instituicao);
router.use("/tabelacampo", tabelacampo);

export default router;
