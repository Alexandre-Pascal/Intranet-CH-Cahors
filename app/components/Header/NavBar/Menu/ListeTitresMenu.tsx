import { useState, useEffect } from "react";
import { DataList, SubCategory, Title, NewDataList, NewSubCategory, NewTitle, kindOfDatas, dataObject } from "@/app/utils/types";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleSubmitItem, handleDeleteItem, handleUpdateItem } from "./Categories/itemApiCalls";

import crayon from "../../../../assets/icons/crayon.png";
import plus from "../../../../assets/icons/plus.png";
import poubelle from "../../../../assets/icons/poubelle.png";
import SubmitUpdateDeleteContainer from "./Categories/DialogContainers/SubmitUpdateDeleteContainer";

export default function ListeTitres(datas: DataList[]) {

  const [dataList, setdataList] = useState<DataList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DataList | null>(null); // Ajouter un état pour stocker la catégorie sélectionnée
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0);
  const [selectedTitleId, setSelectedTitleId] = useState(0);

  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [url, setUrl] = useState("");

  const [addingCategory, setAddingCategory] = useState(false);
  const [addingSubCategory, setAddingSubCategory] = useState(false); //
  const [addingTitle, setAddingTitle] = useState(false);

  const [updatingCategory, setUpdatingCategory] = useState(false);
  const [updatingSubCategory, setupdatingSubCategory] = useState(false);
  const [updatingTitle, setUpdatingTitle] = useState(false);

  const [deletingCategory, setDeletingCategory] = useState(false);
  const [deletingSubCategory, setDeletingSubCategory] = useState(false);
  const [deletingTitle, setDeletingTitle] = useState(false);

  const [length, setLength] = useState(1);

  const router = useRouter();

  const titleHeight = 65 / length; // Calcul de la hauteur des titres

  useEffect(() => {
    // Mettre à jour les titres chargés avec les titres reçus en props
    setdataList(datas);
  }, [datas]); // Rafraîchir les titres chargés lorsque les titres en props changent

  useEffect(() => {
    // Mettre à jour la longueur de la liste des catégories
    setLength(Object.values(dataList).length);
  }, [dataList]);

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

  const updateCategory = (id : number, name : string, order : number) =>{
    setName(name);
    setOrder(order);
    setUpdatingCategory(true);
  };

  const updateSubCategory = (id : number, name : string, url : string, order : number) =>{
    setSelectedSubCategoryId(id);
    setName(name);
    setUrl(url);
    setOrder(order);
    setupdatingSubCategory(true);
  };

  const updateTitle = (subCategoryId : number, id : number, name : string, url : string, order : number) =>{
    setSelectedSubCategoryId(subCategoryId);
    setSelectedTitleId(id);
    setName(name);
    setUrl(url);
    setOrder(order);
    setUpdatingTitle(true);
  };

  const deleteCategory = (selectedCategory : DataList) => {
    setDeletingCategory(true);
    setSelectedCategory(selectedCategory);
  };

  const deleteSubCategory = (id : number) => {
    setDeletingSubCategory(true);
    setSelectedSubCategoryId(id);
  };

  const deleteTitle = (subCategoryId : number, id : number) => {
    setSelectedSubCategoryId(subCategoryId);
    setSelectedTitleId(id);
    setDeletingTitle(true);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.list_main_categories}>
        {dataList && (Object.values(dataList)).map((category, index) => (
          <div className={styles.action_list}>
            <h1
              key={index}
              style={{ height: `${titleHeight}vh` }}
              className={
                selectedCategory === null && index === 0 ? styles.selectedCategory :
                  (selectedCategory !== null && selectedCategory.category_id === category.category_id ?
                    styles.selectedCategory : styles.notSelectedCategory)
              }
              onClick={() => {
                setSelectedCategory(category);
              }}
            >
              {category.category_name}
            </h1>
            <a>
              <Image className={styles.icon_action_list} onClick=
                {
                  () =>
                    updateCategory
                    (
                      category.category_id,
                      category.category_name,
                      category.category_order
                    )
                }
              src={crayon} alt="crayon" width={32} height={32}
              />
            </a>
            <a>
              <Image className={styles.icon_action_list} onClick=
                {
                  () =>
                  {
                    deleteCategory(category);
                  }
                }
              src={poubelle} alt="poubelle" width={32} height={32}
              />
            </a>
          </div>
        ))}
        <a onClick={addCategory}>
          <Image
            className={styles.icon_action_list}
            style=
              {
                {
                  position: "absolute",
                  bottom: "2vh",
                  left : "2vw",
                }
              }
            src={plus}
            alt="plus"
            width={32}
            height={32}
          />
        </a>
      </div>
      <div className={styles.list_sub_categories_and_titles}>
        <ul>
          {dataList && selectedCategory?.category_id !== null &&
          (selectedCategory ? selectedCategory.sub_categories : dataList[0]?.sub_categories)?.map((subCategory, index) => (

            <li key={index} className={styles.sub_categorie}>
              <div className={styles.action_list}>
                {subCategory.sub_category_url ? (
                  <a href={subCategory.sub_category_url}>
                    <h2>{subCategory.sub_category_name}</h2>
                  </a>
                ) : (
                  <h2>{subCategory.sub_category_name}</h2>
                )}
                <a onClick={()=> {addTitle(); setSelectedSubCategoryId(subCategory.sub_category_id);}}>
                  <Image className={styles.icon_action_list} src={plus} alt="plus" width={20} height={20} />
                </a>
                <a>
                  <Image className={styles.icon_action_list} onClick=
                    {
                      () => updateSubCategory
                      (
                        subCategory.sub_category_id,
                        subCategory.sub_category_name,
                        subCategory.sub_category_url,
                        subCategory.sub_category_order
                      )
                    }
                  src={crayon} alt="crayon" width={20} height={20}
                  />
                </a>
                <a>
                  <Image className={styles.icon_action_list}
                    onClick=
                      {
                        () =>
                          deleteSubCategory(subCategory.sub_category_id )
                      }
                    src={poubelle} alt="poubelle" width={20} height={20} />
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
                        <Image className={styles.icon_action_list} onClick={() => updateTitle(subCategory.sub_category_id, title.title_id, title.title_name, title.title_url, title.title_order)} src={crayon} alt="crayon" width={20} height={20} />
                      </a>
                      <a>
                        <Image className={styles.icon_action_list} onClick={() => deleteTitle(subCategory.sub_category_id, title.title_id)} src={poubelle} alt="poubelle" width={20} height={20} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <a onClick={() => {addSubCategory(); setSelectedCategory(selectedCategory);}}>
            <Image className={styles.icon_action_list} src={plus} alt="plus" width={32} height={32} />
          </a>
        </ul>
      </div>

      { addingCategory && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Ajouter",
          datasType: "Category",
          title: "Choisissez le nom et l&apos;ordre de cette nouvelle catégorie :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          setDoing: setAddingCategory,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { updatingCategory && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Modifier",
          datasType: "Category",
          title: "Modifiez le nom et l&apos;ordre de cette catégorie :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          setDoing: setUpdatingCategory,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { deletingCategory && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Supprimer",
          datasType: "Category",
          title: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          setDoing: setDeletingCategory,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { addingSubCategory && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Ajouter",
          datasType: "SubCategory",
          title: "Choisissez le nom, l&apos;URL et l&apos;ordre de cette nouvelle sous-catégorie :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setAddingSubCategory,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { updatingSubCategory && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Modifier",
          datasType: "SubCategory",
          title: "Modifiez le nom, l&apos;URL et l&apos;ordre de cette sous-catégorie :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setupdatingSubCategory,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { deletingSubCategory && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Supprimer",
          datasType: "SubCategory",
          title: "Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setDeletingSubCategory,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { addingTitle && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Ajouter",
          datasType: "Title",
          title: "Choisissez le nom, l'URL et l'ordre de ce nouveau titre :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setAddingTitle,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { updatingTitle && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Modifier",
          datasType: "Title",
          title: "Modifiez le nom, l&apos;URL et l&apos;ordre de ce titre :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setUpdatingTitle,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { deletingTitle && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: "Supprimer",
          datasType: "Title",
          title: "Êtes-vous sûr de vouloir supprimer ce titre ?",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setDeletingTitle,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}
    </div>
  );
}
