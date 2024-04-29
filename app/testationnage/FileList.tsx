import React, { useState } from "react";

interface FileListProps {
  files: string[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  const handleDownload = (filename: string) => {
    fetch(`/api/articles/download-file?filename=${filename}`)
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

  return (
    <div>
      <h2>Liste des fichiers :</h2>
      <ul>
        {files && files.map((file) => (
          <li key={file}>
            <button onClick={() => handleDownload(file)}>{file}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
