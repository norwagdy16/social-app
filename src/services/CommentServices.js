/** @format */

import axios from "axios";


const API_BASE_URL = "https://new-react-production.up.railway.app/api/comments";

export async function createCommentApi(commentContent, postId) {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/${postId}`,
      { content: commentContent },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("✅ Comment Created:", data);
    return data;
  } catch (error) {
    console.error("❌ createCommentApi Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}


export async function deleteCommentApi(commentId) {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

export async function getPostCommentApi(postId) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}
