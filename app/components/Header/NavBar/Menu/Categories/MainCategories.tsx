import { NewDataList } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainCategories() {

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryOrder, setNewCategoryOrder] = useState(0);
  const [updatingCategory, setUpdatingCategory] = useState(false);
  const [updatingCategoryId, setUpdatingCategoryId] = useState(0);
  const [deletingCategoryId, setDeletingCategoryId] = useState(0);
  const [deletingCategory, setDeletingCategory] = useState(false);

  const router = useRouter();

  // Ajouter une nouvelle catégorie
  const addCategory = () => {
    setAddingCategory(true);
  };

  const deleteCategory = (id : number) => {
    setDeletingCategory(true);
    setDeletingCategoryId(id);
  };

  const updateCategory = (id : number, name : string, order : number) =>{
    setUpdatingCategoryId(id);
    setNewCategoryName(name);
    setNewCategoryOrder(order);
    setUpdatingCategory(true);
  };
    // Soumettre le formulaire d'ajout de nouvelle catégorie
  const handleSubmitCategory = async(event: React.FormEvent) => {
    event.preventDefault();
    const newCategory: NewDataList = {
      category_name: newCategoryName,
      category_order: newCategoryOrder,
    };
    try {
      await fetch("/api/categories/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
    } catch (error) {
      throw new Error("Erreur lors de l'ajout de la catégorie", );
    }
    router.refresh();
    setNewCategoryName("");
    setNewCategoryOrder(0);
    setAddingCategory(false);
  };

  const handleUpdateCategory = async(event: React.FormEvent) => {
    event.preventDefault();
    const updatedCategory: NewDataList = {
      category_name: newCategoryName,
      category_order: newCategoryOrder,
    };
    try {
      await fetch(`api/categories/${updatingCategoryId}`, {
        method: "PUT", // Utiliser la méthode PUT pour la mise à jour
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory), // Envoyer les nouvelles données dans le corps de la requête
      });
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour de la catégorie");
    }
    router.refresh();
    setNewCategoryName("");
    setNewCategoryOrder(0);
    setUpdatingCategory(false);
  };

  const handleDeleteCategory = async() => {
    try {
      await fetch(`api/categories/${deletingCategoryId}`, {
        method: "DELETE",
      });
    }
    catch {
      throw new Error("Erreur lors de la suppression de la catégorie");
    }
    router.refresh();
    setDeletingCategoryId(0);
  };
}