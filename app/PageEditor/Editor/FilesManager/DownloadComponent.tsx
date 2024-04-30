"use client";

import React, { useEffect, useState } from "react";
import ListFiles from "./ListFiles";

interface DownloadComponentProps {
  idPage: any;
  isUpToDate: boolean;
  setIsUpToDate: (isUpToDate: boolean) => void;
}

const DownloadComponent = (downloadComponentProps: DownloadComponentProps) => {
  const { idPage, isUpToDate, setIsUpToDate } = downloadComponentProps;
  const [files, setFiles] = useState<string[]>([]);
  const id = (idPage["idPage"]);
  useEffect(() => {
    if (!isUpToDate) {
    // Définition de la fonction pour récupérer les fichiers
      const fetchFiles = async() => {
        try {
          const response = await fetch(`/api/articles/download-file/${id}`);
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des fichiers");
          }
          const data = await response.json();
          setFiles(data.files);
        } catch (error) {
          console.error(error);
        }
      };
      fetchFiles();
      setIsUpToDate(true);
    }
  }); // Ajoutez ici d'autres dépendances si nécessaire

  return <ListFiles files={files} />;
};

export default DownloadComponent;
