import prisma from "./prisma"; // Importer votre instance Prisma
import { DataList } from "./types";

export default async function fetchDatas() {

  try {
    const mainCategories = await prisma.main_categories.findMany({
      select: {
        category_id: true,
        category_name: true,
      },
    });

    const categoriesWithData = await Promise.all(
      mainCategories.map(async(mainCategory) => {
        const subCategoriesAndTitles = await prisma.main_categories.findUnique({
          where: { category_id: mainCategory.category_id },
          include: {
            sub_categories: {
              select: {
                sub_category_id: true,
                sub_category_name: true,
                sub_category_url: true, // Ajout de sub_category_url
                titles: {
                  select: {
                    title_id: true,
                    title_name: true,
                    title_url: true, // Ajout de title_url
                  },
                },
              },
            },
          },
        });

        return {
          category_id: mainCategory.category_id,
          category_name: mainCategory.category_name,
          sub_categories: subCategoriesAndTitles?.sub_categories,
        };
      })
    );

    return categoriesWithData as DataList[];
  } catch (error) {
    console.error("Error fetching categories with subcategories and titles:", error);
    return []; // En cas d'erreur, retourner un tableau vide
  }
}
