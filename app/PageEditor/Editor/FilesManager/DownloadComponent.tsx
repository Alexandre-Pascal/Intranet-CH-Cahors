"use client";

import React, { useEffect, useState } from "react";
import ListFiles from "./ListFiles";

interface DownloadComponentProps {
  idPage: number | string | undefined;
  isUpToDate: boolean;
  setIsUpToDate: (isUpToDate: boolean) => void;
}

const DownloadComponent = ({ idPage, isUpToDate, setIsUpToDate }: DownloadComponentProps) => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    if (!isUpToDate) {
    // Définition de la fonction pour récupérer les fichiers
      const fetchFiles = async() => {
        try {
          const response = await fetch(`/api/articles/${idPage}/files`);
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
  }, [isUpToDate]); // Ajoutez ici d'autres dépendances si nécessaire

  return <ListFiles idPage={idPage} files={files} setIsUpToDate={setIsUpToDate} />;
};

export default DownloadComponent;
