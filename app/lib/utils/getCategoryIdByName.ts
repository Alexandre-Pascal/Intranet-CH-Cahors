"use server";

// Fichier pour récupérer les catégories en fonction du nom

import prisma from "./prisma";

export default async function getCategoryIdByName(categoryName: string) {
  const categoryId = await prisma.main_categories.findFirst({
    where: {
      category_name: categoryName,
    },
    select: {
      category_id: true,
    },
  });
  console.log("dans getCategoryIdByName ",categoryId?.category_id);
  return categoryId?.category_id;
}