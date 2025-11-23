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
import dadosrepresa from "./dadosrepresa.routes";
import carbono from "./carbono.routes";
import bioticosuperficie from "./bioticosuperficie.routes";
import abioticosuperficie from "./abioticosuperficie.routes";
import dupladessorcaoagua from "./dupladessorcaoagua.routes";
import dadostimeseries from "./dadostimeseries.routes";
import { getFurnasData } from "../../controllers/furnas/furnas.controller";

const router = express.Router();

// Rota principal GET /furnas com filtros avançados
router.get("/", getFurnasData);

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
router.use("/dadosrepresa", dadosrepresa);
router.use("/carbono", carbono);
router.use("/bioticosuperficie", bioticosuperficie);
router.use("/abioticosuperficie", abioticosuperficie);
router.use("/dupladessorcaoagua", dupladessorcaoagua);
router.use("/dadostimeseries", dadostimeseries);

export default router;
