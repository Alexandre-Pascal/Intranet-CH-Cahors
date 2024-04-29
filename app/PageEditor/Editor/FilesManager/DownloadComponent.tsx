"use client";

import React, { useEffect, useState } from "react";
import ListFiles from "./ListFiles";

const DownloadComponent = (selectedFile : any | null) => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/articles/download-file")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des fichiers");
        }
        return response.json();
      })
      .then((data) => {
        setFiles(data.files);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedFile]);

  return <ListFiles files={files} />;
};

export default DownloadComponent;
