import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js"; // ✅ مسار الكومنتات

// 🔧 تحميل إعدادات البيئة
dotenv.config();

// 🚀 إنشاء تطبيق Express
const app = express();

// 📂 حل مشكلة المسارات في ES Modules
const __dirname = path.resolve();

// 🌐 Middleware أساسية
app.use(cors()); // للسماح بالاتصال من الـ frontend
app.use(express.json()); // قراءة JSON من body
app.use(express.urlencoded({ extended: true })); // قراءة form-data
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // عرض الصور اللي اترفعت

// 💾 الاتصال بقاعدة بيانات MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB Error:", err));

// 📡 إعداد الـ Routes
app.use("/api/auth", authRoutes);        // 🔐 تسجيل الدخول والتسجيل
app.use("/api/posts", postRoutes);       // 📝 البوستات (بها رفع الصور)
app.use("/api/comments", commentRoutes); // 💬 الكومنتات

// 🧭 الصفحة الافتراضية (اختيارية)
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});

// ⚙️ تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
