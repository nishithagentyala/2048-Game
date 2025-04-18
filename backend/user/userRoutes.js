import express from "express";
const router = express.Router();
import {
  loginUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  userDetails,
} from "./UserController.js";
import { AddScores, ClearScore, getAllScorebyuser } from "./ScoreController.js";
import { protect } from "../data/authMiddleware.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.route("/").get(userDetails);
router.route("/score").post(AddScores);
router.route("/score/:id").get(getAllScorebyuser).delete(ClearScore);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
