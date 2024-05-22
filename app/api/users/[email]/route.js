import prisma from "@/app/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const id = params.email;
  const res = await request.json();
  const result = await prisma.users.update({
    where: {
      email: id,
    },
    data: res,
  });
  return NextResponse.json({ result });
}

export async function DELETE(request, { params }) {
  const id = params.email;
  const result = await prisma.users.delete({
    where: {
      email: id,
    },
  });
  return NextResponse.json({ result });
}