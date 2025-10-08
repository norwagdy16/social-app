/** @format */
import axios from "axios";

const API_BASE_URL = "https://new-react-production.up.railway.app/api/posts";

export async function getAllPosts() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 30,
        sort: "-createdAt",
      },
    });
    // console.log("✅ All Posts:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ getAllPosts Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}

// 🟢 Get single post by ID
export async function getSinglePost(postId) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API_BASE_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("✅ Single Post:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ getSinglePost Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}

// 🟢 Create a new post
export async function createPostApi(postData) {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(API_BASE_URL, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("✅ Post Created:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ createPostApi Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}

// 🟢 Update post
export async function updatePostApi(postId, { body, imageFile, oldImage }) {
  try {
    const token = localStorage.getItem("token");
    let imageUrl = oldImage;

    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      const uploadRes = await axios.post(
        "https://new-react-production.up.railway.app/api/upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      imageUrl = uploadRes.data.url;
    }

    const { data } = await axios.put(
      `${API_BASE_URL}/${postId}`,
      { body, image: imageUrl },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("✅ Post Updated:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ updatePostApi Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}

// 🟢 Delete post
export async function deletePostApi(postId) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`${API_BASE_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("🗑️ Post Deleted:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ deletePostApi Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}
