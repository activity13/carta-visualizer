import mongoose from "mongoose";
const { MONGODB_LOCAL } = process.env;
export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!MONGODB_LOCAL) {
    throw new Error("Please define the MONGODB_LOCAL environment variable");
  }
  try {
    await mongoose.connect(MONGODB_LOCAL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
