import { NextResponse } from "next/server";
import prisma from "../../lib/utils/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.nextUrl);
  const value = searchParams.get("value");
  if (value) {
    const data = await prisma.main_categories.findMany({ //récupérer que les noms
      select: {
        category_name: true,
      },
    });
    return NextResponse.json({ data });
  }

  const data = await prisma.main_categories.findMany({
    include: {
      sub_categories: true,
    },
  });
  return NextResponse.json({ data });
}