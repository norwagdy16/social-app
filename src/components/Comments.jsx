// /** @format */

// import React, { useContext } from "react";
// import PostHeader from "./card/PostHeader";
// import { AuthContext } from "../context/AuthContext";
// import DropDownComment from "./DropDowenComments";

// export default function Comments({ comment, postUserId, callback }) {
//   const { userData } = useContext(AuthContext);

//   return (
//     <div className="bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 mt-3 shadow-sm">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <PostHeader
//           photo={comment.commentCreator.photo}
//           name={comment.commentCreator.name}
//           data={comment.createdAt}
//         />

//         {userData._id === comment.commentCreator._id && (
//           <DropDownComment commentId={comment._id} callback={callback} />
//         )}
//       </div>

//       {/* Content */}
//       <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm leading-relaxed px-1">
//         {comment.content}
//       </p>
//     </div>
//   );
// }
