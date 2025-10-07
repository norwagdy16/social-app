// /** @format */

// import axios from "axios";

// export async function getAllPosts() {
//   try {
//     const { data } = await axios.get(
//       `https://linked-posts.routemisr.com/posts`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//         params: {
//           limit: 30,
//           sort: "-createdAt",
//         },
//       }
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getSinglePosts(postId) {
//   try {
//     const { data } = await axios.get(
//       `https://linked-posts.routemisr.com/posts/${postId}`,
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

// export async function createPostApi(formData) {
//   try {
//     const { data } = await axios.post(
//       `https://linked-posts.routemisr.com/posts`,
//       formData,
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

// export async function updatePostApi(postId, formData) {
//   try {
//     const { data } = await axios.put(
//       `https://linked-posts.routemisr.com/posts/${postId}`,
//       formData,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log("update:", data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return { message: "error" };
//   }
// }

// export async function deletePostApi(postId) {
//   try {
//     const { data } = await axios.delete(
//       `https://linked-posts.routemisr.com/posts/${postId}`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }
/** @format */
import axios from "axios";

const API_BASE_URL = "https://new-react-production.up.railway.app/api/posts";

export async function getAllPosts() {
  try {
    const { data } = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        limit: 30,
        sort: "-createdAt",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

export async function getSinglePosts(postId) {
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

export async function createPostApi(formData) {
  try {
    const { data } = await axios.post(API_BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

export async function updatePostApi(postId, formData) {
  try {
    const { data } = await axios.put(`${API_BASE_URL}/${postId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log("update:", data);
    return data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    return { message: "error" };
  }
}

export async function deletePostApi(postId) {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}
