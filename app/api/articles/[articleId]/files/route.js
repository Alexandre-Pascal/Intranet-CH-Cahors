import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import updateUploadedFilesPublic from "@/app/lib/utils/updateUploadedFilesPublic";

export async function GET(request, { params }) {
  const articleId = params.articleId;
  let dir;

  // Vérifier si l'articleId est un nombre
  if (parseInt(articleId)) {
    // Si c'est un fichier temporaire (articleId est formé d'une suite de chiffres)
    dir = path.resolve(`${process.env.CLIENT_PUBLIC_TEMP_FILES_DIR}/${articleId}/files`);
  }
  else {
    dir = path.resolve(`${process.env.CLIENT_PUBLIC_SAVED_FILES_DIR}/${articleId}/files`);
  }

  // Vérifier si le dossier existe
  if (!fs.existsSync(dir)) {
    return NextResponse.json({ message: "Aucun fichier trouvé" });
  }

  // Lister les fichiers dans le dossier
  const files = fs.readdirSync(dir);

  if (files.length === 0) {
    return NextResponse.json({ message: "Aucun fichier trouvé" });
  }

  return NextResponse.json({ files });
}

export async function POST(req, { params }) {
  const pump = promisify(pipeline);
  const { searchParams } = new URL(req.nextUrl);
  const typeOfFile = searchParams.get("type");

  try {
    const articleId = params.articleId;
    if (!articleId) {
      return NextResponse.json({ status: "fail", data: "Missing articleId" });
    }
    else
    {
      console.log(articleId);
    }

    const formData = await req.formData();
    const file = formData.getAll("files")[0];
    if (!file) {
      return NextResponse.json({ status: "fail", data: "No file uploaded" });
    }

    let filePath;

    if (parseInt(articleId)) {
      // Si c'est un fichier temporaire (articleId est formé d'une suite de chiffres)
      switch (typeOfFile) {
      // En fonction du type de fichier
      case "image":
        filePath = `${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/images/${file.name}`;
        if (!fs.existsSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/images`)) {
          // Si le dossier n'existe pas, je le crée
          fs.mkdirSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/images`, { recursive: true });
        }
        break;

      case "video":
        filePath = `${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/videos/${file.name}`;
        if (!fs.existsSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/videos`)) {
          // Si le dossier n'existe pas, je le crée
          fs.mkdirSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/videos`, { recursive: true });
        }
        break;

      case "file":
        filePath = `${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/files/${file.name}`;
        if (!fs.existsSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/files`)) {
          // Si le dossier n'existe pas, je le crée
          fs.mkdirSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/files`, { recursive: true });
        }
        break;
      }
    }
    else {
      switch (typeOfFile) {
      // En fonction du type de fichier
      case "image":
        filePath = `${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/images/${file.name}`;
        if (!fs.existsSync(`${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/images`)) {
          // Si le dossier n'existe pas, je le crée
          fs.mkdirSync(`${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/images`, { recursive: true });
        }
        break;
      case "video":
        filePath = `${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/videos/${file.name}`;
        if (!fs.existsSync(`${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/videos`)) {
          // Si le dossier n'existe pas, je le crée
          fs.mkdirSync(`${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/videos`, { recursive: true });
        }
        break;

      case "file":
        filePath = `${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/files/${file.name}`;
        if (!fs.existsSync(`${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/files`)) {
          // Si le dossier n'existe pas, je le crée
          fs.mkdirSync(`${process.env.SERVER_SAVED_FILES_DIR}/${articleId}/files`, { recursive: true });
        }
        break;
      }
    }

    // Mettre à jour le fichier public
    await pump(file.stream(), fs.createWriteStream(filePath));

    // Mettre à jour les fichiers publics
    updateUploadedFilesPublic();

    return NextResponse.json({ status: "success", data: file.size });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
