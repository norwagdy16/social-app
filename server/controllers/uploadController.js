/** @format */

import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

export const uploadToImageKit = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const formData = new FormData();
    formData.append("file", file.buffer.toString("base64"));
    formData.append("fileName", file.originalname);

    const uploadResponse = await axios.post(
      "https://upload.imagekit.io/api/v1/files/upload",
      formData,
      {
        headers: formData.getHeaders(),
        auth: {
          username: process.env.IMAGEKIT_PRIVATE_KEY,
          password: "",
        },
      }
    );

    res.json({ message: "success", url: uploadResponse.data.url });
  } catch (error) {
    console.error(
      "❌ uploadToImageKit Error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "error",
      error: error.response?.data || error.message,
    });
  }
};
