import express from "express";
import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config(); // 👈 لازم قبل أي استخدام للمتغيرات

const router = express.Router();

// ✅ إعداد الـ ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ✅ إنشاء Endpoint للتوثيق
router.get("/auth", (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.send(authParams);
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    res.status(500).json({ error: "Failed to generate authentication params" });
  }
});

export default router;

