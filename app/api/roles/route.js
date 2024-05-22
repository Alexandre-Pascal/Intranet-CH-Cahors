import prisma from "../../lib/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();
  console.log("LE RESULATAT", res);
  const result = await prisma.roles.create({
    data: res,
  });
  return NextResponse.json({ result });
}

export async function GET() {
  const roles = await prisma.roles.findMany();
  return NextResponse.json({ roles });
}