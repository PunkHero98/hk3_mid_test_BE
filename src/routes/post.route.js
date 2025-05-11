import express from "express";
import postController from "../controllers/post.controller.js";
import checkAuthenticate from "../middlewares/checkAuthenticate.middle.js";
import validateAuth from "../middlewares/authen.middle.js";
const router = express.Router();

router.put('/:id' ,validateAuth(["content"]) ,checkAuthenticate, postController.updatePost);
router.post('/' ,validateAuth(["content"]), checkAuthenticate ,  postController.createPost);


export default router;