
import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";

export async function GET(request, { params }) {

  const id = params.categoryId;
  const result = await prisma.main_categories.findUnique({
    where: {
      category_id : Number(id),
    },
  });
  return NextResponse.json({ result });
}

export async function DELETE(request, { params }) {
  const id = params.categoryId;
  console.log(id);
  const result = await prisma.main_categories.delete({
    where: {
      category_id : Number(id),
    },
  });
  return NextResponse.json({ result });
}

export async function PUT(request, { params }) {
  const id = params.categoryId;
  const res = await request.json();
  console.log(res);
  const result = await prisma.main_categories.update({
    where: {
      category_id : Number(id),
    },
    data: res,
  });
  return NextResponse.json({ result });
}