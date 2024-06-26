import { Dispatch, SetStateAction } from "react";

// Définition des interfaces pour les paramètres des fonctions
interface HandleSubmitUpdateItemProps {
  item: any;
  apiEndpoint: string;
  setNewItemName: Dispatch<SetStateAction<string>>;
  setNewItemOrder: Dispatch<SetStateAction<number>>;
  router: any;
  setNewUrl?: Dispatch<SetStateAction<string>>;
}

interface HandleDeleteItemProps {
  apiEndpoint: string;
  router: any;
}

// Fonction pour gérer l'ajout d'un élément
export async function handleSubmitItem({
  item,
  apiEndpoint,
  setNewItemName,
  setNewItemOrder,
  router,
  setNewUrl,
}: HandleSubmitUpdateItemProps) {
  try {
    await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'élément:", error);
  }
  setNewItemName("");
  setNewItemOrder(0);
  if (setNewUrl) {
    setNewUrl("");
  }
  router.refresh();
}

// Fonction pour gérer la mise à jour d'un élément
export async function handleUpdateItem({
  item,
  apiEndpoint,
  setNewItemName,
  setNewItemOrder,
  router,
  setNewUrl,
}: HandleSubmitUpdateItemProps) {
  try {
    await fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'élément:", error);
  }
  setNewItemName("");
  setNewItemOrder(0);
  if (setNewUrl) {
    setNewUrl("");
  }
  router.refresh();
}

// Fonction pour gérer la suppression d'un élément
export async function handleDeleteItem({ apiEndpoint, router }: HandleDeleteItemProps) {
  try {
    await fetch(apiEndpoint, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'élément:", error);
  }
  router.refresh();
}
