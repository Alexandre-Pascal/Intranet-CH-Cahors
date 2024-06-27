"use client";

// Fichier appels API pour TipTap

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
      const response = await fetch(`/api/articles/${idPage}/files?type=image`, requestOptions);
      await response.json();
      console.log("response", response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    const newPath = await API.getUrlUploadedImage(idPage, file.name);
    console.log("newPath", newPath);
    return newPath;
  };

  public static getUrlUploadedImage = async(idPage: number | string | undefined, fileName: string) => {
    await new Promise(r => setTimeout(r, 500));
    try {
      const response = await fetch(`/api/articles/${idPage}/files/${fileName}?type=image`);
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  public static uploadVideo = async({ idPage, file }: { idPage: number | string | undefined; file: File }) => {
    await new Promise(r => setTimeout(r, 500));

    console.log("file", file);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      console.log(idPage);
      console.log(file.name);
      const response = await fetch(`/api/articles/${idPage}/files?type=video`, requestOptions);
      await response.json();
      console.log("response", response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    const newPath = await API.getUrlUploadedVideo(idPage, file.name);
    console.log("newPath", newPath);
    return newPath;
  };

  public static getUrlUploadedVideo = async(idPage: number | string | undefined, fileName: string) => {
    await new Promise(r => setTimeout(r, 500));
    try {
      const response = await fetch(`/api/articles/${idPage}/files/${fileName}?type=video`);
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
}

export default API;
