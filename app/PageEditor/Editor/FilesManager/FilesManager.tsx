"use client";
import React, { useEffect, useState } from "react";
import DownloadComponent from "./DownloadComponent";
import UploadComponent from "./UploadComponent";
import styles from "./styles.module.css";
import { Icon } from "@/app/lib/utils/Icon";

interface FilesManagerProps {
  idPage: number | string | undefined;
  onlyView: boolean;
}

export default function FilesManager({ idPage, onlyView }: FilesManagerProps) {
  const [ isUpToDate, setIsUpToDate ] = useState(false);
  const [ isOpenFileManager, setIsOpenFileManager ] = useState(false);

  return (
    <>
      { !isOpenFileManager && (
        <button type="button"
          onClick={() => setIsOpenFileManager(true)}
          className={`bg-stone-300 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded mt-4 ${styles.button_open_file_manager}`}
        >
          {onlyView ? "Voir les fichiers" : "Gestion des fichiers"}
        </button>
      )}
      <div className={styles.container_download_upload} hidden={!isOpenFileManager}>
        <a className={styles.set_file_manager_close} onClick={() => setIsOpenFileManager(false)}><Icon name="ArrowLeftFromLine" /></a>
        {!onlyView &&
          <>
            <h2 className="text-center">Gestion des fichiers</h2>
            <UploadComponent idPage={idPage} setIsUpToDate={setIsUpToDate} />
          </>
        }
        <DownloadComponent idPage={idPage} isUpToDate={isUpToDate} setIsUpToDate={setIsUpToDate} onlyView={onlyView}/>
      </div>

    </>
  );
}
