// /** @format */

// import axios from "axios";

// export async function createCimmentApi(commentContent, postId) {
//   try {
//     const { data } = await axios.post(
//       `https://linked-posts.routemisr.com/comments`,
//       {
//         content: commentContent,
//         post: postId,
//       },
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function deleteCommentApi(commentId) {
//   try {
//     const { data } = await axios.delete(
//       `https://linked-posts.routemisr.com/comments/${commentId}`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getPostCommentApi(postId) {
//   try {
//     const { data } = await axios.get(
//       `https://linked-posts.routemisr.com/posts/${postId}/comments`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }
/** @format */

import axios from "axios";

// 🧩 رابط السيرفر بتاعك على Railway
const API_BASE_URL = "https://new-react-production.up.railway.app/api/comments";

// 📝 إنشاء كومنت جديد
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
    console.log("✅ Comment Created:", data);
    return data;
  } catch (error) {
    console.error("❌ createCommentApi Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}


// 🗑️ حذف كومنت
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

// 💬 جلب كل الكومنتات الخاصة ببوسط معين
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
