import express from "express";
import multer from "multer";
import { uploadToImageKit } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), uploadToImageKit);

export default router;
