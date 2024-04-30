"use client";
import React, { useEffect, useState } from "react";
import DownloadComponent from "./DownloadComponent";
import UploadComponent from "./UploadComponent";

export default function FilesManager(idPage: any) {

  return (
    <div>
      <h1 className="ml-10">Files Manager</h1>
      <DownloadComponent idPage={idPage}/>
      <UploadComponent idPage={idPage} />
    </div>
  );
}
