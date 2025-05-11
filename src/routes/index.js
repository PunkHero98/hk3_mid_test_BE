import express from 'express';
import loginRouter from './login.route.js';
import postRouter from './post.route.js';
const router = express.Router();

router.use('/user', loginRouter);
router.use('/posts', postRouter);

export default router;
