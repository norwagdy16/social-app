/** @format */
import { IKContext, IKUpload } from "imagekitio-react";

export default function UploadImage({ onSuccess }) {
  return (
    <IKContext
      publicKey="public_AsDvjKGMeni0BHtEAJ9itb72NEQ="
      urlEndpoint="https://ik.imagekit.io/myreactblog"
      authenticator={async () => {
        // ✅ هنا بنجيب بيانات الـ auth من السيرفر بتاعك
        const response = await fetch(
          "https://new-react-production.up.railway.app/api/imagekit/auth"
        );
        const data = await response.json();
        return data; // { token, expire, signature }
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <IKUpload
          fileName="my-upload.jpg"
          onSuccess={(res) => {
            console.log("✅ Uploaded:", res.url);
            onSuccess(res.url); // بنبعت رابط الصورة للأب
          }}
          onError={(err) => {
            console.error("❌ Upload Error:", err);
            alert("فشل رفع الصورة ❌");
          }}
        />
      </div>
    </IKContext>
  );
}
