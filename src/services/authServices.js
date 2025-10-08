/** @format */
import axios from "axios";

const API_BASE_URL = "https://new-react-production.up.railway.app/api/auth";

export async function getUserDataApi() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ No token found in localStorage");
      return { message: "No token" };
    }

    const { data } = await axios.get(`${API_BASE_URL}/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("✅ User Data:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ getUserDataApi Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}

export async function sendRegister(userData) {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/signup`, userData);
    // console.log("✅ Register:", data);

    if (data?.token) localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.error(
      "❌ sendRegister Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}

export async function sendLogin(userData) {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/signin`, userData);
    // console.log("✅ Login:", data);

    if (data?.token) localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.error("❌ sendLogin Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}
