// /** @format */

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { schema } from "../schema/schemaRegister";
// import { sendRegister } from "../services/authServices";

// export default function Register() {
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const navigate = useNavigate();

//   // React Hook Form
//   const {
//     handleSubmit,
//     register,
//     formState: { errors, touchedFields },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       dateOfBirth: "",
//       gender: "",
//     },
//     resolver: zodResolver(schema),
//     mode: "onBlur",
//   });

//   // Submit Function
//   const onSubmit = async (userData) => {
//     setLoading(true);
//     setApiError("");

//     try {
//       const response = await sendRegister(userData);

//       if (response.message) {
//         localStorage.setItem("userName", userData.name);
//         navigate("/login");
//       } else {
//         setApiError(response.error || "sign up faild");
//       }
//     } catch (err) {
//       setApiError("something went wrong,try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="hero min-h-screen bg-pink-200 flex items-center justify-center">
//       <div className="card bg-white/95 backdrop-blur-md w-full max-w-md shadow-xl rounded-2xl">
//         <div className="card-body p-4">
//           <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
//             Hey you
//           </h1>

//           <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
//             {/* Name */}
//             <label className="label font-semibold text-gray-800 text-base">
//               Full Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               className={`w-full px-2 py-1.5 rounded-lg border ${
//                 errors.name && touchedFields.name
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } bg-pink-50 text-sm font-medium text-gray-700
//                  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
//               {...register("name")}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name.message}</p>
//             )}

//             {/* Email */}
//             <label className="label font-semibold text-gray-800 text-base">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className={`w-full px-2 py-1.5 rounded-lg border ${
//                 errors.email && touchedFields.email
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } bg-pink-50 text-sm font-medium text-gray-700
//                  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
//               {...register("email")}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}

//             {/* Password */}
//             <label className="label font-semibold text-gray-800 text-base">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className={`w-full px-2 py-1.5 rounded-lg border ${
//                 errors.password && touchedFields.password
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } bg-pink-50 text-sm font-medium text-gray-700
//                  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
//               {...register("password")}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}

//             {/* Confirm Password */}
//             <label className="label font-semibold text-gray-800 text-base">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               placeholder="Confirm your password"
//               className={`w-full px-2 py-1.5 rounded-lg border ${
//                 errors.rePassword && touchedFields.rePassword
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } bg-pink-50 text-sm font-medium text-gray-700
//                  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
//               {...register("rePassword")}
//             />
//             {errors.rePassword && (
//               <p className="text-red-500 text-sm">
//                 {errors.rePassword.message}
//               </p>
//             )}

//             {/* Date of Birth */}
//             <label className="label font-semibold text-gray-800 text-base">
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               className={`w-full px-2 py-1.5 rounded-lg border ${
//                 errors.dateOfBirth && touchedFields.dateOfBirth
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } bg-pink-50 text-sm font-medium text-gray-700
//                  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
//               {...register("dateOfBirth")}
//             />
//             {errors.dateOfBirth && (
//               <p className="text-red-500 text-sm">
//                 {errors.dateOfBirth.message}
//               </p>
//             )}

//             {/* Gender */}
//             <label className="label font-semibold text-gray-800 text-base">
//               Gender
//             </label>
//             <select
//               className={`w-full px-2 py-1.5 rounded-lg border ${
//                 errors.gender && touchedFields.gender
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } bg-pink-50 text-sm font-medium text-gray-700
//                  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200`}
//               {...register("gender")}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//             {errors.gender && (
//               <p className="text-red-500 text-sm">{errors.gender.message}</p>
//             )}

//             {/* API Error */}
//             {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`btn w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-base font-bold rounded-lg shadow-md 
//                 hover:scale-105 transition-transform duration-300 mt-3 py-1.5 ${
//                   loading ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//             >
//               {loading ? "Registering..." : "Sign Up"}
//             </button>

//             {/* Link to Login */}
//             <p className="text-center text-gray-700 text-sm mt-2">
//               Already have an account?{" "}
//               <Link
//                 to="/signin"
//                 className="text-pink-600 font-semibold hover:underline"
//               >
//                 Sign In
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
//** @format */
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

  // 🔐 دالة المصادقة الخاصة بـ ImageKit
  const authenticator = async () => {
    try {
      const response = await axios.get(
        "https://new-react-production.up.railway.app/api/imagekit/auth"
      );
      return response.data; // لازم ترجّع { signature, expire, token }
    } catch (error) {
      console.error("❌ Auth Error:", error);
      toast.error("Image upload auth failed");
    }
  };

  // 🖼️ رفع الصورة
  const handleUploadSuccess = (res) => {
    setPhotoUrl(res.url);
    toast.success("✅ Photo uploaded successfully!");
  };

  const handleUploadError = (err) => {
    console.error("❌ Upload Error:", err);
    toast.error("Failed to upload photo!");
  };

  // 📝 عند التسجيل
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
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
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
