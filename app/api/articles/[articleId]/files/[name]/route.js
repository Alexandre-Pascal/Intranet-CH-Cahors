//Je veux que quand je clique sur un fichier, il se télécharge

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export async function GET(request, { params }, res) {
  //j'arrive sur cette api avec le lie, fetch(`/api/articles/${id}/file/download-file?filename=${filename}`) donc je récupère l'id et le nom du fichier
  const articleId = params.articleId;
  const filename = params.name;
  console.log(articleId, filename);
  //je récupère le chemin du fichier
  const filePath = path.resolve(`./public/uploadedFiles/${articleId}/${filename}`);
  console.log(filePath);

  //je vérifie si le fichier existe
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: "Aucun fichier trouvé" });
  }
  //je le télécharge
  return NextResponse.json(filePath);
}