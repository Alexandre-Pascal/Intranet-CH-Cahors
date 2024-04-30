"use client";

import React, { useEffect, useState } from "react";
import ListFiles from "./ListFiles";

const DownloadComponent = (idPage : any) => {
  const [files, setFiles] = useState<string[]>([]);
  const id = (idPage["idPage"]["idPage"]);
  useEffect(() => {
    fetch(`/api/articles/download-file/${id}`)
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
  });

  return <ListFiles files={files} />;
};

export default DownloadComponent;
