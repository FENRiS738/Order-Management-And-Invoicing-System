import express from "express";
import { getAdminPage, addAdminData, getItemData, deleteItemData } from "../controllers/admin.js";

const router = express.Router();

router.get('/', getAdminPage);
router.post('/', addAdminData);
router.get('/:id', getItemData);
router.delete('/:id', deleteItemData);

export default router;