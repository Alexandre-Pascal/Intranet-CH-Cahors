export type datasList = {
    mainCategories: string[],
    categoryData: CategoryData,
  }

  interface Title {
    title_id: number;
    title_name: string;
  }

  interface SubCategory {
    sub_category_id: number;
    sub_category_name: string;
    titles: Title[];
  }

export type CategoryData = {
    category_name: string;
    sub_categories: SubCategory[];
  }