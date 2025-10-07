/** @format */

import React, { useContext, useState } from "react";
import PostHeader from "./card/PostHeader";
import PostBody from "./card/PostBody";
import PostFooter from "./card/PostFooter";
// import Comments from "./Comments";
import { Button, Input, Textarea } from "@heroui/react";
import {
  createCimmentApi,
  getPostCommentApi,
} from "../services/CommentServices";
import { AuthContext } from "../context/AuthContext";
import { deletePostApi, updatePostApi } from "../services/PostServices";
import DropDownPost from "./DropDowenPosts";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function PostCard({ post, commentLimit, callback }) {
  const { userData } = useContext(AuthContext);

  const [commentContent, setCommentContent] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(post.body);
  const [editImage, setEditImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(post.image);
  const [editLoading, setEditLoading] = useState(false);

  //comment
  async function createComment(e) {
    e.preventDefault();
    setIsloading(true);
    const response = await createCimmentApi(commentContent, post._id);
    if (response.message === "success") {
      await getPostComments();
      setCommentContent("");
    }
    setIsloading(false);
  }

  //get comment
  async function getPostComments() {
    const response = await getPostCommentApi(post._id);
    if (response.message === "success") {
      setComments(response.comments);
    }
  }

  //delete
  async function handleDelete() {
    const result = await Swal.fire({
      title: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: null,
    });

    if (result.isConfirmed) {
      try {
        const response = await deletePostApi(post._id);

        if (response.message === "success") {
          await Swal.fire({
            title: "Post deleted successfully.",
            showConfirmButton: true,
            confirmButtonText: "OK",
            icon: null,
          });
          await callback();
        } else {
          await Swal.fire({
            title: "Failed to delete post.",
            confirmButtonText: "OK",
            icon: null,
          });
        }
      } catch (error) {
        await Swal.fire({
          title: "Something went wrong. Please try again.",
          confirmButtonText: "OK",
          icon: null,
        });
      }
    }
  }

  //edit
  async function saveEdit() {
    setEditLoading(true);
    const formData = new FormData();
    formData.append("body", editBody);
    if (editImage) formData.append("image", editImage);

    const response = await updatePostApi(post._id, formData);
    if (response.message === "success") {
      toast.success("Post updated successfully");
      setIsEditing(false);
      await callback();
    } else {
      toast.error("Failed to update post");
    }
    setEditLoading(false);
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 py-4 px-5 my-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <PostHeader
          photo={post.user.photo}
          name={post.user.name}
          data={post.createdAt}
        />

        {userData._id === post.user._id && (
          <DropDownPost
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        )}
      </div>
      {/* Body or Edit Mode */}
      {isEditing ? (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4 animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-700">✏️ Edit Post</h3>

          {/* Body text area */}
          <Textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            minRows={1}
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Update your post content..."
          />

          {/* Image preview */}
          {previewImage && (
            <div className="relative rounded-lg overflow-hidden border border-gray-300">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full object-cover max-h-60"
              />
              <button
                onClick={() => {
                  setPreviewImage(null);
                  setEditImage(null);
                }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition-all"
              >
                ✕
              </button>
            </div>
          )}

          {/* File input */}
          <label className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 hover:border-blue-400 transition-all rounded-lg px-3 py-2 w-fit text-sm text-gray-600 shadow-sm">
            <input
              type="file"
              onChange={(e) => {
                setEditImage(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
              className="hidden"
            />
            📸Change Image
          </label>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-2">
            <Button
              onClick={saveEdit}
              isLoading={editLoading}
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md transition-all"
            >
              Save Changes
            </Button>

            <Button
              variant="flat"
              color="danger"
              onClick={() => setIsEditing(false)}
              className="rounded-lg shadow-sm hover:bg-red-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <PostBody body={post.body} image={post.image} />
      )}
      {/* Footer */}
      <PostFooter postId={post._id} commentNumber={comments.length} />{" "}
      {/* Comment input */}
      {/* <form
        onSubmit={createComment}
        className="flex items-center gap-3 mt-3 border-t pt-3"
      >
        <Input
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          variant="bordered"
          placeholder="Write a comment..."
          className="flex-1 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <Button
          isLoading={isloading}
          type="submit"
          disabled={commentContent.length < 2}
          className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-5"
        >
          Comment
        </Button>
      </form> */}
      {/* Comments */}
      {/* {comments.length > 0 && (
        <div className="mt-4 space-y-3">
          {comments.slice(0, commentLimit).map((comment) => (
            <Comments
              key={comment._id}
              comment={comment}
              postUserId={post.user._id}
              callback={getPostComments}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}
