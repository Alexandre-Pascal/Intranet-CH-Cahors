import { useState, useEffect } from "react";
import { DataList, SubCategory, Title } from "@/app/utils/types";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

import crayon from "../../../../assets/icons/crayon.png";
import plus from "../../../../assets/icons/plus.png";
import poubelle from "../../../../assets/icons/poubelle.png";

export default function ListeTitres(datas: DataList[]) {
  const [dataList, setdataList] = useState<DataList[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0); //
  const [addingCategory, setAddingCategory] = useState(false);
  const [addingSubCategory, setAddingSubCategory] = useState(false); //
  const [addingTitle, setAddingTitle] = useState(false);//
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryOrder, setNewCategoryOrder] = useState(0);
  const [newSubCategoryName, setNewSubCategoryName] = useState(""); //
  const [newSubCategoryUrl, setNewSubCategoryUrl] = useState(""); //
  const [newSubCategoryOrder, setNewSubCategoryOrder] = useState(0); //
  const [newTitleName, setNewTitleName] = useState("");
  const [newTitleUrl, setNewTitleUrl] = useState("");
  const [newTitleOrder, setNewTitleOrder] = useState(0);

  const [updatingCategory, setUpdatingCategory] = useState(false);
  const [updatingCategoryId, setUpdatingCategoryId] = useState(0);

  const [deletingCategory, setDeletingCategory] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState(0);

  const router = useRouter();

  useEffect(() => {
    // Mettre à jour les titres chargés avec les titres reçus en props
    setdataList(datas);
  }, [datas]); // Rafraîchir les titres chargés lorsque les titres en props changent

  // Fonction pour trier les catégories par ordre
  const sortCategories = (categories: DataList[]) => {
    if(categories) return categories.sort((a, b) => a.category_order - b.category_order);
    return [];
  };

  // Fonction pour trier les sous-catégories par ordre
  const sortSubCategories = (subCategories: SubCategory[]) => {
    if (subCategories) return subCategories.sort((a, b) => a.sub_category_order - b.sub_category_order);
    return [];
  };

  // Fonction pour trier les titres par ordre
  const sortTitles = (titles: Title[]) => {
    if (titles) return titles.sort((a, b) => a.title_order - b.title_order);
    return [];
  };

  // Ajouter une nouvelle catégorie
  const addCategory = () => {
    setAddingCategory(true);
  };

  // Ajouter une nouvelle sous-catégorie
  const addSubCategory = () => {
    setAddingSubCategory(true);
  };

  // Ajouter un nouveau titre
  const addTitle = () => {
    setAddingTitle(true);
  };

  const deleteCategory = (id : number) => {
    setDeletingCategory(true);
    setDeletingCategoryId(id);
  };

  const updateCategoryy = (id : number, name : string, order : number) =>{
    setUpdatingCategoryId(id);
    setNewCategoryName(name);
    setNewCategoryOrder(order);
    setUpdatingCategory(true);
  };

  // Soumettre le formulaire d'ajout de nouvelle catégorie
  const handleSubmitCategory = async(event: React.FormEvent) => {
    event.preventDefault();
    const newCategory: any = {
      category_name: newCategoryName,
      category_order: newCategoryOrder,
    };
    try {
      await fetch("/api/add-category", {
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

  const handleDeleteCategory = async() => {
    try {
      await fetch(`api/category/${deletingCategoryId}`, {
        method: "DELETE",
      });
    }
    catch {
      throw new Error("Erreur lors de la suppression de la catégorie");
    }
    router.refresh();
    setDeletingCategoryId(0);
  };

  const handleUpdateCategory = async(event: React.FormEvent) => {
    event.preventDefault();
    const updatedCategory: any = {
      category_name: newCategoryName,
      category_order: newCategoryOrder,
    };
    try {
      await fetch(`api/category/${updatingCategoryId}`, {
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

  // Soumettre le formulaire d'ajout de nouvelle sous-catégorie
  const handleSubmitSubCategory = async(event: React.FormEvent) => {
    event.preventDefault();
    // Ajouter la nouvelle sous-catégorie à la liste des données
    const updatedDataList = [...dataList];
    const newSubCategory: SubCategory = {
      sub_category_id: updatedDataList[selectedCategoryId!].sub_categories.length + 1,
      sub_category_name: newSubCategoryName,
      sub_category_url: newSubCategoryUrl,
      sub_category_order: newSubCategoryOrder,
      titles: [],
    };
    const response = await fetch(`url_de_votre_api/categories/${updatedDataList[selectedCategoryId!].category_id}/subcategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubCategory),
    });
    if (response.ok) {
      const data = await response.json();
      updatedDataList[selectedCategoryId!].sub_categories.push(data);
      setdataList(updatedDataList);
      setNewSubCategoryName("");
      setNewSubCategoryUrl("");
      setNewSubCategoryOrder(0);
      setAddingSubCategory(false);
    } else {
      console.error("Erreur lors de l'ajout de la sous-catégorie");
    }
  };

  // Soumettre le formulaire d'ajout de nouveau titre
  const handleSubmitTitle = async(event: React.FormEvent) => {
    event.preventDefault();
    // Ajouter le nouveau titre à la liste des données
    const updatedDataList = [...dataList];
    const newTitle: Title = {
      title_id: updatedDataList[selectedCategoryId!].sub_categories[selectedSubCategoryId!].titles.length + 1,
      title_name: newTitleName,
      title_url: newTitleUrl,
      title_order: newTitleOrder,
    };
    const response = await fetch(`url_de_votre_api/categories/${updatedDataList[selectedCategoryId!].category_id}/subcategories/${updatedDataList[selectedCategoryId!].sub_categories[selectedSubCategoryId!].sub_category_id}/titles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTitle),
    });
    if (response.ok) {
      const data = await response.json();
      updatedDataList[selectedCategoryId!].sub_categories[selectedSubCategoryId!].titles.push(data);
      setdataList(updatedDataList);
      setNewTitleName("");
      setNewTitleUrl("");
      setNewTitleOrder(0);
      setAddingTitle(false);
    } else {
      console.error("Erreur lors de l'ajout du titre");
    }
  };

  return (
    <div className={styles.menu}>
      <div className={styles.list_main_categories}>
        {dataList && sortCategories(Object.values(dataList)).map((category, index) => (
          <div className={styles.action_list}>
            <h1 key={index} className=
              {
                selectedCategoryId === category.category_id - 1 ?
                  styles.selectedCategory : styles.notSelectedCategory
              }
            onClick={() => setSelectedCategoryId(category.category_id - 1)
            }>
              {category.category_name}
            </h1>
            <a>
              <Image className={styles.icon_action_list} onClick={() => updateCategoryy(category.category_id, category.category_name, category.category_order)} src={crayon} alt="crayon" width={32} height={32} />
            </a>
            <a>
              <Image className={styles.icon_action_list} onClick={() => deleteCategory(category.category_id)} src={poubelle} alt="poubelle" width={32} height={32} />
            </a>
          </div>
        ))}
        <a onClick={addCategory}>
          <Image className={styles.icon_action_list} style={{ marginLeft : "2vw" }} src={plus} alt="plus" width={32} height={32} />
        </a>
      </div>
      <div className={styles.list_sub_categories_and_titles}>
        <ul>
          {dataList && selectedCategoryId !== null &&
            sortSubCategories(dataList[selectedCategoryId]?.sub_categories)?.map((subCategory, index) => (
              <li key={index} className={styles.sub_categorie}>
                <div className={styles.action_list}>
                  {subCategory.sub_category_url ? (
                    <a href={subCategory.sub_category_url}>
                      <h2>{subCategory.sub_category_name}</h2>
                    </a>
                  ) : (
                    <h2>{subCategory.sub_category_name}</h2>
                  )}
                  <a onClick={addTitle}>
                    <Image className={styles.icon_action_list} src={plus} alt="plus" width={20} height={20} />
                  </a>
                  <a>
                    <Image className={styles.icon_action_list} src={crayon} alt="crayon" width={20} height={20} />
                  </a>
                  <a>
                    <Image className={styles.icon_action_list} src={poubelle} alt="poubelle" width={20} height={20} />
                  </a>
                </div>
                <ul>
                  {sortTitles(subCategory.titles).map((title, index) => (
                    <li>
                      <div className={styles.action_list}>
                        {title.title_url ? (
                          <a href={title.title_url}>
                            <h3 key={index}>{title.title_name}</h3>
                          </a>
                        ) : (
                          <h3 key={index}>{title.title_name}</h3>
                        )}
                        <a>
                          <Image className={styles.icon_action_list} src={crayon} alt="crayon" width={20} height={20} />
                        </a>
                        <a>
                          <Image className={styles.icon_action_list} src={poubelle} alt="poubelle" width={20} height={20} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          <a onClick={addSubCategory}>
            <Image className={styles.icon_action_list} src={plus} alt="plus" width={32} height={32} />
          </a>
        </ul>
      </div>

      {/* Boîte de dialogue pour ajouter une nouvelle catégorie */}
      {addingCategory && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <h2>Choisissez le nom et l'ordre de cette nouvelle catégorie :</h2>
            <form onSubmit={handleSubmitCategory}>
              <div className={styles.container_input}>
                <h3>Nom : </h3>
                <input
                  type="text"
                  placeholder="Nom de la catégorie"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <h3>Ordre : </h3>
                <input
                  type="number"
                  placeholder="Ordre de la catégorie"
                  value={newCategoryOrder}
                  onChange={(e) => setNewCategoryOrder(parseInt(e.target.value))}
                />
              </div>
              <div className={styles.container_buttons}>
                <button onClick={() => setAddingCategory(false)}>Annuler</button>
                <button type="submit">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {updatingCategory && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <h2>Modifiez le nom et l'ordre de cette catégorie :</h2>
            <form onSubmit={handleUpdateCategory}>
              <div className={styles.container_input}>
                <h3>Nom : </h3>
                <input
                  type="text"
                  placeholder="Nom de la catégorie"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <h3>Ordre : </h3>
                <input
                  type="number"
                  placeholder="Ordre de la catégorie"
                  value={newCategoryOrder}
                  onChange={(e) => setNewCategoryOrder(parseInt(e.target.value))}
                />
              </div>
              <div className={styles.container_buttons}>
                <button onClick={() => setUpdatingCategory(false)}>Annuler</button>
                <button type="submit">Modifier</button>
              </div>
            </form>
          </div>
        </div>
      )
      }

      {/* Boîte de dialogue pour ajouter une nouvelle sous-catégorie */}
      {addingSubCategory && (
        <div className={styles.container_dialog}>

          <div className={styles.dialog}>
            <form onSubmit={handleSubmitSubCategory}>
              <input
                type="text"
                placeholder="Nom de la sous-catégorie"
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e.target.value)}
              />
              <input
                type="text"
                placeholder="URL de la sous-catégorie"
                value={newSubCategoryUrl}
                onChange={(e) => setNewSubCategoryUrl(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ordre de la sous-catégorie"
                value={newSubCategoryOrder}
                onChange={(e) => setNewSubCategoryOrder(parseInt(e.target.value))}
              />
              <div className={styles.container_buttons}>
                <button type="submit">Ajouter</button>
                <button onClick={() => setAddingSubCategory(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Boîte de dialogue pour ajouter un nouveau titre */}
      {addingTitle && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <form onSubmit={handleSubmitTitle}>
              <input
                type="text"
                placeholder="Nom du titre"
                value={newTitleName}
                onChange={(e) => setNewTitleName(e.target.value)}
              />
              <input
                type="text"
                placeholder="URL du titre"
                value={newTitleUrl}
                onChange={(e) => setNewTitleUrl(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ordre du titre"
                value={newTitleOrder}
                onChange={(e) => setNewTitleOrder(parseInt(e.target.value))}
              />
              <div className={styles.container_buttons}>
                <button type="submit">Ajouter</button>
                <button onClick={() => setAddingTitle(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingCategory && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <h2>Êtes-vous sûr de vouloir supprimer cette catégorie ?</h2>
            <div className={styles.container_buttons}>
              <button onClick={() => setDeletingCategory(false)}>Annuler</button>
              <button onClick={() => {handleDeleteCategory(); setDeletingCategory(false);}}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
