import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const res = await request.json();
  console.log(res);
  console.log("testt");
  console.log(params.id);
  const result = await prisma.sub_categories.create({
    data : {
      category_id: Number(params.id),
      sub_category_order: res.sub_category_order,
      sub_category_name: res.sub_category_name,
    },
    // main_categories: {
    //   connect: {
    //     category_id: params.id,
    //   },
    // },
  }
  );
  return NextResponse.json({ result });
}