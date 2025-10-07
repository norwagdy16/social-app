// controllers/postController.js
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// 🟢 Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name photo")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name photo" },
      })
      .sort({ createdAt: -1 });

    res.json({ message: "success", posts });
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });
  }
};

// 🟢 Create a post
export const createPost = async (req, res) => {
  try {
    const { body, image } = req.body;
    const post = await Post.create({
      body,
      image,
      user: req.userId, 
    });
    res.json({ message: "success", post });
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });
  }
};

// 🟢 Update post
export const updatePost = async (req, res) => {
  try {
    const { body, image } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { body, image },
      { new: true }
    );
    res.json({ message: "success", post: updated });
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });
  }
};

// 🟢 Delete post
export const deletePost = async (req, res) => {
  try {
    await Comment.deleteMany({ post: req.params.id });
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });
  }
};
