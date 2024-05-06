import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
//post pour ajouter une image

// export async function POST(req, { params }, res) {
//   console.log("POST");
//   const articleId = params.articleId;
//   // recu^ère le formulaire qui contient l'image et retourner l'image
//   const formData = await req.formData();
//   const image = formData.getAll("image")[0];
//   if (!image) {
//     return NextResponse.json({ status: "fail", data: "No image uploaded" });
//   }
//   //chemin de l'image
//   const filePath = `./public/uploadedImages/${articleId}/images/${image.name}`;

//   console.log(filePath);
//   //si le dossier n'existe pas, le créer
//   if (!fs.existsSync(`./public/uploadedImages/${articleId}`)) {
//     fs.mkdirSync(`./public/uploadedImages/${articleId}`, { recursive: true });
//   }
//   //copie l'image dans le dossier
//   fs.copyFileSync(image.path, filePath);
//   return NextResponse.json({ status: "success", data: "Image uploaded" });
// }

export async function POST(req, { params }, res) {
  const pump = promisify(pipeline);

  try {
    console.log("POST");
    const articleId = params.articleId;
    console.log(articleId);
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
    console.log(parseInt(articleId));
    // const filePath = `./public/uploadedFiles/${articleId}/files/${file.name}`;
    if (parseInt(articleId)) {
      filePath = `./temp/${articleId}/${file.name}`;

      if (!fs.existsSync(`./temp/${articleId}`)) {
        fs.mkdirSync(`./temp/${articleId}`, { recursive: true });
      }
    }
    else
    {
      filePath = `./public/uploadedFiles/${articleId}/images/${file.name}`;

      if (!fs.existsSync(`./public/uploadedFiles/${articleId}`)) {
        fs.mkdirSync(`./public/uploadedFiles/${articleId}`, { recursive: true });
      }
    }

    console.log(filePath);
    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success", data: file.size });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}