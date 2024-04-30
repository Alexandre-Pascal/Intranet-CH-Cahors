import React, { useState } from "react";
import styles from "./styles.module.css";
import { Icon } from "@/app/lib/utils/Icon";
interface ListFilesProps {
  id: any;
  files: string[];
}

const ListFiles: React.FC<ListFilesProps> = ({ id, files }) => {
  const handleDownload = (filename: string) => {
    fetch(`/api/articles/${id}/files/${filename}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du téléchargement du fichier");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (filename: string) => {
    fetch(`/api/articles/${id}/files/${filename}`, {
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
  };

  const handleDownloadV2 = (filename: string) => {
    const path = fetch(`/api/articles/${id}/files/${filename}`);
    console.log("rdezezeezeez");
    console.log(JSON.stringify(path));
    console.log("rdezezeezeez");
    const link = document.createElement("a");
    link.href = path.toString();
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <div className={styles.container_downloader}>
      <h2>Liste des fichiers :</h2>
      <ul>
        {files && files.map((file) => (
          <li key={file}>
            <button type="button">{file}</button>
            <a href={`/uploadedFiles/${id}/${file}`} download={file} ><Icon className={styles.svg} name="Download" /></a>
            <a onClick={() => handleDelete(file)}><Icon className={styles.svg} name="Trash" /></a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFiles;
