type Title = {
  title_id: number;
  title_name: string;
  title_url: string;
};

type SubCategory = {
  sub_category_id: number;
  sub_category_name: string;
  titles: Title[];
  sub_category_url: string;
};

export type DataList = {
  category_id: number;
  category_name: string;
  sub_categories: SubCategory[];
};