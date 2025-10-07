/** @format */

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schema/schemaLogin";
import { sendLogin } from "../services/authServices";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // Login Function
  const onSubmit = async (userData) => {
    setLoading(true);
    setApiError("");

    try {
      const response = await sendLogin(userData);

      if (response.message) {
        // localStorage.setItem("token", response.token);
        localStorage.setItem("token", response.token || response.data?.token);

        localStorage.setItem("userName", userData.email);
        setIsLoggedIn(response.token);

        navigate("/posts");
      } else {
        setApiError(response.error || "login faild");
      }
    } catch (err) {
      setApiError("something went wrong.try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-pink-200 flex items-center justify-center">
      <div className="card bg-white/95 backdrop-blur-md w-full max-w-md shadow-xl rounded-2xl">
        <div className="card-body p-4">
          <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
            Welcom back
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <label className="label font-semibold text-gray-800 text-base">
              Email
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.email && touchedFields.email
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-pink-50 text-sm font-medium text-gray-700 
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
              placeholder="Enter your email"
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
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.password && touchedFields.password
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-pink-50 text-sm font-medium text-gray-700 
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* API Error */}
            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-base font-bold rounded-lg shadow-md 
                hover:scale-105 transition-transform duration-300 mt-4 py-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {/* Link to Register */}
            <p className="text-center text-gray-700 text-sm mt-2">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-pink-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
