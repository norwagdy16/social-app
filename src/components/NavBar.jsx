/** @format */
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { isLoggedIn, userData, setIsLoggedIn, setUserData } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserData(null);
    navigate("/signin");
    setMenuOpen(false);
    setUserMenuOpen(false);
  }

  return (
    <div className="navbar bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 shadow-lg px-4 md:px-8">
      {/* Left Section (Brand) */}
      <div className="flex-1">
        <Link
          to="/Posts"
          className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md"
        >
          MyBrand
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {isLoggedIn && userData ? (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full text-white font-semibold shadow-md transition"
            >
              {userData.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 transform transition ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition ${
                  isActive
                    ? "bg-white text-pink-600 font-bold"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                }`
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition ${
                  isActive
                    ? "bg-white text-pink-600 font-bold"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                }`
              }
            >
              Sign In
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white rounded-xl shadow-lg w-48 flex flex-col p-3 z-50 md:hidden animate-fadeIn">
          {isLoggedIn && userData ? (
            <>
              <div className="text-center font-semibold text-gray-700 mb-2">
                {userData.name}
              </div>
              <NavLink
                to="/profile"
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-pink-100"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-pink-100"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/signin"
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-pink-100"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}
