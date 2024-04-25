import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";

export async function GET(request, { params }) {
  const subcategoryId = params.subcategoryId;
  const titleId = params.titleId;
  const result = await prisma.titles.findMany({
    where: {
      title_id: Number(titleId),
      sub_category_id: Number(subcategoryId),
    },
  });
  return NextResponse.json({ result });
}

export async function DELETE(request, { params }) {
  const subcategoryId = params.subcategoryId;
  const titleId = params.titleId;
  const result = await prisma.titles.delete({
    where: {
      title_id: Number(titleId),
      sub_category_id: Number(subcategoryId),
    },
  });
  return NextResponse.json({ result });
}

export async function PUT(request, { params }) {
  const subcategoryId = params.subcategoryId;
  const titleId = params.titleId;
  const res = await request.json();
  const result = await prisma.titles.update({
    where: {
      title_id: Number(titleId),
      sub_category_id: Number(subcategoryId),
    },
    data: res,
  });
  return NextResponse.json({ result });
}