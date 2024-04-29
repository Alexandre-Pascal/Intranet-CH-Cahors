import { useState, useEffect } from "react";
import {
  DataList, kindOfDatas, kindOfDialog, dataObjectAddSubCategory, dataObjectAddTitle, dataObjectUpdateCategory,
  dataObjectUpdateSubCategory, dataObjectUpdateTitle, dataObjectDeleteCategory, dataObjectDeleteSubCategory,
  dataObjectDeleteTitle,
  article,
} from "@/app/lib/utils/types";

import styles from "./styles.module.css";
import Image from "next/image";
import { ADD, UPDATE, DELETE, CATEGORY, SUBCATEGORY, TITLE } from "@/app/lib/utils/constantes";
import { useRouter } from "next/navigation";

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
  const [articleLinked, setArticleLinked] = useState<article | null>(null);

  const [isActive, setIsActive] = useState<{itemType: kindOfDatas, dialogType: kindOfDialog}>({ itemType: "None", dialogType: "None" });

  const [length, setLength] = useState(1);

  const titleHeight = 65 / length; // Calcul de la hauteur totale des titres

  const router = useRouter();

  useEffect(() => {
    setLength(Object.keys(datas).length);
    setdataList(datas); // Mettre à jour la liste des catégories
    if (Object.keys(datas).length > 0){
      const selectedIndex = Object.values(datas).findIndex(item => item.category_id === selectedCategory?.category_id);
      setSelectedCategory(datas[selectedCategory ? selectedIndex : 0]);
    }
  }, [datas, selectedCategory]);

  const itemAction = (
    dialogType: kindOfDialog,
    itemType: kindOfDatas,
    dataObjectAddSubCategory?: dataObjectAddSubCategory,
    dataObjectAddTitle? : dataObjectAddTitle,
    dataObjectUpdateCategory? : dataObjectUpdateCategory,
    dataObjectUpdateSubCategory? : dataObjectUpdateSubCategory,
    dataObjectUpdateTitle? : dataObjectUpdateTitle,
    dataObjectDeleteCategory? : dataObjectDeleteCategory,
    dataObjectDeleteSubCategory? : dataObjectDeleteSubCategory,
    dataObjectDeleteTitle? : dataObjectDeleteTitle
  ) => {
    switch (dialogType) {
    case ADD:
      switch (itemType) {
      case CATEGORY:
        setIsActive({ dialogType : ADD, itemType:CATEGORY });
        break;
      case SUBCATEGORY:
        if (dataObjectAddSubCategory){
          setIsActive({ dialogType : ADD, itemType:SUBCATEGORY });
          setSelectedCategory(dataObjectAddSubCategory?.selectedCategory);
        }
        break;
      case TITLE:
        if (dataObjectAddTitle){
          setIsActive({ dialogType : ADD, itemType:TITLE });
          setSelectedSubCategoryId(dataObjectAddTitle?.selectedSubCategoryId);
        }
        break;
      }
      break;
    case UPDATE:
      switch (itemType) {
      case CATEGORY:
        if (dataObjectUpdateCategory){
          setIsActive({ dialogType : UPDATE, itemType:CATEGORY });
          setSelectedCategory(dataObjectUpdateCategory.selectedCategory);
          setName(dataObjectUpdateCategory.name);
          setOrder(dataObjectUpdateCategory.order);
        }
        break;
      case SUBCATEGORY:
        if (dataObjectUpdateSubCategory){
          setIsActive({ dialogType : UPDATE, itemType:SUBCATEGORY });
          setSelectedSubCategoryId(dataObjectUpdateSubCategory.selectedSubCategoryId);
          setName(dataObjectUpdateSubCategory.name);
          setUrl(dataObjectUpdateSubCategory.url);
          setOrder(dataObjectUpdateSubCategory.order);
        }
        break;
      case TITLE:
        if (dataObjectUpdateTitle){
          setIsActive({ dialogType : UPDATE, itemType:TITLE });
          setSelectedSubCategoryId(dataObjectUpdateTitle.selectedSubCategoryId);
          setSelectedTitleId(dataObjectUpdateTitle.selectedTitleId);
          setName(dataObjectUpdateTitle.name);
          setUrl(dataObjectUpdateTitle.url);
          setOrder(dataObjectUpdateTitle.order);
        }
        break;
      }
      break;
    case DELETE:
      switch (itemType) {
      case CATEGORY:
        if (dataObjectDeleteCategory){
          setIsActive({ dialogType : DELETE, itemType:CATEGORY });
          setSelectedCategory(dataObjectDeleteCategory.selectedCategory);
        }
        break;
      case SUBCATEGORY:
        if (dataObjectDeleteSubCategory){
          setIsActive({ dialogType : DELETE, itemType:SUBCATEGORY });
          setSelectedSubCategoryId (dataObjectDeleteSubCategory.selectedSubCategoryId);
        }
        break;
      case TITLE:
        if (dataObjectDeleteTitle){
          setIsActive({ dialogType : DELETE, itemType:TITLE });
          setSelectedSubCategoryId(dataObjectDeleteTitle.selectedSubCategoryId);
          setSelectedTitleId(dataObjectDeleteTitle.selectedTitleId);
        }
        break;
      }
      break;
    }
  };

  return (
    <div className={styles.menu}>
      <a className={styles.button_page_maker} href={"/PageEditor/?CreateOrUpdate=create"}>Créer une nouvelle page</a>
      <div className={styles.list_main_categories}>
        {dataList && (Object.values(dataList)).map((category, index) => (
          <div className={styles.action_list}>
            <h1
              key={index}
              style={{ height: `${titleHeight}vh` }}
              className={
                selectedCategory === null && index === 0 ? styles.selectedCategory :
                  (selectedCategory !== undefined && selectedCategory?.category_id === category.category_id ?
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
                  () => itemAction(
                    UPDATE,
                    CATEGORY,
                    undefined,
                    undefined,
                     {
                       selectedCategory: category ,
                       name: category.category_name,
                       order: category.category_order,
                     } as dataObjectUpdateCategory
                  )
                }
              src={crayon} alt="crayon" width={32} height={32}
              />
            </a>
            <a>
              <Image className={styles.icon_action_list} onClick=
                {
                  () => itemAction(
                    DELETE,
                    CATEGORY,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    {
                      selectedCategory: category,
                    } as dataObjectDeleteCategory
                  )
                }
              src={poubelle} alt="poubelle" width={32} height={32}
              />
            </a>
          </div>
        ))}
        <a onClick={() => itemAction(ADD, CATEGORY)}>
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
                <a onClick={()=> itemAction(
                  ADD,
                  TITLE,
                  undefined,
                  {
                    selectedCategory: selectedCategory,
                    selectedSubCategoryId: subCategory.sub_category_id,
                  } as dataObjectAddTitle
                )}>
                  <Image className={styles.icon_action_list} src={plus} alt="plus" width={20} height={20} />
                </a>
                <a>
                  <Image className={styles.icon_action_list} onClick=
                    {
                      () => itemAction(
                        UPDATE,
                        SUBCATEGORY,
                        undefined,
                        undefined,
                        undefined,
                        {
                          selectedSubCategoryId: subCategory.sub_category_id,
                          name: subCategory.sub_category_name,
                          url: subCategory.sub_category_url,
                          order: subCategory.sub_category_order,
                        } as dataObjectUpdateSubCategory
                      )
                    }
                  src={crayon} alt="crayon" width={20} height={20}
                  />
                </a>
                <a>
                  <Image className={styles.icon_action_list}
                    onClick=
                      {
                        () => itemAction(
                          DELETE,
                          SUBCATEGORY,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          {
                            selectedSubCategoryId: subCategory.sub_category_id,
                          } as dataObjectDeleteSubCategory
                        )
                      }
                    src={poubelle} alt="poubelle" width={20} height={20} />
                </a>
              </div>
              <ul>
                {subCategory.titles.map((title, index) => (
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
                        <Image className={styles.icon_action_list} onClick={() => itemAction(
                          UPDATE,
                          TITLE,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          {
                            selectedSubCategoryId:subCategory.sub_category_id,
                            selectedTitleId: title.title_id,
                            name: title.title_name,
                            url: title.title_url,
                            order: title.title_order,
                          } as dataObjectUpdateTitle
                        )
                        }
                        src={crayon} alt="crayon" width={20} height={20} />
                      </a>
                      <a>
                        <Image className={styles.icon_action_list} onClick={() => itemAction(
                          DELETE,
                          TITLE,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          {
                            selectedSubCategoryId: subCategory.sub_category_id,
                            selectedTitleId: title.title_id,
                          } as dataObjectDeleteTitle
                        )
                        }
                        src={poubelle} alt="poubelle" width={20} height={20} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <a onClick={() => itemAction(
            ADD,
            SUBCATEGORY,
            {
              selectedCategory: selectedCategory,
            },
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
          )}>
            <Image className={styles.icon_action_list} src={plus} alt="plus" width={32} height={32} />
          </a>
        </ul>
      </div>

      {isActive ? (
        isActive.dialogType === ADD ? (
          isActive.itemType === CATEGORY ? (
            <SubmitUpdateDeleteContainer
              dialogType={ADD}
              datasType={CATEGORY}
              title="Choisissez le nom et l'ordre de cette nouvelle catégorie :"
              name={name}
              setName={setName}
              order={order}
              setOrder={setOrder}
              setDoing={setIsActive}
              router={router}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ) : isActive.itemType === SUBCATEGORY ? (
            <SubmitUpdateDeleteContainer
              dialogType={ADD}
              datasType={SUBCATEGORY}
              title="Choisissez le nom, l'URL et l'ordre de cette nouvelle sous-catégorie :"
              name={name}
              setName={setName}
              order={order}
              setOrder={setOrder}
              url={url}
              setUrl={setUrl}
              setDoing={setIsActive}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              router={router}
              dataList={dataList}
              articleLinked={articleLinked}
              setArticleLinked={setArticleLinked}
            />
          ) : (
            <SubmitUpdateDeleteContainer
              dialogType={ADD}
              datasType={TITLE}
              title="Choisissez le nom, l'URL et l'ordre de ce nouveau titre :"
              name={name}
              setName={setName}
              order={order}
              setOrder={setOrder}
              url={url}
              setUrl={setUrl}
              setDoing={setIsActive}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategoryId={selectedSubCategoryId}
              router={router}
              articleLinked={articleLinked}
              setArticleLinked={setArticleLinked}
            />
          )
        ) : isActive.dialogType === UPDATE ? (
          isActive.itemType === CATEGORY ? (
            <SubmitUpdateDeleteContainer
              dialogType={UPDATE}
              datasType={CATEGORY}
              title="Modifiez le nom et l'ordre de cette catégorie :"
              name={name}
              setName={setName}
              order={order}
              setOrder={setOrder}
              setDoing={setIsActive}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              router={router}
            />
          ) : isActive.itemType === SUBCATEGORY ? (
            <SubmitUpdateDeleteContainer
              dialogType={UPDATE}
              datasType={SUBCATEGORY}
              title="Modifiez le nom, l'URL et l'ordre de cette sous-catégorie :"
              name={name}
              setName={setName}
              order={order}
              setOrder={setOrder}
              url={url}
              setUrl={setUrl}
              setDoing={setIsActive}
              selectedCategory={selectedCategory}
              selectedSubCategoryId={selectedSubCategoryId}
              setSelectedCategory={setSelectedCategory}
              router={router}
              articleLinked={articleLinked}
              setArticleLinked={setArticleLinked}
            />
          ) : (
            <SubmitUpdateDeleteContainer
              dialogType={UPDATE}
              datasType={TITLE}
              title="Modifiez le nom, l'URL et l'ordre de ce titre :"
              name={name}
              setName={setName}
              order={order}
              setOrder={setOrder}
              url={url}
              setUrl={setUrl}
              setDoing={setIsActive}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategoryId={selectedSubCategoryId}
              selectedTitleId={selectedTitleId}
              router={router}
              articleLinked={articleLinked}
              setArticleLinked={setArticleLinked}
            />
          )
        ) : isActive.dialogType === DELETE ? (
          isActive.itemType === CATEGORY ? (
            <SubmitUpdateDeleteContainer
              dialogType={DELETE}
              datasType={CATEGORY}
              title="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
              setDoing={setIsActive}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              router={router}
            />
          ) : isActive.itemType === SUBCATEGORY ? (
            <SubmitUpdateDeleteContainer
              dialogType={DELETE}
              datasType={SUBCATEGORY}
              title="Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?"
              setDoing={setIsActive}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategoryId={selectedSubCategoryId}
              router={router}
            />
          ) : (
            <SubmitUpdateDeleteContainer
              dialogType={DELETE}
              datasType={TITLE}
              title="Êtes-vous sûr de vouloir supprimer ce titre ?"
              setDoing={setIsActive}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategoryId={selectedSubCategoryId}
              selectedTitleId={selectedTitleId}
              router={router}
            />
          )
        ) : null
      ) : null}
    </div>
  );
}
