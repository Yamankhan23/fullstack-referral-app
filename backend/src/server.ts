import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const MONGO =
  process.env.MONGO_URI;

console.log("Connecting to MongoDB...");

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Mongo connected");
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
