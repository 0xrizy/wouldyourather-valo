import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  option1: {
    type: String,
    required: true,
    trim: true,
  },
  option2: {
    type: String,
    required: true,
    trim: true,
  },
  votes: {
    option1: {
      type: Number,
      default: 0,
    },
    option2: {
      type: Number,
      default: 0,
    },
  },
  category: {
    type: String,
    enum: [
      "fun",
      "serious",
      "hypothetical",
      "silly",
      "philosophical",
      "gameplay with friends",
      "agents",
      "gameplay",
      "skins",
    ],
    default: "fun",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
