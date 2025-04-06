import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.vrrhc72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// mongodb+srv://yt781703:P4s11AiPySKWieYM@cluster0.vrrhc72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
async function db() {
  try {
    await mongoose.connect(URL);
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
}

export default db;
