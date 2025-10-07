// /** @format */

// import React from "react";

// export default function PostHeader({ photo, name, data }) {
//   const image = "/img1.png";
//   return (
//     <div className="flex items-center gap-3 w-full ">
//       <img
//         onError={(e) => {
//           e.target.src = image;
//         }}
//         className="rounded-full w-10 h-10 md:w-12 md:h-12 object-cover"
//         src={photo}
//         alt={name}
//       />
//       <div className="flex flex-col">
//         <h3 className="text-sm md:text-md font-semibold">{name}</h3>
//         <p className="text-xs md:text-sm text-gray-500">
//           {data.split(".", 1).join().replace("T", " ")}
//         </p>
//       </div>
//     </div>
//   );
// }
/** @format */
import React from "react";

export default function PostHeader({ photo, name, data }) {
  const defaultImage = "/img1.png";

  // 🧠 حماية من undefined أو null
  const profilePhoto = photo || defaultImage;
  const displayName = name || "Unknown User";
  const displayDate = data
    ? data.split(".", 1).join().replace("T", " ")
    : "Unknown Date";

  return (
    <div className="flex items-center gap-3 w-full">
      <img
        src={profilePhoto}
        alt={displayName}
        onError={(e) => {
          e.target.src = defaultImage;
        }}
        className="rounded-full w-10 h-10 md:w-12 md:h-12 object-cover"
      />
      <div className="flex flex-col">
        <h3 className="text-sm md:text-md font-semibold">{displayName}</h3>
        <p className="text-xs md:text-sm text-gray-500">{displayDate}</p>
      </div>
    </div>
  );
}
