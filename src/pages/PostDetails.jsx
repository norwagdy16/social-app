/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePosts } from "../services/PostServices";
import PostCard from "../components/PostCard";
import LoadingScreen from "../components/LodingScrean";

export default function PostDetails() {
  let { id } = useParams();

  console.log(id);

  const [post, setPost] = useState(null);

  async function getPosts() {
    const response = await getSinglePosts(id);

    if (response && response.message === "success") {
      setPost(response.post);
    } else {
      console.error("Failed to load post:", response);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className=" w-full md:w-4/6  mx-auto py-5">
        {post ? (
          <PostCard
            post={post}
            commentLimit={post.comments.length}
            callback={getPosts}
          />
        ) : (
          <LoadingScreen />
        )}
      </div>
    </>
  );
}
