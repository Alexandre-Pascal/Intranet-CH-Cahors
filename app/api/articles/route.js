import prisma from "@/app/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const result = await prisma.datas_articles.findMany();
  return NextResponse.json({ result });

}