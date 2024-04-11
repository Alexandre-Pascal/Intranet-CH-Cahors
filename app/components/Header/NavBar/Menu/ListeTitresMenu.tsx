import { useState, useEffect } from "react";
import { DataList, SubCategory, Title } from "@/app/utils/types";
import styles from "./styles.module.css";
import Image from "next/image";

import crayon from "../../../../assets/icons/crayon.png";
import plus from "../../../../assets/icons/plus.png";
import poubelle from "../../../../assets/icons/poubelle.png";

export default function ListeTitres(datas: DataList[]) {
  const [dataList, setdataList] = useState<DataList[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0);
  const [addingCategory, setAddingCategory] = useState(false);
  const [addingSubCategory, setAddingSubCategory] = useState(false);
  const [addingTitle, setAddingTitle] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryOrder, setNewCategoryOrder] = useState(0);
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [newSubCategoryUrl, setNewSubCategoryUrl] = useState("");
  const [newSubCategoryOrder, setNewSubCategoryOrder] = useState(0);
  const [newTitleName, setNewTitleName] = useState("");
  const [newTitleUrl, setNewTitleUrl] = useState("");
  const [newTitleOrder, setNewTitleOrder] = useState(0);

  // alert("dataList: " + JSON.stringify(dataList));

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

  // Soumettre le formulaire d'ajout de nouvelle catégorie
  const handleSubmitCategory = (event: React.FormEvent) => {
    event.preventDefault();
    // Ajouter la nouvelle catégorie à la liste des données
    const newCategory: DataList = {
      category_id: dataList.length + 1,
      category_name: newCategoryName,
      category_order: newCategoryOrder,
      sub_categories: [],
    };
    setdataList([...dataList, newCategory]);
    setNewCategoryName("");
    setNewCategoryOrder(0);
    setAddingCategory(false);
  };

  // Soumettre le formulaire d'ajout de nouvelle sous-catégorie
  const handleSubmitSubCategory = (event: React.FormEvent) => {
    event.preventDefault();
    // Ajouter la nouvelle sous-catégorie à la liste des données
    const updatedDataList = [...dataList];
    updatedDataList[selectedCategoryId!].sub_categories.push({
      sub_category_id: updatedDataList[selectedCategoryId!].sub_categories.length + 1,
      sub_category_name: newSubCategoryName,
      sub_category_url: newSubCategoryUrl,
      sub_category_order: newSubCategoryOrder,
      titles: [],
    });
    setdataList(updatedDataList);
    setNewSubCategoryName("");
    setNewSubCategoryUrl("");
    setNewSubCategoryOrder(0);
    setAddingSubCategory(false);
  };

  // Soumettre le formulaire d'ajout de nouveau titre
  const handleSubmitTitle = (event: React.FormEvent) => {
    event.preventDefault();
    // Ajouter le nouveau titre à la liste des données
    const updatedDataList = [...dataList];
    updatedDataList[selectedCategoryId!].sub_categories[selectedSubCategoryId!].titles.push({
      title_id: updatedDataList[selectedCategoryId!].sub_categories[selectedSubCategoryId!].titles.length + 1,
      title_name: newTitleName,
      title_url: newTitleUrl,
      title_order: newTitleOrder,
    });
    setdataList(updatedDataList);
    setNewTitleName("");
    setNewTitleUrl("");
    setNewTitleOrder(0);
    setAddingTitle(false);
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
              <Image className={styles.icon_action_list} src={crayon} alt="crayon" width={32} height={32} />
            </a>
            <a>
              <Image className={styles.icon_action_list} src={poubelle} alt="poubelle" width={32} height={32} />
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
        <div className={styles.dialog}>
          <form onSubmit={handleSubmitCategory}>
            <input
              type="text"
              placeholder="Nom de la catégorie"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Ordre de la catégorie"
              value={newCategoryOrder}
              onChange={(e) => setNewCategoryOrder(parseInt(e.target.value))}
            />
            <button type="submit">Ajouter</button>
            <button onClick={() => setAddingCategory(false)}>Annuler</button>
          </form>
        </div>
      )}

      {/* Boîte de dialogue pour ajouter une nouvelle sous-catégorie */}
      {addingSubCategory && (
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
            <button type="submit">Ajouter</button>
            <button onClick={() => setAddingSubCategory(false)}>Annuler</button>
          </form>
        </div>
      )}

      {/* Boîte de dialogue pour ajouter un nouveau titre */}
      {addingTitle && (
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
            <button type="submit">Ajouter</button>
            <button onClick={() => setAddingTitle(false)}>Annuler</button>
          </form>
        </div>
      )}
    </div>
  );
}
