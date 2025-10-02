import express from "express";
import reservatorio from "./reservatorio.routes";
import instituicao from "./instituicao.routes";

const router = express.Router();

router.use("/reservatorio", reservatorio);
router.use("/instituicao", instituicao);

export default router;
