import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

export async function GET(request, { params }) {
  const articleId = params.articleId;
  const dir = path.resolve(`./public/uploadedFiles/${articleId}`);

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

export async function POST(req, { params }, res) {
  const pump = promisify(pipeline);

  try {
    const id = params.articleId;
    if (!id) {
      return NextResponse.json({ status: "fail", data: "Missing articleId" });
    }
    else
    {
      console.log(id);
    }

    const formData = await req.formData();
    const file = formData.getAll("files")[0];
    if (!file) {
      return NextResponse.json({ status: "fail", data: "No file uploaded" });
    }

    const filePath = `./public/uploadedFiles/${id}/${file.name}`;

    // Vérifier si le répertoire existe, sinon le créer
    if (!fs.existsSync(`./public/uploadedFiles/${id}`)) {
      fs.mkdirSync(`./public/uploadedFiles/${id}`, { recursive: true });
    }
    // return NextResponse.json({ status: "success", data: "ArticleId is here" });

    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success", data: file.size });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
