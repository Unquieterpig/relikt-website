import { useState } from "react";
import { auth, storage } from "@lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Loader from "./Loader";
import toast from "react-hot-toast";

// Uploads audio to Firebase Storage
export default function AudioUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const fileRef = ref(
      storage,
      `uploads/audio/${auth.currentUser.uid}/${Date.now()}.${extension}`
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
        toast.error("An error occurred while uploading the audio");
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
    <div className="box">
      <Loader show={uploading} progress={progress} />

      {!uploading && (
        <>
          <label className="btn">
            🎙️ Upload Audio
            <input
              type="file"
              onChange={uploadFile}
              accept="audio/mpeg, audio/wav, audio/ogg, audio/flac"
            />
          </label>
        </>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}
