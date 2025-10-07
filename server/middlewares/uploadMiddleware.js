// middlewares/uploadMiddleware.js
import multer from "multer";
import path from "path";

// مكان تخزين الصور مؤقتًا
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // هنخزنها مؤقتًا في فولدر اسمه uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// فلترة الملفات (نقبل صور فقط)
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
}

// إعداد multer
const upload = multer({ storage, fileFilter });

export default upload;
