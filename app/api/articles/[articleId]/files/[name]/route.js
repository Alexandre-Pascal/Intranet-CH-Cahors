//Je veux que quand je clique sur un fichier, il se télécharge

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// export async function GET(request, { params }, res) {
//   const articleId = params.articleId;
//   const filename = params.name;
//   console.log(articleId, filename);
//   let filePath = path.resolve(`${process.env.PUBLIC_SAVED_FILES_DIR}/${articleId}/files/${filename}`);
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

export async function GET(request, { params }) {
  const articleId = params.articleId;
  const filename = params.name;
  const filePath = `/uploadedFiles/tempFiles/${articleId}/images/${filename}`;
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
  const filename = params.name;
  const filePath = path.resolve(`./public/uploadedFiles/${articleId}/files/${filename }`);
  console.log("filepath to delete", filePath);
  //je vérifie si le fichier existe
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: "Aucun fichier trouvé" });
  }
  //je le supprime
  fs.unlinkSync(filePath);
  return NextResponse.json({ message: "Fichier supprimé" });
}