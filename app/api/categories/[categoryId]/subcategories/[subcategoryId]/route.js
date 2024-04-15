import { NextResponse } from "next/server";
import prisma from "@/app/utils/prisma";

export async function GET(request, { params }) {
  const categoryId = params.categoryId;
  const subcategoryId = params.subcategoryId;
  const result = await prisma.sub_categories.findMany({
    where: {
      category_id: Number(categoryId),
      sub_category_id: Number(subcategoryId),
    },
  });

  return NextResponse.json({ result });
}

export async function DELETE(request, { params }) {
  const categoryId = params.categoryId;
  const subcategoryId = params.subcategoryId;
  const result = await prisma.sub_categories.delete({
    where: {
      category_id: Number(categoryId),
      sub_category_id: Number(subcategoryId),
    },
  });
  return NextResponse.json({ result });
}

export async function PUT(request, { params }) {
  const categoryId = params.categoryId;
  const subcategoryId = params.subcategoryId;
  const res = await request.json();
  const result = await prisma.sub_categories.update({
    where: {
      category_id: Number(categoryId),
      sub_category_id: Number(subcategoryId),
    },
    data: res,
  });
  return NextResponse.json({ result });
}