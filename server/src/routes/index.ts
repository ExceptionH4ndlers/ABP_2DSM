import express from "express";
import sima from "./sima";
import balcar from "./balcar";
import furnas from "./furnas";

const router = express.Router();

router.use("/sima", sima);
router.use("/balcar", balcar);
router.use("/furnas", furnas);

export default router;
