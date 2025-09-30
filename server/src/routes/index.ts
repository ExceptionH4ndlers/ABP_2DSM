import express from "express";
import sima from "./sima";

const router = express.Router();

router.use("/sima", sima);

export default router;
