import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const mongoUrl = "mongodb://127.0.0.1:27017/sportzone";

  await mongoose.connect(mongoUrl);
  console.log("MongoDB connectat correctament");
}