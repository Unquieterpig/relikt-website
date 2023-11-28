import { useRef, useState } from "react";
import { auth, storage } from "@lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Loader from "./Loader";
import { Button, Snippet } from "@nextui-org/react";
import toast from "react-hot-toast";

// Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // File upload hack
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const fileRef = ref(
      storage,
      `uploads/pictures/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = uploadBytesResumable(fileRef, file);

    // Listen to updates to upload task
    task.on(
      "state_changed",
      (snapshot) => {
        const pct = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        setProgress(Number(pct));
      },
      // Handle errors
      (error) => {
        toast.error("An error occurred while uploading the image");
        setUploading(false);
      },
      // Handle successful upload
      () => {
        getDownloadURL(task.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
      }
    );
  };

  return (
    <div className="flex justify-between">
      <Loader show={uploading} progress={progress} />

      {!uploading && (
        <>
          <Button className="m-1" onClick={handleButtonClick}>
            📸 Upload Img
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={uploadFile}
            accept="image/x-png,image/gif,image/jpeg"
            className="hidden"
          />
        </>
      )}

      {downloadURL && (
        <Snippet
          className="max-w-[500px]"
          codeString={`![alt](${downloadURL})`}
        >
          Copy to clipboard
        </Snippet>
      )}
    </div>
  );
}
