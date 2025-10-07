import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 📝 Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, gender, photo } = req.body;

    // تحقق من الحقول المطلوبة
    if (!name || !email || !password || !photo) {
      return res
        .status(400)
        .json({ error: "All fields including photo are required" });
    }

    // تحقق لو الإيميل موجود بالفعل
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // تشفير الباسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      photo, // ✅ حفظ الصورة هنا
    });

    await newUser.save();

    // إنشاء توكن JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        dateOfBirth: newUser.dateOfBirth,
        photo: newUser.photo, // ✅ رجعي الصورة
      },
    });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔑 Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    // مقارنة الباسورد
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    // إنشاء JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        photo: user.photo, // ✅ رجعي الصورة عند تسجيل الدخول
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 👤 Get Logged-in user profile
export const getProfileData = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        photo: user.photo, // ✅ عرض الصورة في البروفايل
      },
    });
  } catch (err) {
    console.error("❌ Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
