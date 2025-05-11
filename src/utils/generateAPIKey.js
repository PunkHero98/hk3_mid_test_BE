// function to generate has this format mern-$userId$-$email$-$randomstring$
import crypto from "crypto";

const generateAPIKey = async (userId, email) => {
  try {
    const randomString = crypto.randomBytes(16).toString("hex");
    const apiKey = `mern-${userId}-${email}-${randomString}`;
    return apiKey;
  } catch (error) {
    console.error("Error generating API key:", error);
    throw new Error("Error generating API key");
  }
};

export { generateAPIKey };