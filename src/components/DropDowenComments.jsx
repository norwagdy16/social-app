// /** @format */

// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   Spinner,
// } from "@heroui/react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { deleteCommentApi } from "../services/CommentServices";

// export default function DropDownComment({ commentId, callback }) {
//   const [loading, setLoading] = useState(false);

//   async function deleteComment() {
//     setLoading(true);
//     try {
//       const response = await deleteCommentApi(commentId);
//       if (response.message === "success") {
//         toast.success("Comment deleted successfully");
//         await callback();
//       } else {
//         toast.error("Failed to delete comment");
//       }
//     } catch (error) {
//       toast.error("Error deleting comment");
//     }
//     setLoading(false);
//   }

//   return (
//     <>
//       {loading ? (
//         <Spinner color="danger" />
//       ) : (
//         <Dropdown>
//           <DropdownTrigger>
//             <svg
//               className="w-6 cursor-pointer outline-0 hover:scale-110 transition-transform"
//               xmlns="http://www.w3.org/2000/svg"
//               width="27"
//               height="27"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#ec4899" // لون بينك
//               strokeWidth="2.2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="1.5"></circle>
//               <circle cx="19" cy="12" r="1.5"></circle>
//               <circle cx="5" cy="12" r="1.5"></circle>
//             </svg>
//           </DropdownTrigger>
//           <DropdownMenu
//             aria-label="Comment Actions"
//             className="rounded-xl shadow-md"
//           >
//             <DropdownItem
//               key="delete"
//               className="text-pink-600 font-semibold hover:bg-pink-100"
//               onClick={deleteComment}
//             >
//               🗑 Delete
//             </DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       )}
//     </>
//   );
// }
