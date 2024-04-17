import { DataList } from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";

export const handleSubmitItem = async(newItem: any, apiEndpoint: string, setNewItemName: Dispatch<SetStateAction<string>>,setNewItemOrder: Dispatch<SetStateAction<number>>, setDatalist: Dispatch<SetStateAction<DataList[]>>, router: any ,setNewUrl?: Dispatch<SetStateAction<string>>) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    // if (response.ok) {
    //   const data = await response.json();
    //   const newItemWithId = { ...newItem, category_id: data.category_id };

    //   setDatalist((prevDataList) => {
    //     const newDatalist = [...Object.values(prevDataList), newItemWithId];
    //     return newDatalist.sort((a, b) => a.category_order - b.category_order);
    //   });
    // }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'élément:", error);
  }
  setNewItemName("");
  setNewItemOrder(0);
  setNewUrl ? setNewUrl("") : null;
  router.refresh();
};

export const handleUpdateItem = async(updatedItem: any, apiEndpoint: string, setNewItemName: Dispatch<SetStateAction<string>>,setNewItemOrder: Dispatch<SetStateAction<number>>, setDatalist: Dispatch<SetStateAction<DataList[]>>, router: any, setNewUrl?: Dispatch<SetStateAction<string>> ) => {
  try {
    await fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'élément:", error);
  }
  // setDatalist((prevDataList) => [...Object.values(prevDataList), updatedItem]);
  setNewItemName("");
  setNewItemOrder(0);
  setNewUrl ? setNewUrl("") : null;
  router.refresh();
};

export const handleDeleteItem = async(apiEndpoint: string, setDatalist: Dispatch<SetStateAction<DataList[]>>, router: any) => {
  try {
    await fetch(apiEndpoint, {
      method: "DELETE",
    });
    const idToDelete = apiEndpoint.split("/").pop();
    // setDatalist((prevDataList) => Object.values(prevDataList).filter((data) => data.category_id !== Number(idToDelete)));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'élément:", error);
  }
  router.refresh();
};
