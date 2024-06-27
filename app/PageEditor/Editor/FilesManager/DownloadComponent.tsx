"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/app/lib/utils/Icon";
import styles from "./styles.module.css";

// Fichier composant pour télécharger un fichier

interface DownloadComponentProps {
  idPage: number | string | undefined;
  isUpToDate: boolean;
  setIsUpToDate: (isUpToDate: boolean) => void;
  onlyView: boolean;
}

const DownloadComponent = ({ idPage, isUpToDate, setIsUpToDate, onlyView }: DownloadComponentProps) => {
  const [files, setFiles] = useState<string[]>([]);
  const router = useRouter();

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

  const handleDelete = (filename: string) => {
    fetch(`/api/articles/${idPage}/files/${filename}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du fichier");
        }
        return response.json();
      })
      .then(() => {
        console.log("Fichier supprimé");
      })
      .catch((error) => {
        console.error(error);
      });
    setIsUpToDate(false);
    router.refresh();
  };

  const confirmDelete = (filename: string) => {
    if (confirm(`Voulez-vous vraiment supprimer le fichier ${filename} ?`)) {
      handleDelete(filename);
    }
  };

  const path = parseInt(idPage as string) ? `/uploadedFiles/tempFiles/${idPage}/files` : `/uploadedFiles/savedFiles/${idPage}/files`;

  return (
    <div className={styles.container_downloader}>
      <h3>Liste des fichiers :</h3>
      <ul>
        {files && files.map((file) => (
          <li key={file}>
            <p>{file}</p>
            <a href={`${path}/${file}`} download={file} ><Icon className={styles.svg} name="Download" /></a>
            {!onlyView && <a onClick={() => confirmDelete(file)}><Icon className={styles.svg} name="Trash" /></a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadComponent;
