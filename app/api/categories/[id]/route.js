
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const id = params.id;
  console.log(id);
  const result = await prisma.main_categories.delete({
    where: {
      category_id : Number(id),
    },
  });
  return NextResponse.json({ result });
}

export async function PUT(request, { params }) {
  const id = params.id;
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

export async function GET( params) {
  const id = params.id;
  const result = await prisma.main_categories.findUnique({
    where: {
      category_id : Number(id),
    },
  });
  return NextResponse.json({ result });
}