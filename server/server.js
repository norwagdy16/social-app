import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js"; // ✅ إضافة مسار الكومنتات

// 🔧 إعداد المتغيرات البيئية من ملف .env
dotenv.config();

// 🚀 إنشاء تطبيق Express
const app = express();

// 🌐 إعداد الـ Middleware
app.use(cors()); // للسماح بالاتصال من الـ Frontend
app.use(express.json()); // لقراءة بيانات JSON من الطلبات

// 💾 الاتصال بقاعدة البيانات MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB Error:", err));

// 📡 إعداد المسارات (Routes)
app.use("/api/auth", authRoutes);       // 🔐 تسجيل الدخول والتسجيل
app.use("/api/posts", postRoutes);      // 📝 المنشورات
app.use("/api/comments", commentRoutes); // 💬 التعليقات

// 🧭 الصفحة الافتراضية (اختيارية)
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});

// ⚙️ إعداد الـ PORT وتشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
