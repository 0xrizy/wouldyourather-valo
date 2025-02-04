import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDB();
  console.log("Server running on port " + port);
});
