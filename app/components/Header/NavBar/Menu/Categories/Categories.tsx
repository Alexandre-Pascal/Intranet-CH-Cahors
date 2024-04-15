import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { kindOfDatas, NewDataList } from "@/app/utils/types";

export default function Categories(apiLink : string, datasType : kindOfDatas) {
  const [addingItem, setAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemOrder, setNewItemOrder] = useState(0);
  const [updatingItem, setUpdatingItem] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(0);
  const [deletingItemId, setDeletingItemId] = useState(0);
  const [deletingItem, setDeletingItem] = useState(false);

  const router = useRouter();

switch (datasType) {
    case "Category":
        var newItem : NewDataList = {
            category_name: newItemName,
            category_order: newItemOrder,
        };
        break;
    case "SubCategory":
        var newItem = "Sous-catégorie";
        break;
    case "newItem":
        var newItem = "Titre";
        break;
    }

const addItem = () => {
    setAddingItem(true);
    }
    const deleteItem = (id : number) => {
    setDeletingItem(true);
    setDeletingItemId(id);
    }
    const updateItem = (id : number, name : string, order : number) =>{
    setUpdatingItemId(id);
    setNewItemName(name);
    setNewItemOrder(order);
    setUpdatingItem(true);
    }
    const handleSubmitItem = async(event: React.FormEvent) => {
    event.preventDefault();
    const newItem: NewDataList = {


  return(
    <div>

    </div>
  );
}