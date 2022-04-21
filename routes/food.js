import express from "express";
import { createFood, deleteFood, getFood, getFoods, updateFood } from "../controllers/food.js";
import auth from "../middleware/auth.js";


const router = express.Router()

router.get('/', getFoods)
router.get('/:id', getFood)
router.post('/create', auth, createFood)
router.patch('/update/:id', auth, updateFood)
router.delete('/delete/:id', auth, deleteFood)

export default router