import { Editor as CoreEditor } from "@tiptap/core";
import { Editor } from "@tiptap/react";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

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

export type newArticle = {
  title: string,
  content: string
}

export type article = {
  id: string,
  title: string,
  content: string
}

export type kindOfDialog = "Add" | "Update" | "Delete" | "None";

export type kindOfDatas = "Category" | "SubCategory" | "Title" | "None";

export type dataObject = {
  dialogType : kindOfDialog,
  datasType : kindOfDatas,
  title : string,
  setDoing : React.Dispatch<React.SetStateAction<{itemType: kindOfDatas, dialogType: kindOfDialog}>>
  router : any,
  dataList? : DataList[],
  name? : string,
  order? : number,
  setName? : React.Dispatch<React.SetStateAction<string>>,
  setOrder? : React.Dispatch<React.SetStateAction<number>>,
  url? : string,
  setUrl? : React.Dispatch<React.SetStateAction<string>>
  selectedCategory : DataList | null,
  setSelectedCategory : React.Dispatch<React.SetStateAction<DataList | null>>,
  selectedSubCategoryId? : number
  selectedTitleId? : number,
  articleLinked? : article | null,
  setArticleLinked? : React.Dispatch<React.SetStateAction<article | null>>
};

// export type dataObjectAddCategory = {
// };

export type dataObjectAddSubCategory = {
  selectedCategory : DataList | null,
};

export type dataObjectAddTitle = {
  selectedSubCategoryId : number,
};

export type dataObjectUpdateCategory = {
  selectedCategory : DataList | null,
  name : string,
  order : number
};

export type dataObjectUpdateSubCategory = {
  selectedSubCategoryId : number,
  name : string,
  order : number,
  url : string
};

export type dataObjectUpdateTitle = {
  selectedSubCategoryId : number,
  selectedTitleId : number,
  name : string,
  order : number,
  url : string
};

export type dataObjectDeleteCategory = {
  selectedCategory : DataList | null,
};

export type dataObjectDeleteSubCategory = {
  selectedSubCategoryId : number,
};

export type dataObjectDeleteTitle = {
  selectedSubCategoryId : number,
  selectedTitleId : number,
};

export interface MenuProps {
  editor: Editor
  appendTo?: React.RefObject<any>
  shouldHide?: boolean
}

export interface ShouldShowProps {
  editor?: CoreEditor
  view: EditorView
  state?: EditorState
  oldState?: EditorState
  from?: number
  to?: number
}

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void
}