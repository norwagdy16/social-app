/** @format */

import { Button, Spinner, Textarea } from "@heroui/react";
import { useState } from "react";
import { createPostApi } from "../services/PostServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddPosts({ callback }) {
  const [postBody, setPostBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("body", postBody);
    if (image) formData.append("image", image);

    try {
      const response = await createPostApi(formData);

      if (response.message === "success") {
        toast.success("🌸 Post added successfully!");

        // reset fields
        setPostBody("");
        setImageUrl("");

        if (callback) callback();

        navigate("/Posts");
      } else {
        toast.error("❌ Failed to add post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200 px-4">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Create a Lovely Post 💕
        </h2>

        {/* Form */}
        <form onSubmit={createPost} className="flex flex-col gap-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            {imageUrl ? (
              <div className="relative w-full">
                <img
                  src={imageUrl}
                  className="w-full h-64 object-cover rounded-3xl border-4 border-pink-300 shadow-lg"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-3 right-3 bg-rose-500 text-white p-2 rounded-full shadow-md hover:bg-rose-600 transition"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="w-32 h-32 flex flex-col items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 shadow-md cursor-pointer transition">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                  accept="image/*"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="mt-2 text-sm font-semibold">Upload</span>
              </label>
            )}
          </div>

          {/* Description */}
          <Textarea
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            placeholder="Write something beautiful... 🌷"
            minRows={4}
            className="w-full h-32 resize-none 
             border border-pink-300 rounded-xl 
             p-3 text-gray-700 
             focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          />

          {/* Button */}
          <Button
            type="submit"
            className="w-full py-3 rounded-full font-bold text-lg
                   bg-gradient-to-r from-pink-400 to-purple-500 text-white 
                   hover:from-pink-500 hover:to-purple-600 shadow-md transition"
          >
            {loading ? <Spinner color="white" size="sm" /> : "Add Post"}
          </Button>
        </form>

        {/* Overlay Loading */}
        {loading && (
          <div className="absolute flex justify-center items-center inset-0 bg-white/70 rounded-3xl">
            <Spinner size="lg" color="danger" />
          </div>
        )}
      </div>
    </div>
  );
}
