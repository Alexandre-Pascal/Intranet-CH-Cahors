
import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";
import fs from "fs";
import generateTitleId from "@/app/lib/utils/generateId";

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
  const title = generateTitleId(res.title);

  //On renomme le dossier temporaire avec le titre de l'article
  fs.renameSync(`${process.env.TEMPDIR}/${id}`, `${process.env.TEMPDIR}/${title}`, { recursive: true });

  //On crée le dossier files dans le dossier de l'article
  fs.mkdirSync(`./public/uploadedFiles/${title}/files`, { recursive: true });
  fs.mkdirSync(`./public/uploadedFiles/${title}/images`, { recursive: true });

  //On déplace les fichiers du dossier temporaire vers le dossier de l'article
  fs.readdirSync(`${process.env.TEMPDIR}/${title}/files`).forEach(file => {
    fs.renameSync(`${process.env.TEMPDIR}/${title}/files/${file}`, `./public/uploadedFiles/${title}/files/${file}`);
  });

  //On déplace les images du dossier temporaire vers le dossier de l'article
  fs.readdirSync(`${process.env.TEMPDIR}/${title}/images/`).forEach(file => {
    fs.renameSync(`${process.env.TEMPDIR}/${title}/images/${file}`, `./public/uploadedFiles/${title}/images/${file}`);
  }
  );

  //On supprime le dossier temporaire
  fs.rmdirSync(`${process.env.TEMPDIR}/${title}`, { recursive: true });

  return NextResponse.json({ result });
}
