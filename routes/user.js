import express from "express";
import { deleteUser, getUser, getUsers, Signin, signup, updateUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth, getUsers)
router.get('/:id', auth, getUser)
router.post('/signup', signup)
router.post('/signin', Signin)
router.patch('/update/:id', auth, updateUser)
router.delete('/delete/:id', auth, deleteUser)

export default router;