import express from "express";
import reservatorio from "./reservatorio.routes";

const router = express.Router();

router.use("/reservatorio", reservatorio);

export default router;
