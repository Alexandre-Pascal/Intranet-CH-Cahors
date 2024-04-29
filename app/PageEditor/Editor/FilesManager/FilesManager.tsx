"use client";
import React, { useEffect, useState } from "react";
import DownloadComponent from "./DownloadComponent";
import UploadComponent from "./UploadComponent";

export default function FilesManager() {

  return (
    <div>
      <h1 className="ml-10">Files Manager</h1>
      <DownloadComponent />
      <UploadComponent />
    </div>
  );
}
