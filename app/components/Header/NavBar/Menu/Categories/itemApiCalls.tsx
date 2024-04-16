import { Dispatch, SetStateAction } from "react";

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
  setNewItemName("");
  setNewItemOrder(0);
  setAddingItem(false);
  setNewUrl ? setNewUrl("") : null;
};

export const handleUpdateItem = async(updatedItem: any, apiEndpoint: string, setNewItemName: Dispatch<SetStateAction<string>>,setNewItemOrder: Dispatch<SetStateAction<number>>, setUpdatingItem: Dispatch<SetStateAction<boolean>>,setNewUrl?: Dispatch<SetStateAction<string>> ) => {
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
};

