import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// 📝 Sign Up
router.post("/signup", registerUser);

// 🔑 Sign In
router.post("/signin", loginUser);

export default router;

