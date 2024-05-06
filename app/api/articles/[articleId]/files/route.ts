import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import updateUploadedFilesPublic from "@/app/lib/utils/updateUploadedFilesPublic";
export async function GET(request, { params }) {
  const articleId = params.articleId;

  let dir;

  // Vérifier si l'articleId est un nombre
  console.log("id", articleId);
  if (parseInt(articleId)) {
    console.log("id Parsé", articleId);
    dir = path.resolve(`./public/${process.env.CLIENT_TEMP_FILES_DIR}/${articleId}/files`);
    console.log("dir", dir);
  }
  else
  {
    dir = path.resolve(`./${process.env.CLIENT_SAVED_FILES_DIR}/${articleId}/files`);
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

export async function POST(req: NextRequest, context: {params: {articleId: string}}) {
  const pump = promisify(pipeline);
  const { searchParams } = new URL(req.nextUrl);
  const typeOfFile = searchParams.get("type");

  try {
    const articleId = context.params.articleId;
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

    switch (typeOfFile) {
    case "image":
      filePath = `${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/images/${file.name}`;
      if (!fs.existsSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/images`)) {
        fs.mkdirSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/images`, { recursive: true });
      }
      break;

    case "file":
      filePath = `${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/files/${file.name}`;
      console.log(filePath);
      if (!fs.existsSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/files`)) {
        fs.mkdirSync(`${process.env.SERVER_TEMP_FILES_DIR}/${articleId}/files`, { recursive: true });
      }
      break;

    }

    await pump(file.stream(), fs.createWriteStream(filePath));

    updateUploadedFilesPublic();

    return NextResponse.json({ status: "success", data: file.size });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
