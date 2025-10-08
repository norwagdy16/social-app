/** @format */
import { IKContext, IKUpload } from "imagekitio-react";

export default function UploadImage({ onSuccess }) {
  return (
    <IKContext
      publicKey="public_AsDvjKGMeni0BHtEAJ9itb72NEQ="
      urlEndpoint="https://ik.imagekit.io/myreactblog"
      authenticator={async () => {
        const response = await fetch(
          "https://new-react-production.up.railway.app/api/imagekit/auth"
        );
        const data = await response.json();
        return data;
      }}
    >
      <div className="relative w-[180px] h-[180px]">
        <IKUpload
          fileName="upload.jpg"
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          onSuccess={(res) => onSuccess(res.url)}
          onError={(err) => {
            console.error("❌ Upload Error:", err);
            alert("failed❌");
          }}
        />

        <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50 hover:bg-pink-100 transition shadow-md">
          <span className="text-5xl text-pink-500 font-bold">+</span>
          <span className="text-sm text-pink-600 mt-1 font-medium">
            Upload Image
          </span>
        </div>
      </div>
    </IKContext>
  );
}
