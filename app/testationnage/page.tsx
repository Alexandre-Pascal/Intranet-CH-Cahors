"use client";

import React, { useState } from "react";
import FileList from "./FileList";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async() => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("files", selectedFile);

    try {
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      const response = await fetch("/api/articles/upload-file", requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <FileList />
    </div>
  );
}
