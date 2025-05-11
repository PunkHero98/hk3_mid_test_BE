//function to check the apiKey is valid or not with format mern-$userId$-$email$-$randomstring$
import { UserModel } from "../models/user.model.js";

import mongoose from "mongoose";

const checkAuthenticate = async (req, res, next) => {
  try {
    const apiKey = req.query.apiKey;
    if (!apiKey) {
      return res.status(401).json({ message: "API key is missing" });
    }

    const parts = apiKey.split("-");
    if (parts.length !== 4) {
      return res.status(400).json({ message: "Invalid API key format" });
    }

    const [prefix, userId, email, randomString] = parts;

    // Bước 1: Kiểm tra prefix
    if (prefix !== "mern") {
      return res.status(401).json({ message: "Invalid API key prefix" });
    }

    // Bước 2: Kiểm tra userId có hợp lệ và tồn tại
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "Invalid user ID format" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Bước 3: Kiểm tra email có khớp với user không
    if (user.email !== email) {
      return res.status(401).json({ message: "Email does not match user" });
    }

    // Bước 4: Kiểm tra randomString có phải hex 32 ký tự không
    const hexRegex = /^[a-f0-9]{32}$/i;
    if (!hexRegex.test(randomString)) {
      return res.status(401).json({ message: "Invalid random string in API key" });
    }

    // ✅ Passed all checks
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default checkAuthenticate;

