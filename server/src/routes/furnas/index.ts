import express from "express";
import abioticocoluna from "./abioticocoluna.routes";
import campanha from "./campanha.routes";
import campanhaportabela from "./campanhaportabela.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";
import bolha from "./bolhas.routes";
import meta from "./meta.routes";
import query from "./query.routes";
import bioticocoluna from "./bioticocoluna.routes";
import carbono from "./carbono.routes";

const router = express.Router();

router.use("/abioticocoluna", abioticocoluna);
router.use("/campanha", campanha);
router.use("/campanhaportabela", campanhaportabela);
router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);
router.use("/bolhas", bolha);
router.use("/meta", meta);
router.use("/query", query);
router.use("/bioticocoluna", bioticocoluna);
router.use("/carbono", carbono);

export default router;
