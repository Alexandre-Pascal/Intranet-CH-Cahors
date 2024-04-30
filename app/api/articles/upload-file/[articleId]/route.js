import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export async function POST(req, { params }, res) {
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

    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success", data: file.size });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET /api/articles/upload-file" });
}
