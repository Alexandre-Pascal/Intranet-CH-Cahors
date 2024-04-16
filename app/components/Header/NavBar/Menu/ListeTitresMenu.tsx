import { useState, useEffect } from "react";
import { DataList, SubCategory, Title, NewDataList, NewSubCategory, NewTitle, kindOfDatas, dataObject, kindOfDialog, dataObjectAddSubCategory, dataObjectAddTitle, dataObjectUpdateCategory, dataObjectUpdateSubCategory, dataObjectUpdateTitle, dataObjectDeleteCategory, dataObjectDeleteSubCategory, dataObjectDeleteTitle, dataObjectAddCategory } from "@/app/utils/types";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleSubmitItem, handleDeleteItem, handleUpdateItem } from "./Categories/itemApiCalls";
import { KIND_OF_ADD, KIND_OF_UPDATE, KIND_OF_DELETE, KIND_OF_CATEGORY, KIND_OF_SUBCATEGORY, KIND_OF_TITLE } from "@/app/utils/constantes";

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

  const [isActive, setIsActive] = useState<{itemType: kindOfDatas, dialogType: kindOfDialog}>({ itemType: "None", dialogType: "None" });

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

  useEffect(() => {
    if (isActive.itemType !== "None" || isActive.dialogType !== "None")
      // alert(JSON.stringify(isActive));
      console.log(JSON.stringify(isActive));

  }), [isActive];

  const itemAction = (dialogType: kindOfDialog, itemType: kindOfDatas, dataObjectAddCategory? : dataObjectAddCategory, dataObjectAddSubCategory?: dataObjectAddSubCategory, dataObjectAddTitle? : dataObjectAddTitle, dataObjectUpdateCategory? : dataObjectUpdateCategory, dataObjectUpdateSubCategory? : dataObjectUpdateSubCategory, dataObjectUpdateTitle? : dataObjectUpdateTitle, dataObjectDeleteCategory? : dataObjectDeleteCategory, dataObjectDeleteSubCategory? : dataObjectDeleteSubCategory, dataObjectDeleteTitle? : dataObjectDeleteTitle ) => {
    switch (dialogType) {
    case KIND_OF_ADD:
      switch (itemType) {
      case KIND_OF_CATEGORY:
        setIsActive({ dialogType : KIND_OF_ADD, itemType:KIND_OF_CATEGORY });
        break;
      case KIND_OF_SUBCATEGORY:
        if (dataObjectAddSubCategory){
          setIsActive({ dialogType : KIND_OF_ADD, itemType:KIND_OF_SUBCATEGORY });
          setSelectedCategory(dataObjectAddSubCategory?.selectedCategory);
        }
        break;
      case KIND_OF_TITLE:
        if (dataObjectAddTitle){
          setIsActive({ dialogType : KIND_OF_ADD, itemType:KIND_OF_TITLE });
          setSelectedSubCategoryId(dataObjectAddTitle?.selectedSubCategoryId);
        }
        break;
      }
      break;
    case KIND_OF_UPDATE:
      switch (itemType) {
      case KIND_OF_CATEGORY:
        if (dataObjectUpdateCategory){
          setIsActive({ dialogType : KIND_OF_UPDATE, itemType:KIND_OF_CATEGORY });
          setName(dataObjectUpdateCategory.name);
          setOrder(dataObjectUpdateCategory.order);
        }
        break;
      case KIND_OF_SUBCATEGORY:
        if (dataObjectUpdateSubCategory){
          setIsActive({ dialogType : KIND_OF_UPDATE, itemType:KIND_OF_SUBCATEGORY });
          setName(dataObjectUpdateSubCategory.name);
          setUrl(dataObjectUpdateSubCategory.url);
          setOrder(dataObjectUpdateSubCategory.order);
        }
        break;
      case KIND_OF_TITLE:
        if (dataObjectUpdateTitle){
          setIsActive({ dialogType : KIND_OF_UPDATE, itemType:KIND_OF_TITLE });
          setName(dataObjectUpdateTitle.name);
          setUrl(dataObjectUpdateTitle.url);
          setOrder(dataObjectUpdateTitle.order);
        }
        break;
      }
      break;
    case KIND_OF_DELETE:
      switch (itemType) {
      case KIND_OF_CATEGORY:
        if (dataObjectDeleteCategory){
          setIsActive({ dialogType : KIND_OF_DELETE, itemType:KIND_OF_CATEGORY });
        }
        break;
      case KIND_OF_SUBCATEGORY:
        if (dataObjectDeleteSubCategory){
          setIsActive({ dialogType : KIND_OF_DELETE, itemType:KIND_OF_SUBCATEGORY });
        }
        break;
      case KIND_OF_TITLE:
        if (dataObjectDeleteTitle){
          setIsActive({ dialogType : KIND_OF_DELETE, itemType:KIND_OF_TITLE });
        }
        break;
      }
      break;
    }
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
                  () => itemAction(KIND_OF_UPDATE, KIND_OF_CATEGORY, undefined, undefined, undefined, { name: category.category_name, order: category.category_order } as dataObjectUpdateCategory)
                }
              src={crayon} alt="crayon" width={32} height={32}
              />
            </a>
            <a>
              <Image className={styles.icon_action_list} onClick=
                {
                  () => itemAction(KIND_OF_DELETE, KIND_OF_CATEGORY, undefined, undefined, undefined, undefined, undefined, undefined, { selectedCategory: category } as dataObjectDeleteCategory)
                }
              src={poubelle} alt="poubelle" width={32} height={32}
              />
            </a>
          </div>
        ))}
        <a onClick={() => itemAction(KIND_OF_ADD, KIND_OF_CATEGORY)}>
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
                <a onClick={()=> itemAction(KIND_OF_ADD, KIND_OF_TITLE, undefined, undefined, { selectedCategory: selectedCategory, selectedSubCategoryId: subCategory.sub_category_id } as dataObjectAddTitle)}>
                  <Image className={styles.icon_action_list} src={plus} alt="plus" width={20} height={20} />
                </a>
                <a>
                  <Image className={styles.icon_action_list} onClick=
                    {
                      () => itemAction(KIND_OF_UPDATE, KIND_OF_SUBCATEGORY, undefined, undefined, undefined, undefined, { name: subCategory.sub_category_name, url: subCategory.sub_category_url, order: subCategory.sub_category_order } as dataObjectUpdateSubCategory)
                    }
                  src={crayon} alt="crayon" width={20} height={20}
                  />
                </a>
                <a>
                  <Image className={styles.icon_action_list}
                    onClick=
                      {
                        () => itemAction(KIND_OF_DELETE, KIND_OF_SUBCATEGORY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, { selectedCategory: selectedCategory, selectedSubCategoryId: subCategory.sub_category_id } as dataObjectDeleteSubCategory)
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
                        <Image className={styles.icon_action_list} onClick={() => itemAction(KIND_OF_UPDATE, KIND_OF_TITLE, undefined, undefined, undefined, undefined, undefined, { name: title.title_name, url: title.title_url, order: title.title_order } as dataObjectUpdateTitle)}
                          src={crayon} alt="crayon" width={20} height={20} />
                      </a>
                      <a>
                        <Image className={styles.icon_action_list} onClick={() => itemAction(KIND_OF_DELETE, KIND_OF_TITLE, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, { selectedCategory: selectedCategory, selectedSubCategoryId: subCategory.sub_category_id, selectedTitleId: title.title_id } as dataObjectDeleteTitle)}
                          src={poubelle} alt="poubelle" width={20} height={20} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <a onClick={() => itemAction(KIND_OF_ADD, KIND_OF_SUBCATEGORY, undefined, { selectedCategory: selectedCategory }, undefined, undefined, undefined, undefined, undefined, undefined, undefined)}>
            <Image className={styles.icon_action_list} src={plus} alt="plus" width={32} height={32} />
          </a>
        </ul>
      </div>

      {isActive && isActive.dialogType === KIND_OF_ADD && isActive.itemType === KIND_OF_CATEGORY && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_ADD,
          datasType: KIND_OF_CATEGORY,
          title: "Choisissez le nom et l&apos;ordre de cette nouvelle catégorie :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          setDoing: setIsActive,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { isActive && isActive.dialogType === KIND_OF_UPDATE && isActive.itemType === KIND_OF_CATEGORY && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_UPDATE,
          datasType: KIND_OF_CATEGORY,
          title: "Modifiez le nom et l&apos;ordre de cette catégorie :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          setDoing: setIsActive,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { isActive && isActive.dialogType === KIND_OF_DELETE && isActive.itemType === KIND_OF_CATEGORY && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_DELETE,
          datasType: KIND_OF_CATEGORY,
          title: "Êtes-vous sûr de vouloir Delete cette catégorie ?",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          setDoing: setIsActive,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { isActive && isActive.dialogType === KIND_OF_ADD && isActive.itemType === KIND_OF_SUBCATEGORY && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_ADD,
          datasType: KIND_OF_SUBCATEGORY,
          title: "Choisissez le nom, l&apos;URL et l&apos;ordre de cette nouvelle sous-catégorie :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setIsActive,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { isActive && isActive.dialogType === KIND_OF_UPDATE && isActive.itemType === KIND_OF_SUBCATEGORY && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_UPDATE,
          datasType: KIND_OF_SUBCATEGORY,
          title: "Modifiez le nom, l&apos;URL et l&apos;ordre de cette sous-catégorie :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setIsActive,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { isActive && isActive.dialogType === KIND_OF_DELETE && isActive.itemType === KIND_OF_SUBCATEGORY && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_DELETE,
          datasType: KIND_OF_SUBCATEGORY,
          title: "Êtes-vous sûr de vouloir Delete cette sous-catégorie ?",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setIsActive,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { isActive && isActive.dialogType === KIND_OF_ADD && isActive.itemType === KIND_OF_TITLE && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_ADD,
          datasType: KIND_OF_TITLE,
          title: "Choisissez le nom, l'URL et l'ordre de ce nouveau titre :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setIsActive,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { isActive && isActive.dialogType === KIND_OF_UPDATE && isActive.itemType === KIND_OF_TITLE && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_UPDATE,
          datasType: KIND_OF_TITLE,
          title: "Modifiez le nom, l&apos;URL et l&apos;ordre de ce titre :",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setIsActive,
          selectedCategory: selectedCategory,
          setSelectCategory: setSelectedCategory,
          selectedSubCategoryId: selectedSubCategoryId,
          setSelectSubCategoryId: setSelectedSubCategoryId,
          selectedTitleId: selectedTitleId,
          setSelectTitleId: setSelectedTitleId,
        }
        )
      )}

      { isActive && isActive.dialogType === KIND_OF_DELETE && isActive.itemType === KIND_OF_TITLE && (
        SubmitUpdateDeleteContainer
        ({
          dialogType: KIND_OF_DELETE,
          datasType: KIND_OF_TITLE,
          title: "Êtes-vous sûr de vouloir Delete ce titre ?",
          name: name,
          setName: setName,
          order: order,
          setOrder: setOrder,
          url: url,
          setUrl: setUrl,
          setDoing: setIsActive,
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
