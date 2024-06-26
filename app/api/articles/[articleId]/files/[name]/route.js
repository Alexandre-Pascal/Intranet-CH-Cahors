//Je veux que quand je clique sur un fichier, il se télécharge

import { NextResponse } from "next/server";
import fs from "fs";
import updateUploadedFilesPublic from "@/app/lib/utils/updateUploadedFilesPublic";

export async function GET(req, { params }) {

  const { searchParams } = new URL(req.nextUrl);

  const typeOfFile = searchParams.get("type");
  const articleId = params.articleId;
  const name = params.name;

  let filePath;

  // console.log(articleId, name);
  switch (typeOfFile) {
  case "image":
    if (parseInt(articleId)){
      // Si c'est un fichier temporaire (articleId est formé d'une suite de chiffres)
      filePath = `/uploadedFiles/tempFiles/${articleId}/images/${name}`;
    }
    else{
      filePath = `/uploadedFiles/savedFiles/${articleId}/images/${name}`;
    }
    break;

  case "video":
    if (parseInt(articleId)){
      // Si c'est un fichier temporaire (articleId est formé d'une suite de chiffres)
      filePath = `/uploadedFiles/tempFiles/${articleId}/videos/${name}`;
    }
    else{
      filePath = `/uploadedFiles/savedFiles/${articleId}/videos/${name}`;
    }
    break;

  default:
    break;
  }
  // console.log("filepath get", filePath);
  return NextResponse.json(filePath);
}

export async function DELETE(request, { params }) {

  const articleId = params.articleId;
  const name = params.name;

  let filePath;

  if (parseInt(articleId)){
    // Si c'est un fichier temporaire (articleId est formé d'une suite de chiffres)
    filePath = `${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/files/${name}`;
  }
  else{
    filePath = `${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/files/${name}`;
  }

  // console.log("filepath to delete", filePath);

  //je vérifie si le fichier existe
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: "Aucun fichier trouvé" });
  }
  //je le supprime
  fs.unlinkSync(filePath);

  updateUploadedFilesPublic();

  return NextResponse.json({ message: "Fichier supprimé" });
}