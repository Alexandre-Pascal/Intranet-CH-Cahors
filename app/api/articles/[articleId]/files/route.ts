import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

export async function GET(request, { params }) {
  const articleId = params.articleId;

  let dir;

  // Vérifier si l'articleId est un nombre
  if (parseInt(articleId)) {
    dir = path.resolve(`./temp/${articleId}`);
  }
  else
  {
    dir = path.resolve(`./public/uploadedFiles/${articleId}/files`);
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

    // const filePath = `./public/uploadedFiles/${articleId}/files/${file.name}`;

    if (parseInt(articleId)) {
      filePath = `./temp/${articleId}/${file.name}`;

      if (!fs.existsSync(`./temp/${articleId}`)) {
        fs.mkdirSync(`./temp/${articleId}`, { recursive: true });
      }
    }
    else
    {
      switch (typeOfFile) {
      case "image":
        filePath = `./public/uploadedFiles/${articleId}/images/${file.name}`;
        break;
      case "file":
        filePath = `./public/uploadedFiles/${articleId}/files/${file.name}`;
        break;
      default:
        filePath = `./public/uploadedFiles/${articleId}/files/${file.name}`;
        break;
      }
      if (!fs.existsSync(`./public/uploadedFiles/${articleId}`)) {
        fs.mkdirSync(`./public/uploadedFiles/${articleId}`, { recursive: true });
      }
    }

    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success", data: file.size });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
