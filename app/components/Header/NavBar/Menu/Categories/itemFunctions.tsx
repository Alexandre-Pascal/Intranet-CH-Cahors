
import { dataObject, NewDataList, NewSubCategory, NewTitle } from "@/app/lib/utils/types";
import { handleDeleteItem, handleSubmitItem, handleUpdateItem } from "./itemApiCalls";
import generateTitleId from "@/app/lib/utils/generateId";

export const submitItem = async(datas : dataObject) => {
  switch (datas.datasType) {
  case "Category":{
    if (datas.setName && datas.setOrder){
      const newItem = {
        category_name: datas.name,
        category_order: datas.order,
      } as NewDataList;
      const apiEndpoint = "/api/categories/add-category";
      handleSubmitItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.router);
    }
    break;
  }
  case "SubCategory":
  {
    if (datas.setName && datas.setOrder && datas.setUrl){
      const newItem = {
        sub_category_name: datas.name,
        sub_category_url: datas.url,
        sub_category_order: datas.order,
      } as NewSubCategory;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/add-subcategories`;
      handleSubmitItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.router, datas.setUrl,);
    }
    break;
  }
  case "Title":{
    if (datas.setName && datas.setOrder && datas.setUrl){
      const newItem = {
        title_name: datas.name,
        title_url: datas.url,
        title_order: datas.order,
      } as NewTitle;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}
      /subcategories/${datas.selectedSubCategoryId}/titles/add-title`;
      handleSubmitItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.router, datas.setUrl,);
    }
    break;
  }
  }
};

export const updateItem = async(datas : dataObject) => {
  switch (datas.datasType) {
  case "Category":{
    if (datas.setName && datas.setOrder){
      const newItem = {
        category_name: datas.name,
        category_order: datas.order,
      } as NewDataList;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}`;
      handleUpdateItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.router);
    }
    break;
  }

  case "SubCategory":{
    if (datas.setName && datas.setOrder && (datas.setUrl || datas.articleLinked)){
      const pageLinked = datas.url !== "" ? datas.url : datas.articleLinked?.id;
      alert(datas.url);
      const newItem = {
        sub_category_name: datas.name,
        sub_category_url: pageLinked,
        sub_category_order: datas.order,
      } as NewSubCategory;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}`;
      handleUpdateItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.router, datas.setUrl);
    }
    break;
  }

  case "Title":{
    if (datas.setName && datas.setOrder && (datas.setUrl || datas.articleLinked)){
      const pageLinked = datas.url ? datas.url : generateTitleId(datas.articleLinked);
      const newItem = {
        title_name: datas.name,
        title_url: pageLinked,
        title_order: datas.order,
      } as NewTitle;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}
      /subcategories/${datas.selectedSubCategoryId}/titles/${datas.selectedTitleId}`;
      handleUpdateItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.router, datas.setUrl);
    }
    break;
  }
  }
};

export const deleteItem = async(datas : dataObject) => {
  switch (datas.datasType) {
  case "Category":{
    const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}`;
    handleDeleteItem(apiEndpoint, datas.router);
    break;
  }

  case "SubCategory":{
    const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}
    /subcategories/${datas.selectedSubCategoryId}`;
    handleDeleteItem(apiEndpoint, datas.router);
    break;
  }

  case "Title":{
    const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}
    /subcategories/${datas.selectedSubCategoryId}/titles/${datas.selectedTitleId}`;

    handleDeleteItem(apiEndpoint, datas.router);
    break;
  }
  }
};

