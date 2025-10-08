import express from "express";
import {
  createComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js"; 

const router = express.Router();


router.post("/:postId", protect, createComment);


router.get("/:postId", getCommentsByPost);


router.delete("/:commentId", protect, deleteComment);

export default router;
