import { connectDB } from "./config/db.js";
import Question from "./models/questionModel.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const bulkQuestions = [];
const getRandomVotes = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

bulkQuestions.forEach((question) => {
  question.votes.option1 = getRandomVotes(10, 500);
  question.votes.option2 = getRandomVotes(10, 500);
});

async function addBulkQuestions() {
  try {
    await connectDB(); // Ensure the connection is established before proceeding
    const result = await Question.insertMany(bulkQuestions);
    console.log(`${result.length} questions added successfully.`);
  } catch (err) {
    console.error("Error adding bulk questions:", err);
  } finally {
    mongoose.connection.close(); // Close the DB connection
  }
}

addBulkQuestions();
