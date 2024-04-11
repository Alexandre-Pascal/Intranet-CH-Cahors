
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const id = params.id;
  console.log(id);
  const result = await prisma.main_categories.delete({
    where: {
      category_id : Number(id),
    },
  });
  return NextResponse.json({ result });
}