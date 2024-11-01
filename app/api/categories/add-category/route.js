import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";

export async function POST(request) {
  const res = await request.json();
  console.log(res);
  const result = await prisma.main_categories.create({ data : res });
  return NextResponse.json({ result });
}
