// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", 
      },
    ],
  },
  { timestamps: true } 
);

const Post = mongoose.model("Post", postSchema);

export default Post;
