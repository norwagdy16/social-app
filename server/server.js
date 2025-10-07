import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import imagekitRoutes from "./routes/imagekit.js";
import uploadRoutes from "./routes/uploadRoutes.js";


dotenv.config();

const app = express();
const __dirname = path.resolve();

// ✅ فعّلي CORS قبل أي routes
app.use(
  cors({
    origin: "*", // مؤقتًا مفتوحة لكل مكان
  })
);

// Middleware أساسية
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ كل الـ routes هنا بعد الـ CORS
app.use("/api/imagekit", imagekitRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/upload", uploadRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB Error:", err));

app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
