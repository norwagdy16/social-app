// /** @format */

// import axios from "axios";

// export async function getUserDataApi() {
//   try {
//     let { data } = await axios.get(
//       `https://linked-posts.routemisr.com/users/profile-data`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error.response.data);
//     return error.response.data;
//   }
// }

// export async function sendRegister(userData) {
//   try {
//     let { data } = await axios.post(
//       `https://linked-posts.routemisr.com/users/signup`,
//       userData
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error.response.data);
//     return error.response.data;
//   }
// }

// export async function sendLogin(userData) {
//   try {
//     let { data } = await axios.post(
//       `https://linked-posts.routemisr.com/users/signin`,
//       userData
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error.response.data);
//     return error.response.data;
//   }
// }
/** @format */
import axios from "axios";

// 🔗 عنوان السيرفر على Railway
const API_BASE_URL = "https://new-react-production.up.railway.app/api/auth";

// 🧠 1. جلب بيانات المستخدم الحالي (لو داخل بتوكن)
export async function getUserDataApi() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ No token found in localStorage");
      return { message: "No token" };
    }

    const { data } = await axios.get(`${API_BASE_URL}/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ لازم تكون Bearer token
      },
    });

    console.log("✅ User Data:", data);
    return data;
  } catch (error) {
    console.error("❌ getUserDataApi Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}

// 📝 2. تسجيل مستخدم جديد
export async function sendRegister(userData) {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/signup`, userData);
    console.log("✅ Register:", data);

    // حفظ التوكن بعد التسجيل
    if (data?.token) localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.error("❌ sendRegister Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}

// 🔐 3. تسجيل الدخول
export async function sendLogin(userData) {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/signin`, userData);
    console.log("✅ Login:", data);

    // حفظ التوكن بعد تسجيل الدخول
    if (data?.token) localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.error("❌ sendLogin Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}
