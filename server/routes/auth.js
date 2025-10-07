import express from "express";
import { registerUser, loginUser , getProfileData} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

// 📝 Sign Up
router.post("/signup", registerUser);

// 🔑 Sign In
router.post("/signin", loginUser);

// 👤 Get Logged User Data
router.get("/users/profile-data", protect, getProfileData);

export default router;

