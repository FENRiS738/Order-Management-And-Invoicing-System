import express from "express";
import { getConfirmData } from "../controllers/confirm.js";

const router = express.Router();

router.post('/', getConfirmData);

export default router;