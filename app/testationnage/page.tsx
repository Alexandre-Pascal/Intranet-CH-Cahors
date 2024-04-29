"use client";

import React, { useEffect, useState } from "react";
import FileList from "./FileList";

const DownloadPage: React.FC = () => {
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
  }, []);

  return <FileList files={files} />;
};

export default DownloadPage;
