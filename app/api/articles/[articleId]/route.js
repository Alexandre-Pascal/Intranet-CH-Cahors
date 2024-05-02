
import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";
import fs from "fs";

export async function GET(request, { params }) {
  const result = await prisma.datas_articles.findUnique({
    where: {
      id : params.articleId,
    },
  });
  return NextResponse.json({ result });
}

export async function DELETE(request, { params }) {
  const result = await prisma.datas_articles.delete({
    where: {
      id : params.articleId,
    },
  });
  return NextResponse.json({ result });
}

export async function PUT(request, { params }) {
  const res = await request.json();
  const result = await prisma.datas_articles.update({
    where: {
      id : params.articleId,
    },
    data: res,
  });
  return NextResponse.json({ result });
}

export async function POST(request, { params }) {
  const id = parseInt(params.articleId);
  const res = await request.json();
  const result = await prisma.datas_articles.create({ data : res });

  //On renomme le dossier temporaire avec le titre de l'article
  fs.renameSync(`./temp/${id}`, `./temp/${res.title}`);

  //On crée le dossier files dans le dossier de l'article
  fs.mkdirSync(`./public/uploadedFiles/${res.title}/files`, { recursive: true });

  //On déplace les fichiers du dossier temporaire vers le dossier de l'article
  fs.readdirSync(`./temp/${res.title}`).forEach(file => {
    fs.renameSync(`./temp/${res.title}/${file}`, `./public/uploadedFiles/${res.title}/files/${file}`);
  });

  return NextResponse.json({ result });
}
