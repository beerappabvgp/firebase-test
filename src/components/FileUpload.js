import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`); // Store in 'images/' folder
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calculate and update progress percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        // Get the download URL once upload is complete
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        alert("File uploaded successfully!");
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upload File to Firebase Storage</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        <progress value={uploadProgress} max="100" />
      </div>
      {downloadURL && (
        <div>
          <p>Download URL:</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            {downloadURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;