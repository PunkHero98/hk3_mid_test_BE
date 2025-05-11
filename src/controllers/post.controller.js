import { PostModel } from "../models/post.model.js";
const postController = {
    createPost: async (req, res) => {
        try {
            const { content } = req.body;
            const post = await PostModel.create({ userId: req.user._id, content });
            return res.status(201).json({ message: "Post created successfully", post });
        } catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ message: "Error while creating post" });
        }
    },

    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const post = await PostModel.findById(id);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            if (post.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "You are not authorized to update this post" });
            }
            post.content = content;
            await post.save();
            return res.status(200).json({ message: "Post updated successfully", post });
        } catch (error) {
            console.error("Error updating post:", error);
            return res.status(500).json({ message: "Error while updating post" });
        }
    },
};

export default postController;