/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaShare } from "react-icons/fa";

export default function PostFooter({ commentNumber, postId }) {
  return (
    <div className="w-full bg-white border-t border-gray-100">
      {/* Reaction summary */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-1">
          {/* Like icons */}
          <div className="flex -space-x-2">
            <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              <AiFillLike className="text-white text-sm" />
            </div>
            <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 
                  0-7.78 0L12 5.67l-1.06-1.06a5.5 
                  5.5 0 0 0-7.78 7.78l1.06 
                  1.06L12 21.23l7.78-7.78 
                  1.06-1.06a5.5 5.5 0 0 
                  0 0-7.78z"
                ></path>
              </svg>
            </div>
          </div>
          <span className="text-sm text-gray-500 ml-2">8 Likes</span>
        </div>

        {/* Comments count */}
        <Link
          to={`/postdetails/${postId}`}
          className="text-sm text-gray-500 hover:text-blue-600 transition-all"
        >
          {commentNumber} Comments
        </Link>
      </div>

      {/* Action buttons */}
      <div className="flex justify-around border-t border-gray-100 py-2">
        {/* Like */}
        <button className="flex flex-col items-center justify-center w-full py-2 hover:bg-blue-50 rounded-xl transition-all">
          <AiFillLike className="text-xl text-gray-600 group-hover:text-blue-600" />
          <span className="text-xs text-gray-600">Like</span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center justify-center w-full py-2 hover:bg-green-50 rounded-xl transition-all">
          <FaRegCommentDots className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600">Comment</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center justify-center w-full py-2 hover:bg-purple-50 rounded-xl transition-all">
          <FaShare className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600">Share</span>
        </button>
      </div>
    </div>
  );
}
