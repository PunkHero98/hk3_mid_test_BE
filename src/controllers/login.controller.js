import { UserModel } from "../models/user.model.js";
import { generateAPIKey } from "../utils/generateAPIKey.js";


const loginController = {
    login: async (req, res) => {
      try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        };
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        };
        const apiKey = await generateAPIKey(user._id, user.email);
        return res.status(200).json({ message: "Login successful", apiKey });
      }catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Error while login" });
      }
    },

    register: async (req, res) => {
      try{
        const { userName, email, password } = req.body;
        const existingUser = await UserModel.findOne({email});
        if (existingUser) {
          return res.status(400).json({ message: "Email already exists" });
        };
        const user = await UserModel.create({ userName, email, password });
        return res.status(201).json({ message: "User created successfully", user });
      }catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Error while registering" });
      }
    },
  };
  
  export default loginController;
  