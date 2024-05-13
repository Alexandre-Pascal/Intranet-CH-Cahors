
import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";
import fs from "fs";
import generateTitleId from "@/app/lib/utils/generateId";
import updateUploadedFilesPublic from "@/app/lib/utils/updateUploadedFilesPublic";

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
  const title = generateTitleId(res.title);
  res.content = res.content.replace(/\/tempFiles\/\d+\//g, `/savedFiles/${title}/`);
  const result = await prisma.datas_articles.create({ data : res });

  //On renomme le dossier temporaire avec le titre de l'article
  fs.renameSync(`${process.env.SERVER_TEMP_FILES_DIR}/${id}`, `${process.env.SERVER_TEMP_FILES_DIR}/${title}`, { recursive: true });

  //On déplace le dossier temporaire dans le dossier de sauvegarde
  fs.cpSync(`${process.env.SERVER_TEMP_FILES_DIR}/${title}`, `${process.env.SERVER_SAVED_FILES_DIR}/${title}`, { recursive: true });

  //on vide le dossier temporaire
  fs.rmdirSync(`${process.env.SERVER_TEMP_FILES_DIR}/${title}`, { recursive: true });

  //On met à jour les fichiers publics
  updateUploadedFilesPublic();

  return NextResponse.json({ result });
}
