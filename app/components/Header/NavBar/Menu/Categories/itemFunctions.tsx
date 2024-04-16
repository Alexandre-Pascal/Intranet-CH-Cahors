
import { dataObject, NewDataList, NewSubCategory, NewTitle } from "@/app/utils/types";
import { handleDeleteItem, handleSubmitItem, handleUpdateItem } from "./itemApiCalls";

export const submitItem = async(datas : dataObject) => {
  switch (datas.datasType) {
  case "Category":{
    let newItem = {
      category_name: datas.newName,
      category_order: datas.newOrder,
    } as NewDataList;
    let apiEndpoint = "/api/categories/add-category";
    handleSubmitItem(newItem, apiEndpoint, datas.setnewName, datas.setNewOrder, datas.setDoing);
    break;
  }
  case "SubCategory":{
    // alert(JSON.stringify(datas));
    let newItem = {
      sub_category_name: datas.newName,
      sub_category_url: datas.newUrl,
      sub_category_order: datas.newOrder,
    } as NewSubCategory;
    // alert(JSON.stringify(newItem));
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/add-subcategories`;
    // alert(apiEndpoint);
    handleSubmitItem(newItem, apiEndpoint, datas.setnewName, datas.setNewOrder, datas.setDoing, datas.setNewUrl);
    break;
  }
  case "Title":{
    let newItem = {
      title_name: datas.newName,
      title_url: datas.newUrl,
      title_order: datas.newOrder,
    } as NewTitle;
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}/titles/add-title`;
    handleSubmitItem(newItem, apiEndpoint, datas.setnewName, datas.setNewOrder, datas.setDoing, datas.setNewUrl);
    break;
  }
  }
};

export const deleteItem = async(datas : dataObject) => {
  switch (datas.datasType) {
  case "Category":{
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}`;
    // alert(apiEndpoint);
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

export const updateItem = async(datas : dataObject) => {
  // alert(JSON.stringify(datas));
  switch (datas.datasType) {
  case "Category":{
    let newItem = {
      category_name: datas.newName,
      category_order: datas.newOrder,
    } as NewDataList;
    // alert(JSON.stringify(newItem));
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}`;
    // alert(apiEndpoint);
    handleUpdateItem(newItem, apiEndpoint, datas.setnewName, datas.setNewOrder, datas.setDoing);
    break;
  }
  case "SubCategory":{
    let newItem = {
      sub_category_name: datas.newName,
      sub_category_url: datas.newUrl,
      sub_category_order: datas.newOrder,
    } as NewSubCategory;
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}`;
    handleUpdateItem(newItem, apiEndpoint, datas.setnewName, datas.setNewOrder, datas.setDoing, datas.setNewUrl);
    break;
  }
  case "Title":{
    let newItem = {
      title_name: datas.newName,
      title_url: datas.newUrl,
      title_order: datas.newOrder,
    } as NewTitle;
    alert(JSON.stringify(newItem));
    alert(JSON.stringify(datas));
    let apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}/titles/${datas.selectedTitleId}`;
    alert(apiEndpoint);
    handleUpdateItem(newItem, apiEndpoint, datas.setnewName, datas.setNewOrder, datas.setDoing, datas.setNewUrl);
    break;
  }
  }
};
