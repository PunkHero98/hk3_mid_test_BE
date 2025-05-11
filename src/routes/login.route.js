import express from 'express';
import loginController from '../controllers/login.controller.js';
import validateAuth from '../middlewares/authen.middle.js';
const router = express.Router();

router.post('/login',validateAuth(["email", "password"]), loginController.login);
router.post('/register', validateAuth(["userName", "email", "password"]) , loginController.register);

export default router;