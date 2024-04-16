import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { kindOfDatas, NewDataList } from "@/app/utils/types";

// export default function Categories(apiEndpoint : string, datasType : kindOfDatas) {
//   const [addingItem, setAddingItem] = useState(false);
//   const [newItemName, setNewItemName] = useState("");
//   const [newItemOrder, setNewItemOrder] = useState(0);
//   const [updatingItem, setUpdatingItem] = useState(false);
//   const [updatingItemId, setUpdatingItemId] = useState(0);
//   const [deletingItemId, setDeletingItemId] = useState(0);
//   const [deletingItem, setDeletingItem] = useState(false);

// switch (datasType) {
//     case "Category":
//         {
//             let item = {
//             category_name: newItemName,
//             category_order: newItemOrder,
//         };
//         break;
//     }
//     case "SubCategory":
//         {
//         let item = "SousCategorie"
//         }
//         break;
//     case "Title":
//         {
//         let item : string = "Titre"
//         }
//         break;
//     }

//   const addItem = () => {
//     setAddingItem(true);
//   };
//   const deleteItem = (id : number) => {
//     setDeletingItem(true);
//     setDeletingItemId(id);
//   };
//   const updateItem = (id : number, name : string, order : number) =>{
//     setUpdatingItemId(id);
//     setNewItemName(name);
//     setNewItemOrder(order);
//     setUpdatingItem(true);
//   };

// const router = useRouter();

export const handleSubmitItem = async(newItem: any, apiEndpoint: string, setNewItemName: Dispatch<SetStateAction<string>>,setNewItemOrder: Dispatch<SetStateAction<number>>, setAddingItem: Dispatch<SetStateAction<boolean>>,setNewUrl?: Dispatch<SetStateAction<string>> ) => {
  try {
    await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'élément:", error);
  }
  // router.refresh();
  setNewItemName("");
  setNewItemOrder(0);
  setAddingItem(false);
  setNewUrl ? setNewUrl("") : null;
};

export const handleUpdateItem = async(updatedItem: any, apiEndpoint: string, setNewItemName: Dispatch<SetStateAction<string>>,setNewItemOrder: Dispatch<SetStateAction<number>>, setUpdatingItem: Dispatch<SetStateAction<boolean>>,setNewUrl?: Dispatch<SetStateAction<string>> ) => {
  try {
    // alert("updatedItem : " + JSON.stringify(updatedItem));
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
  // router.refresh();
  setNewItemName("");
  setNewItemOrder(0);
  setUpdatingItem(false);
  setNewUrl ? setNewUrl("") : null;
};

export const handleDeleteItem = async(apiEndpoint: string) => {
  try {
    await fetch(apiEndpoint, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'élément:", error);
  }
  // router.refresh();
};

