/** @format */
import { Button, Spinner, Textarea } from "@heroui/react";
import { useState } from "react";
import { createPostApi } from "../services/PostServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";

export default function AddPosts({ callback }) {
  const [postBody, setPostBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        body: postBody,
        image: imageUrl,
      };

      const response = await createPostApi(data);

      if (response.message === "success") {
        toast.success("🌸 Post added successfully!");
        setPostBody("");
        setImageUrl("");

        if (callback) callback();

        navigate("/posts");
      } else {
        toast.error("❌ Failed to add post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200 px-4">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Create a Lovely Post 💕
        </h2>

        <form
          onSubmit={createPost}
          className="flex flex-col gap-6 items-center"
        >
          {imageUrl ? (
            <div className="relative w-48 h-48">
              <img
                src={imageUrl}
                className="w-full h-full object-cover rounded-2xl border-4 border-pink-300 shadow-lg"
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
            <UploadImage
              onSuccess={(url) => {
                setImageUrl(url);
                toast.success("🌸 Image uploaded!");
              }}
            />
          )}

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

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute flex justify-center items-center inset-0 bg-white/70 rounded-3xl">
            <Spinner size="lg" color="danger" />
          </div>
        )}
      </div>
    </div>
  );
}
