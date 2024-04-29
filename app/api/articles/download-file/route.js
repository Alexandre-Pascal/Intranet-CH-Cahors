import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.resolve("./public/uploadedFiles");

  // Vérifier si le dossier existe
  if (!fs.existsSync(dir)) {

    //retourne l'archtechture du dossier
    return NextResponse.json({ dir });
  }

  // Lister les fichiers dans le dossier
  const files = fs.readdirSync(dir);

  if (files.length === 0) {
    return NextResponse.json({ message: "Aucun fichier trouvé" });
  }

  return NextResponse.json({ files });
}
