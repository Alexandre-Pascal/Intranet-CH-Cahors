//Je veux que quand je clique sur un fichier, il se télécharge

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request, { params }, res) {
  const articleId = params.articleId;
  const filename = params.name;
  console.log(articleId, filename);
  const filePath = path.resolve(`./public/uploadedFiles/${articleId}/files/${filename}`);
  console.log(filePath);

  //je vérifie si le fichier existe
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: "Aucun fichier trouvé" });
  }
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