//Je veux que quand je clique sur un fichier, il se télécharge

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import updateUploadedFilesPublic from "@/app/lib/utils/updateUploadedFilesPublic";

// export async function GET(request, { params }, res) {
//   const articleId = params.articleId;
//   const name = params.name;
//   console.log(articleId, name);
//   let filePath = path.resolve(`${process.env.PUBLIC_SAVED_FILES_DIR}/${articleId}/files/${name}`);
//   console.log(filePath);

//   console.log("filepath get", filePath);

//   //je vérifie si le fichier existe
//   if (!fs.existsSync(filePath)) {
//     //créé un nouveau dossier dans public / temp
//     fs.mkdirSync(`./public/temp/${articleId}`, { recursive: true });
//     //déplace le fichier dans le dossier temp
//     if (!fs.existsSync(`./public/temp/${articleId}/images`)) {
//       fs.mkdirSync(`./public/temp/${articleId}/images`, { recursive: true });
//     }
//     const dirPath = `/Users/Administrateur/Documents/temp/${articleId}/images/`;
//     // if (!fs.existsSync(filePath)) {
//     //   return NextResponse.json({ message: "Aucun fichier trouvé" });
//     // }
//     fs.readdirSync(dirPath).forEach(file => {
//       //faire une copie du fichier dans le dossier temp
//       fs.copyFileSync(`${dirPath}/${file}`, `./public/temp/${articleId}/images/${file}`);
//       filePath = `/temp/${articleId}/images/${file}`;

//       console.log("filepath get after", filePath);
//     });
//   }
//   //je le télécharge
//   return NextResponse.json(filePath);
// }

export async function GET(req: NextRequest, context: {params: {articleId: string, name: string}}) {
  const { searchParams } = new URL(req.nextUrl);
  const typeOfFile = searchParams.get("type");
  const articleId = context.params.articleId;
  const name = context.params.name;
  console.log(articleId, name);

  let filePath;

  switch (typeOfFile) {
  case "image":
    if (parseInt(articleId)){
      filePath = `/uploadedFiles/tempFiles/${articleId}/images/${name}`;
    }
    else{
      filePath = `/uploadedFiles/savedFiles/${articleId}/images/${name}`;
    }
    break;
  case "video":
    if (parseInt(articleId)){
      filePath = `/uploadedFiles/tempFiles/${articleId}/videos/${name}`;
    }
    else{
      filePath = `/uploadedFiles/savedFiles/${articleId}/videos/${name}`;
    }
    break;

  default:
    break;
  }
  console.log("filepath get", filePath);
  //je vérifie si le fichier existe
  // if (!fs.existsSync(filePath)) {
  //   return NextResponse.json({ message: "Aucun fichier trouvé" });
  // }
  //je le télécharge
  return NextResponse.json(filePath);
}

export async function DELETE(request, { params }) {

  const articleId = params.articleId;
  const name = params.name;

  let filePath;

  if (parseInt(articleId)){
    filePath = `${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/files/${name}`;
  }
  else{
    filePath = `${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/files/${name}`;
  }

  console.log("filepath to delete", filePath);
  //je vérifie si le fichier existe
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: "Aucun fichier trouvé" });
  }
  //je le supprime
  fs.unlinkSync(filePath);

  updateUploadedFilesPublic();

  return NextResponse.json({ message: "Fichier supprimé" });
}