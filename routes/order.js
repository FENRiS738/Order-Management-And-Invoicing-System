import express from "express";
import { getOrdersData } from "../controllers/order.js";

const router = express.Router();

router.get('/', getOrdersData);

export default router;