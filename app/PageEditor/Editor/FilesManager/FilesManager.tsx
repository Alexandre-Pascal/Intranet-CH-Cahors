"use client";
import React, { useEffect, useState } from "react";
import DownloadComponent from "./DownloadComponent";
import UploadComponent from "./UploadComponent";
import styles from "./styles.module.css";

export default function FilesManager(idPage: any) {
  const [ isUpToDate, setIsUpToDate ] = useState(false);
  return (
    <div className={styles.container_download_upload}>
      <h1 className="ml-10">Files Manager</h1>
      <DownloadComponent idPage={idPage} isUpToDate={isUpToDate} setIsUpToDate={setIsUpToDate}/>
      <UploadComponent idPage={idPage} setIsUpToDate={setIsUpToDate} />
    </div>
  );
}
