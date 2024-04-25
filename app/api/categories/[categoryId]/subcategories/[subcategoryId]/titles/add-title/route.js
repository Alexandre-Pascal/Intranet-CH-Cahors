import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";

export async function POST(request, { params }) {
  const res = await request.json();
  console.log(res);
  const result = await prisma.titles.create({ data :
    {
      title_name: res.title_name,
      title_order: res.title_order,
      title_url: res.title_url,
      sub_category_id: Number(params.subcategoryId),
    },
  });
  return NextResponse.json({ result });
}