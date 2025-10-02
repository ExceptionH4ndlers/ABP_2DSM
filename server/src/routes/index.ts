import express from "express";
import sima from "./sima";
import balcar from "./balcar";

const router = express.Router();

router.use("/sima", sima);
router.use("/balcar", balcar);

export default router;
