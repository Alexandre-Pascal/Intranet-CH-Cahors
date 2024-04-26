import { NextResponse } from "next/server";
import prisma from "../../lib/utils/prisma";

export async function GET() {
  const data = await prisma.main_categories.findMany({
    include: {
      sub_categories: true,
    },
  });
  return NextResponse.json({ data });
}