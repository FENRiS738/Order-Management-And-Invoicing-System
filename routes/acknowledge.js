import express from "express";
import { checkout, getAcknowledgeData } from "../controllers/acknowledge.js";

const router = express.Router();

router.get("/", getAcknowledgeData);
router.post("/checkout", checkout);

export default router;