import { NextResponse } from "next/server";
import prisma from "@/app/lib/utils/prisma";

export async function GET(request, { params }) {
  const id = params.categoryId;
  //requete pour afficher toutes les sous catégories qui ont comme catégorie principal l'id passé en paramètre
  const result = await prisma.sub_categories.findMany({
    where: {
      category_id: Number(id),
    },
  });

  return NextResponse.json({ result });
}

