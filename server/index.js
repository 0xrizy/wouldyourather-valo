import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Question from "./models/questionModel.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/api/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.get("/random", async (req, res) => {
  try {
    const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
    if (randomQuestion.length === 0) {
      return res.status(404).json({ message: "No questions available" });
    }
    res.json(randomQuestion[0]);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.get("/", async (req, res) => {
  console.log("HITTT");
  res.send({ msg: "Scuess" });
});

app.listen(port, async () => {
  await connectDB();
  console.log("Server running on port " + port);
});
