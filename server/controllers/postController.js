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
    console.error(err);
    res.status(500).json({ message: "error", error: err.message });
  }
};

// 🟢 Get single post by ID
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "name photo")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name photo" },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "success", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error", error: err.message });
  }
};


// 🟢 Create a post (يدعم ImageKit)
export const createPost = async (req, res) => {
  try {
    const { body, image } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "error", error: "User not authorized" });
    }

    // 🔹 الصورة هنا بتيجي كرابط جاهز من ImageKit
    const post = await Post.create({
      body,
      image: image || null, // هيكون URL من ImageKit
      user: req.user._id,
    });

    res.json({ message: "success", post });
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
    console.error(err);
    res.status(500).json({ message: "error", error: err.message });
  }
};
