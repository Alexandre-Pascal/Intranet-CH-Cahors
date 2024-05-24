import prisma from "../../../lib/utils/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const name = params.name;
  const res = await request.json();
  const result = await prisma.roles.update({
    where: { name },
    data: res,
  });
  return NextResponse.json({ result });
}

export async function DELETE(request, { params }) {
  const name = params.name;
  const result = await prisma.roles.delete({
    where: { name },
  });
  return NextResponse.json({ result });
}

export async function GET(request, { params }) {
  const name = params.name;
  const result = await prisma.roles.findUnique({
    where: { name },
  });
  return NextResponse.json({ result });
}