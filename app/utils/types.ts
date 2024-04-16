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

export type kindOfDialog = "Ajouter" | "Modifier" | "Supprimer";

export type kindOfDatas = "Category" | "SubCategory" | "Title";

export type dataObject = {
  dialogType : kindOfDialog,
  datasType : kindOfDatas,
  title : string,
  newName : string,
  setnewName : React.Dispatch<React.SetStateAction<string>>,
  newOrder : number,
  setNewOrder : React.Dispatch<React.SetStateAction<number>>,
  newUrl? : string,
  setNewUrl? : React.Dispatch<React.SetStateAction<string>>
  setDoing : React.Dispatch<React.SetStateAction<boolean>>
  selectedCategory : DataList | null,
  setSelectCategory : React.Dispatch<React.SetStateAction<DataList | null>>,
  selectedSubCategoryId : number
  setSelectSubCategoryId : React.Dispatch<React.SetStateAction<number>>,
  selectedTitleId : number,
  setSelectTitleId : React.Dispatch<React.SetStateAction<number>>,
}