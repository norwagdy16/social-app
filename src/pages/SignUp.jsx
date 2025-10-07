/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schema/schemaRegister";
import { sendRegister } from "../services/authServices";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // React Hook Form
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

  // Submit Function
  const onSubmit = async (userData) => {
    setLoading(true);
    setApiError("");

    try {
      const response = await sendRegister(userData);

      if (response.message) {
        localStorage.setItem("userName", userData.name);
        navigate("/login");
      } else {
        setApiError(response.error || "sign up faild");
      }
    } catch (err) {
      setApiError("something went wrong,try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-pink-200 flex items-center justify-center">
      <div className="card bg-white/95 backdrop-blur-md w-full max-w-md shadow-xl rounded-2xl">
        <div className="card-body p-4">
          <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
            Hey you
          </h1>

          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <label className="label font-semibold text-gray-800 text-base">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-2 py-1.5 rounded-lg border ${
                errors.name && touchedFields.name
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-pink-50 text-sm font-medium text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Email */}
            <label className="label font-semibold text-gray-800 text-base">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-2 py-1.5 rounded-lg border ${
                errors.email && touchedFields.email
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-pink-50 text-sm font-medium text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <label className="label font-semibold text-gray-800 text-base">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-2 py-1.5 rounded-lg border ${
                errors.password && touchedFields.password
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-pink-50 text-sm font-medium text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <label className="label font-semibold text-gray-800 text-base">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className={`w-full px-2 py-1.5 rounded-lg border ${
                errors.rePassword && touchedFields.rePassword
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-pink-50 text-sm font-medium text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-500 text-sm">
                {errors.rePassword.message}
              </p>
            )}

            {/* Date of Birth */}
            <label className="label font-semibold text-gray-800 text-base">
              Date of Birth
            </label>
            <input
              type="date"
              className={`w-full px-2 py-1.5 rounded-lg border ${
                errors.dateOfBirth && touchedFields.dateOfBirth
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-pink-50 text-sm font-medium text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}

            {/* Gender */}
            <label className="label font-semibold text-gray-800 text-base">
              Gender
            </label>
            <select
              className={`w-full px-2 py-1.5 rounded-lg border ${
                errors.gender && touchedFields.gender
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-pink-50 text-sm font-medium text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
              {...register("gender")}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}

            {/* API Error */}
            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-base font-bold rounded-lg shadow-md 
                hover:scale-105 transition-transform duration-300 mt-3 py-1.5 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>

            {/* Link to Login */}
            <p className="text-center text-gray-700 text-sm mt-2">
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
    </div>
  );
}
