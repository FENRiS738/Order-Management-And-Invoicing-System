// MODULES
import express from "express";
import { getCustomerData, saveCustomerData } from "../controllers/customer.js";

// APP
const router = express.Router();

router.post("/", getCustomerData);

router.post("/submit", saveCustomerData);

export default router;
