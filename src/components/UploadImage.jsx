import { IKContext, IKUpload } from "imagekitio-react";

export default function UploadImage({ onSuccess }) {
  return (
    <IKContext
      publicKey="public_AsDvjKGMeni0BHtEAJ9itb72NEQ="
      urlEndpoint="https://ik.imagekit.io/myreactblog"
      authenticationEndpoint="https://new-react-production.up.railway.app/api/imagekit/auth"
    >
      <IKUpload
        fileName="post-image.jpg"
        onSuccess={(res) => {
          console.log("✅ Uploaded Successfully:", res);
          onSuccess(res.url);
        }}
        onError={(err) => console.error("❌ Upload Error:", err)}
      />
    </IKContext>
  );
}
