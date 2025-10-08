/** @format */

import React, { useContext } from "react";
import PostHeader from "./card/PostHeader";
import { AuthContext } from "../context/AuthContext";
import DropDownComment from "./DropDowenComments";

export default function Comments({ comment, postUserId, callback }) {
  const { userData } = useContext(AuthContext);

  if (!comment) return null; 

  const user = comment.user || {};

  return (
    <div className="bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 mt-3 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <PostHeader
          photo={
            user.photo ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          name={user.name || "Unknown User"}
          data={comment.createdAt}
        />

        {userData?._id === user?._id && (
          <DropDownComment commentId={comment._id} callback={callback} />
        )}
      </div>

      {/* Content */}
      <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm leading-relaxed px-1">
        {comment.content}
      </p>
    </div>
  );
}
