"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; "next/navigation";
import styles from "./styles.module.css";

// Fichier utilisé pour déposer des fichiers

interface UploadComponentProps {
  idPage: number | string | undefined;
  setIsUpToDate: (isUpToDate: boolean) => void;
}

export default function UploadComponent({ idPage, setIsUpToDate }: UploadComponentProps) {
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
      const response = await fetch(`/api/articles/${idPage}/files?type=file`, requestOptions);
      setIsUpToDate(false);
      await response.json();
      router.refresh();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className={styles.container_uploader}>
      <h3>Déposer un fichier</h3>
      <input type="file" onChange={handleFileChange} />
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpload}>
        Déposer
      </button>
    </div>
  );
}
