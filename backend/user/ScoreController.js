import User from "./UserModel.js";
import generateToken from "../data/token.js";
import asyncHandler from "express-async-handler";
import { token } from "morgan";
import mongoose from "mongoose";

//allScoresby user
const getAllScorebyuser = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user.scores);
};

//addScore
const AddScores = async (req, res) => {
  const { score, id } = req.body; // Extract score from request body

  const user = await User.findById(id);

  if (!user) {
    +res.status(404);
    throw new Error("User not found");
  }

  // Ensure `user.scores` is an array and update it
  if (!Array.isArray(user.scores)) {
    user.scores = [];
  }
  if (!user.scores.includes(score)) {
    user.scores.push(score); // Add new score to existing array
  }

  await user.save(); // Save user data

  res.status(200).json({
    scores: user.scores,
  });
};

//clearScore
const ClearScore = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.scores = [];
    }
    res.json({ message: "Scores deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { AddScores, ClearScore, getAllScorebyuser };
