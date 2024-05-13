import fs from "fs";
import path from "path";

export default async function updateUploadedFilesPublic() {
  //supprimer les fichiers dans le dossier /public/uploadedFiles
  const dir = path.resolve("./public/uploadedFiles");
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, {
      recursive: true,
    });

    //copier les fichiers du dossier /tempFiles vers /public/uploadedFiles
    fs.mkdirSync(dir, { recursive: true });
    fs.cpSync(`${process.env.SERVER_UPLOADED_FILES_DIR}`, `${process.env.CLIENT_PUBLIC_UPLOADED_FILES_DIR}`, { recursive: true });

    console.log("Les fichiers ont été copiés dans /public/uploadedFiles");
  }
}
