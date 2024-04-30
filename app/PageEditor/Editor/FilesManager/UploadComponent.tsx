"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; "next/navigation";

export default function UploadComponent(idPage : any) {
  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();

  const handleFileChange = (event : any) => {
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
      const id = idPage["idPage"]["idPage"];
      const response = await fetch(`/api/articles/upload-file/${id}`, requestOptions);
      const result = await response.json();
      router.refresh();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h2>Upload file</h2>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>Upload</button>
    </div>
  );
}
