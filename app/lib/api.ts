"use client";
import { useContext } from "react";
import { AppContext } from "./utils/AppContext";
import UploadComponent from "../PageEditor/Editor/FilesManager/UploadComponent";
interface UploadComponentProps {
 idPage: number | string | undefined;
 file: File;
}
export class API {

  public static uploadImage = async(UploadComponent : UploadComponentProps) => {
    await new Promise(r => setTimeout(r, 500));

    const { idPage, file } = UploadComponent;

    console.log("fileeee", file);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      console.log(idPage);
      const response = await fetch(`/api/articles/${idPage}/images`, requestOptions);
      await response.json();
      console.log("response", response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
}

export default API;
