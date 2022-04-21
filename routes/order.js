import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders } from "../controllers/order.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth, getOrders)
router.get('/:id', auth, getOrder)
router.post('/create', auth, createOrder)
router.delete('/delete/:id', auth, deleteOrder)

export default router;