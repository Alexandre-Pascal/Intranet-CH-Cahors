
import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";

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