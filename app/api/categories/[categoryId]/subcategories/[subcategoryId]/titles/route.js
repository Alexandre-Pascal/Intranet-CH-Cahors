import { NextResponse } from "next/server";
import prisma from "@/app/utils/prisma";

export async function GET(request, { params }) {
  const subcategoryId = params.subcategoryId;
  const result = await prisma.titles.findMany({
    where: {
      sub_category_id: Number(subcategoryId),
    },
  });
  return NextResponse.json({ result });
}
