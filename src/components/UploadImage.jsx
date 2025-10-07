import { IKContext, IKUpload } from "imagekitio-react";

export default function UploadImage({ onSuccess }) {
  return (
    <IKContext
      publicKey="public_AsDvjKGMeni0BHtEAJ9itb72NEQ="
      urlEndpoint="https://ik.imagekit.io/myreactblog"
      authenticationEndpoint="https://new-react-production.up.railway.app/api/imagekit/auth"
    >
      <IKUpload
        fileName="myImage.jpg"
        onSuccess={(res) => {
          console.log("Uploaded:", res.url);
          onSuccess(res.url);
        }}
        onError={(err) => console.log("Error:", err)}
      />
    </IKContext>
  );
}
