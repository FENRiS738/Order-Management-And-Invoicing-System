import express from "express";
import { getConfirmData, processConfirmData } from "../controllers/confirm.js";

const router = express.Router();

router.post('/', getConfirmData);
router.post('/submit', processConfirmData);

export default router;