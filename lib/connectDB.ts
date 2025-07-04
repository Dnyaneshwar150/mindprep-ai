import mongoose, { Connection } from "mongoose";
import { logger } from "./logger";

let cachedConnection: Connection | null = null;

export async function connectDB() {
  if (cachedConnection) {
    logger.info("🟢 Using cached MongoDB connection"); // ✅ Log cached usage
    return cachedConnection;
  }

  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI!);
    cachedConnection = cnx.connection;
    logger.info("✅ New MongoDB connection established"); // ✅ Log successful connection
    return cachedConnection;
  } catch (error) {
    logger.error(`❌ MongoDB connection error: ${error}`); // ✅ Log errors
    throw error;
  }
}
