import express from "express";
import { getOrdersData, saveOrdersData, commitOrder } from "../controllers/order.js";

const router = express.Router();

router.post('/', getOrdersData);
router.post('/submit', saveOrdersData);
router.post('/commit', commitOrder);

export default router;