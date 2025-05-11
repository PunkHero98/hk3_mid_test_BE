import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

postSchema.pre("save", function (next) {
    if (!this.isModified("content")) {
        return next();
    }
    this.content = this.content.trim();
    next();
});

export const PostModel = mongoose.model("Post", postSchema);