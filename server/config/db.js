import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully at: " + conn.connection.host);
  } catch (error) {
    console.error("Error in connecting to database... " + error);
    process.exit(1);
  }
};
