import { dataObject, NewDataList, NewSubCategory, NewTitle } from "@/app/lib/utils/types";
import { handleDeleteItem, handleSubmitItem, handleUpdateItem } from "./itemApiCalls";
import generateTitleId from "@/app/lib/utils/generateId";

// Fonction pour soumettre un nouvel élément
export async function submitItem(datas: dataObject) {
  switch (datas.datasType) {
  case "Category": {
    if (datas.setName && datas.setOrder) {
      const newItem = {
        category_name: datas.name,
        category_order: datas.order,
      } as NewDataList;
      const apiEndpoint = "/api/categories/add-category";
      await handleSubmitItem({
        item: newItem,
        apiEndpoint,
        setNewItemName: datas.setName,
        setNewItemOrder: datas.setOrder,
        router: datas.router,
      });
    }
    break;
  }
  case "SubCategory": {
    if (datas.setName && datas.setOrder && datas.setUrl) {
      const newItem = {
        sub_category_name: datas.name,
        sub_category_url: datas.url,
        sub_category_order: datas.order,
      } as NewSubCategory;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/add-subcategorie`;
      await handleSubmitItem({
        item: newItem,
        apiEndpoint,
        setNewItemName: datas.setName,
        setNewItemOrder: datas.setOrder,
        router: datas.router,
        setNewUrl: datas.setUrl,
      });
    }
    break;
  }
  case "Title": {
    if (datas.setName && datas.setOrder && datas.setUrl) {
      const newItem = {
        title_name: datas.name,
        title_url: datas.url,
        title_order: datas.order,
      } as NewTitle;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}/titles/add-title`;
      await handleSubmitItem({
        item: newItem,
        apiEndpoint,
        setNewItemName: datas.setName,
        setNewItemOrder: datas.setOrder,
        router: datas.router,
        setNewUrl: datas.setUrl,
      });
    }
    break;
  }
  }
}

// Fonction pour mettre à jour un élément existant
export async function updateItem(datas: dataObject) {
  switch (datas.datasType) {
  case "Category": {
    if (datas.setName && datas.setOrder) {
      const newItem = {
        category_name: datas.name,
        category_order: datas.order,
      } as NewDataList;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}`;
      await handleUpdateItem({
        item: newItem,
        apiEndpoint,
        setNewItemName: datas.setName,
        setNewItemOrder: datas.setOrder,
        router: datas.router,
      });
    }
    break;
  }
  case "SubCategory": {
    if (datas.setName && datas.setOrder && (datas.setUrl || datas.articleLinked)) {
      const pageLinked = datas.url !== "" ? datas.url : datas.articleLinked?.id;
      const newItem = {
        sub_category_name: datas.name,
        sub_category_url: pageLinked,
        sub_category_order: datas.order,
      } as NewSubCategory;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}`;
      await handleUpdateItem({
        item: newItem,
        apiEndpoint,
        setNewItemName: datas.setName,
        setNewItemOrder: datas.setOrder,
        router: datas.router,
        setNewUrl: datas.setUrl,
      });
    }
    break;
  }
  case "Title": {
    if (datas.setName && datas.setOrder && (datas.setUrl || datas.articleLinked)) {
      const pageLinked = datas.url ? datas.url : generateTitleId(datas.articleLinked);
      const newItem = {
        title_name: datas.name,
        title_url: pageLinked,
        title_order: datas.order,
      } as NewTitle;
      const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}/titles/${datas.selectedTitleId}`;
      await handleUpdateItem({
        item: newItem,
        apiEndpoint,
        setNewItemName: datas.setName,
        setNewItemOrder: datas.setOrder,
        router: datas.router,
        setNewUrl: datas.setUrl,
      });
    }
    break;
  }
  }
}

// Fonction pour supprimer un élément existant
export async function deleteItem(datas: dataObject) {
  switch (datas.datasType) {
  case "Category": {
    const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}`;
    await handleDeleteItem({ apiEndpoint, router: datas.router });
    break;
  }
  case "SubCategory": {
    const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}`;
    await handleDeleteItem({ apiEndpoint, router: datas.router });
    break;
  }
  case "Title": {
    const apiEndpoint = `/api/categories/${datas.selectedCategory?.category_id}/subcategories/${datas.selectedSubCategoryId}/titles/${datas.selectedTitleId}`;
    await handleDeleteItem({ apiEndpoint, router: datas.router });
    break;
  }
  }
}
