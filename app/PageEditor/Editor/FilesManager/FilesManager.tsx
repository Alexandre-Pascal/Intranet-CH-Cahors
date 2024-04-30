"use client";
import React, { useEffect, useState } from "react";
import DownloadComponent from "./DownloadComponent";
import UploadComponent from "./UploadComponent";
import styles from "./styles.module.css";
import { Icon } from "@/app/lib/utils/Icon";

interface FilesManagerProps {
  idPage: string;
  setIsOpenFileManager: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilesManager({ idPage, setIsOpenFileManager }: FilesManagerProps) {
  const [ isUpToDate, setIsUpToDate ] = useState(false);
  return (
    <div className={styles.container_download_upload}>
      <a className={styles.set_file_manager_close} onClick={() => setIsOpenFileManager(false)}><Icon name="ArrowLeftFromLine" /></a>
      <h2 className="text-center">Gestion des fichiers</h2>
      <UploadComponent idPage={idPage} setIsUpToDate={setIsUpToDate} />
      <DownloadComponent idPage={idPage} isUpToDate={isUpToDate} setIsUpToDate={setIsUpToDate}/>
    </div>
  );
}
