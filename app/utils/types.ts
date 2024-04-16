export type Title = {
  title_id: number;
  title_name: string;
  title_url: string;
  title_order: number;
};

export type SubCategory = {
  sub_category_id: number;
  sub_category_name: string;
  titles: Title[];
  sub_category_url: string;
  sub_category_order: number;
};

export type DataList = {
  category_id: number;
  category_name: string;
  sub_categories: SubCategory[];
  category_order: number;
};

export type NewTitle = {
  title_name: string;
  title_url: string;
  title_order: number;
};

export type NewSubCategory = {
  sub_category_name: string;
  sub_category_url: string;
  sub_category_order: number;
};

export type NewDataList = {
  category_name: string;
  category_order: number;
};

export type kindOfDialog = "Add" | "Update" | "Delete" | "None";

export type kindOfDatas = "Category" | "SubCategory" | "Title" | "None";

export type dataObject = {
  dialogType : kindOfDialog,
  datasType : kindOfDatas,
  title : string,
  name : string,
  setName : React.Dispatch<React.SetStateAction<string>>,
  order : number,
  setOrder : React.Dispatch<React.SetStateAction<number>>,
  url? : string,
  setUrl? : React.Dispatch<React.SetStateAction<string>>
  setDoing : React.Dispatch<React.SetStateAction<{itemType: kindOfDatas, dialogType: kindOfDialog}>>
  selectedCategory : DataList | null,
  setSelectCategory : React.Dispatch<React.SetStateAction<DataList | null>>,
  selectedSubCategoryId : number
  setSelectSubCategoryId : React.Dispatch<React.SetStateAction<number>>,
  selectedTitleId : number,
  setSelectTitleId : React.Dispatch<React.SetStateAction<number>>,
  currentName? : string,
  currentOrder? : number,
  currentUrl? : string,
};

export type dataObjectAddCategory = {
};

export type dataObjectAddSubCategory = {
  selectedCategory : DataList | null,
};

export type dataObjectAddTitle = {
  selectedSubCategoryId : number,
};

export type dataObjectUpdateCategory = {
  name : string,
  order : number
};

export type dataObjectUpdateSubCategory = {
  name : string,
  order : number,
  url : string
};

export type dataObjectUpdateTitle = {
  name : string,
  order : number,
  url : string
};

export type dataObjectDeleteCategory = {
  selectedCategory : DataList | null,
};

export type dataObjectDeleteSubCategory = {
  selectedCategory : DataList | null,
  selectedSubCategoryId : number,
};

export type dataObjectDeleteTitle = {
  selectedCategory : DataList | null,
  selectedSubCategoryId : number,
  selectedTitleId : number,
};

