
import { dataObject, NewDataList, NewSubCategory, NewTitle } from "@/app/utils/types";
import { handleDeleteItem, handleSubmitItem, handleUpdateItem } from "./itemApiCalls";

export const submitItem = async(datas : dataObject) => {
  switch (datas.datasType) {
  case "Category":{
    let newItem = {
      category_name: datas.name,
      category_order: datas.order,
    } as NewDataList;

    let apiEndpoint = "/api/categories/add-category";
    handleSubmitItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.setDoing);
    break;
  }
  case "SubCategory":{
    // alert(JSON.stringify(datas));
    let newItem = {
      sub_category_name: datas.name,
      sub_category_url: datas.url,
      sub_category_order: datas.order,
    } as NewSubCategory;

    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/add-subcategories`;
    handleSubmitItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.setDoing, datas.setUrl);
    break;
  }
  case "Title":{
    let newItem = {
      title_name: datas.name,
      title_url: datas.url,
      title_order: datas.order,
    } as NewTitle;

    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}/titles/add-title`;
    handleSubmitItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.setDoing, datas.setUrl);
    break;
  }
  }
};

export const updateItem = async(datas : dataObject) => {
  switch (datas.datasType) {
  case "Category":{
    let newItem = {
      category_name: datas.name,
      category_order: datas.order,
    } as NewDataList;

    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}`;
    handleUpdateItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.setDoing);
    break;
  }
  case "SubCategory":{
    let newItem = {
      sub_category_name: datas.name,
      sub_category_url: datas.url,
      sub_category_order: datas.order,
    } as NewSubCategory;

    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}`;
    handleUpdateItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.setDoing, datas.setUrl);
    break;
  }
  case "Title":{
    let newItem = {
      title_name: datas.name,
      title_url: datas.url,
      title_order: datas.order,
    } as NewTitle;

    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}/titles/${datas.selectedTitleId}`;
    handleUpdateItem(newItem, apiEndpoint, datas.setName, datas.setOrder, datas.setDoing, datas.setUrl);
    break;
  }
  }
};

export const deleteItem = async(datas : dataObject) => {
  switch (datas.datasType) {
  case "Category":{
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}`;
    handleDeleteItem(apiEndpoint);
    break;
  }
  case "SubCategory":{
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}`;
    handleDeleteItem(apiEndpoint);
    break;
  }
  case "Title":{
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}/titles/${datas.selectedTitleId}`;
    handleDeleteItem(apiEndpoint);
    break;
  }
  }
};

