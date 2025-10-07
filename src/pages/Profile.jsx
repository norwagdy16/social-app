/** @format */

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaEnvelope, FaVenusMars, FaBirthdayCake } from "react-icons/fa";

export default function ProfilePage() {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center">
          <img
            src={`https://ui-avatars.com/api/?name=${userData.name}&background=9333ea&color=fff&size=150`}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg"
          />
          <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
            {userData.name}
          </h1>
          <p className="text-gray-500 text-sm">
            @{userData.username || userData.name}
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <FaEnvelope className="text-purple-600 text-3xl mb-3" />
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold text-gray-800">{userData.email}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <FaVenusMars className="text-pink-500 text-3xl mb-3" />
            <p className="text-gray-500 text-sm">Gender</p>
            <p className="font-semibold text-gray-800">
              {userData.gender || "Not specified"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <FaBirthdayCake className="text-red-400 text-3xl mb-3" />
            <p className="text-gray-500 text-sm">Date of Birth</p>
            <p className="font-semibold text-gray-800">
              {userData.dateOfBirth || "Not specified"}
            </p>
          </div>
        </div>

        {/* Actions Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-center gap-6">
          <button className="px-6 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition">
            Edit Profile
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
