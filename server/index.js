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

// ✅ Fetch a question by ID
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

// ✅ Fetch a random question
app.get("/api/v1/random", async (req, res) => {
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

// ✅ Update votes for a question
app.post("/api/vote/:id", async (req, res) => {
  try {
    const { option } = req.body; // Expect "option1" or "option2"
    const question = await Question.findById(req.params.id);

    if (!question)
      return res.status(404).json({ message: "Question not found" });

    // ✅ Increment vote count for the selected option
    if (option === "option1") {
      question.votes.option1 += 1;
    } else if (option === "option2") {
      question.votes.option2 += 1;
    } else {
      return res.status(400).json({ message: "Invalid option" });
    }

    // Save the updated question
    await question.save();

    // ✅ Fetch next random question
    const nextQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);

    res.json({
      updatedQuestion: question, // Updated vote counts
      nextQuestion: nextQuestion.length > 0 ? nextQuestion[0] : null, // Next question if available
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Default route for testing
app.get("/", async (req, res) => {
  console.log("HITTT");
  res.send({ msg: "Success" });
});

// ✅ Start server after connecting to DB
app.listen(port, async () => {
  await connectDB();
  console.log("Server running on port " + port);
});
