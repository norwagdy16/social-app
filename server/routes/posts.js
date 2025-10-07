import express from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔓 Public routes
router.get("/", getAllPosts);

// 🔒 Protected routes
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
