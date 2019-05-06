import AuthController from '../controllers/authController';
import express from 'express';
const router = express.Router();

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)


export default router;
