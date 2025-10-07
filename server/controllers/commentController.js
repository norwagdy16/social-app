import Comment from "../models/Comment.js";
import Post from "../models/Post.js";


export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Comment content is required" });
    }


    const userId = req.user._id;

    const newComment = await Comment.create({
      content,
      user: userId,
      post: postId,
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json({ message: "success", comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating comment" });
  }
};


export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "name photo") 
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "success", comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching comments" });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment)
      return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
