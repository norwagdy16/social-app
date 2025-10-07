import express from "express";
import ImageKit from "imagekit";

const router = express.Router();

const imagekit = new ImageKit({
  publicKey: "public_AsDvjKGMeni0BHtEAJ9itb72NEQ=",
  privateKey: "private_s+xOLaxx59AeShfY9djr969/LXw=", // 👈 اكتبي هنا الـ private key من لوحة ImageKit
  urlEndpoint: "https://ik.imagekit.io/myreactblog",
});

router.get("/auth", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

export default router;
