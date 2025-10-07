/** @format */

import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../services/PostServices";
import LoadingScreen from "../components/LodingScrean";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  async function getAllPostsApi() {
    const response = await getAllPosts();
    setPosts(response.posts || []);
  }

  useEffect(() => {
    getAllPostsApi();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className=" w-full md:w-4/6  mx-auto pb-20 px-3">
        {posts.length === 0 ? (
          <LoadingScreen />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              commentLimit={1}
              callback={getAllPostsApi}
              post={post}
            />
          ))
        )}
      </div>

      <button
        onClick={() => navigate("/addposts")}
        className="fixed cursor-pointer bottom-6 right-6 
             bg-gradient-to-r from-pink-400 to-pink-600 
             text-white rounded-full
             w-16 h-16 flex items-center justify-center 
             text-4xl font-bold shadow-xl 
             hover:from-pink-500 hover:to-pink-700 
             transition duration-300 ease-in-out transform hover:scale-110"
      >
        +
      </button>
    </div>
  );
}
