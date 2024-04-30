import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Icon } from "@/app/lib/utils/Icon";

interface ListFilesProps {
  idPage: string;
  files: string[];
  setIsUpToDate: (isUpToDate: boolean) => void;
}

const ListFiles: React.FC<ListFilesProps> = ({ idPage, files, setIsUpToDate }) => {
  const router = useRouter();
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

  return (
    <div className={styles.container_downloader}>
      <h3>Liste des fichiers :</h3>
      <ul>
        {files && files.map((file) => (
          <li key={file}>
            <p>{file}</p>
            <a href={`/uploadedFiles/${idPage}/${file}`} download={file} ><Icon className={styles.svg} name="Download" /></a>
            <a onClick={() => confirmDelete(file)}><Icon className={styles.svg} name="Trash" /></a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFiles;
