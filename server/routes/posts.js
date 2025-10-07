import express from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", protect, upload.single("image"), createPost); // ← هنا أضفنا الرفع
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
