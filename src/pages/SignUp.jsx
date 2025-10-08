/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schema/schemaRegister";
import { sendRegister } from "../services/authServices";
import { IKContext, IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  // 🧠 إعداد الـ Form
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const authenticator = async () => {
    try {
      const response = await axios.get(
        "https://new-react-production.up.railway.app/api/imagekit/auth"
      );
      return response.data;
    } catch (error) {
      console.error("❌ Auth Error:", error);
      toast.error("Image upload auth failed");
    }
  };

  const handleUploadSuccess = (res) => {
    setPhotoUrl(res.url);
    toast.success("✅ Photo uploaded successfully!");
  };

  const handleUploadError = (err) => {
    console.error("❌ Upload Error:", err);
    toast.error("Failed to upload photo!");
  };

  const onSubmit = async (userData) => {
    if (!photoUrl) {
      toast.error("Please upload your photo before signing up!");
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const response = await sendRegister({ ...userData, photo: photoUrl });

      if (response.message) {
        localStorage.setItem("userName", userData.name);
        toast.success("🎉 Registered successfully!");
        navigate("/signin");
      } else {
        setApiError(response.error || "Sign up failed");
      }
    } catch (err) {
      setApiError("Something went wrong, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-100 to-pink-200 p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-pink-200">
        <h1 className="text-3xl font-extrabold text-center text-pink-600 mb-6">
          Create Your Account 💕
        </h1>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* 🖼️ Upload Photo */}
          <div className="text-center mb-4">
            <IKContext
              publicKey="public_AsDvjKGMeni0BHtEAJ9itb72NEQ="
              urlEndpoint="https://ik.imagekit.io/myreactblog"
              authenticator={authenticator}
            >
              <div className="flex flex-col items-center gap-2">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-pink-300 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-pink-100 border-2 border-dashed border-pink-300 flex items-center justify-center text-pink-400 text-sm">
                    No Photo
                  </div>
                )}
                <IKUpload
                  fileName="user-photo"
                  onSuccess={handleUploadSuccess}
                  onError={handleUploadError}
                  className="text-sm mt-2 cursor-pointer text-pink-600 font-medium hover:underline"
                />
              </div>
            </IKContext>
          </div>

          {/* Full Name */}
          <div>
            <label className="label font-semibold text-gray-800 text-base">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.name && touchedFields.name
                  ? "border-red-500"
                  : "border-pink-300"
              } bg-pink-50 text-sm focus:ring-2 focus:ring-pink-400 transition-all`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label font-semibold text-gray-800 text-base">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.email && touchedFields.email
                  ? "border-red-500"
                  : "border-pink-300"
              } bg-pink-50 text-sm focus:ring-2 focus:ring-pink-400 transition-all`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label font-semibold text-gray-800 text-base">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.password && touchedFields.password
                  ? "border-red-500"
                  : "border-pink-300"
              } bg-pink-50 text-sm focus:ring-2 focus:ring-pink-400 transition-all`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label font-semibold text-gray-800 text-base">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.rePassword && touchedFields.rePassword
                  ? "border-red-500"
                  : "border-pink-300"
              } bg-pink-50 text-sm focus:ring-2 focus:ring-pink-400 transition-all`}
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="label font-semibold text-gray-800 text-base">
              Date of Birth
            </label>
            <input
              type="date"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.dateOfBirth && touchedFields.dateOfBirth
                  ? "border-red-500"
                  : "border-pink-300"
              } bg-pink-50 text-sm focus:ring-2 focus:ring-pink-400 transition-all`}
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="label font-semibold text-gray-800 text-base">
              Gender
            </label>
            <select
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.gender && touchedFields.gender
                  ? "border-red-500"
                  : "border-pink-300"
              } bg-pink-50 text-sm focus:ring-2 focus:ring-pink-400 transition-all`}
              {...register("gender")}
            >
              <option value="">Select Gender</option>
              <option value="male">👦 Male</option>
              <option value="female">👩 Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Sign Up 💖"}
          </button>

          {/* Link to Sign In */}
          <p className="text-center text-gray-700 text-sm mt-3">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-pink-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
