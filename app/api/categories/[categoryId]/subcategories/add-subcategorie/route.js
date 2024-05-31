import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";

export async function POST(request, { params }) {
  const res = await request.json();
  const result = await prisma.sub_categories.create({
    data : {
      category_id: Number(params.categoryId),
      sub_category_order: res.sub_category_order,
      sub_category_name: res.sub_category_name,
      sub_category_url: res.sub_category_url,
    },
  }
  );
  return NextResponse.json({ result });
}