import express from "express";
import { getOrdersData, saveOrdersData } from "../controllers/order.js";

const router = express.Router();

router.post('/', getOrdersData);
router.post('/submit', saveOrdersData);

export default router;