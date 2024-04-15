import { useState, useEffect } from "react";
import { DataList, SubCategory, Title, NewDataList, NewSubCategory, NewTitle } from "@/app/utils/types";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

import crayon from "../../../../assets/icons/crayon.png";
import plus from "../../../../assets/icons/plus.png";
import poubelle from "../../../../assets/icons/poubelle.png";

export default function ListeTitres(datas: DataList[]) {
  const [dataList, setdataList] = useState<DataList[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<DataList | null>(null); // Ajouter un état pour stocker la catégorie sélectionnée

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0); //
  const [addingSubCategory, setAddingSubCategory] = useState(false); //
  const [addingTitle, setAddingTitle] = useState(false);//

  const [newSubCategoryName, setNewSubCategoryName] = useState(""); //
  const [newSubCategoryUrl, setNewSubCategoryUrl] = useState(""); //
  const [newSubCategoryOrder, setNewSubCategoryOrder] = useState(0); //
  const [newTitleName, setNewTitleName] = useState("");
  const [newTitleUrl, setNewTitleUrl] = useState("");
  const [newTitleOrder, setNewTitleOrder] = useState(0);

  const [updatingSubCategory, setupdatingSubCategory] = useState(false);

  const [deletingSubCategory, setDeletingSubCategory] = useState(false);
  const [deletingSubCategoryId, setDeletingSubCategoryId] = useState(0);

  const [selectedTitleId, setSelectedTitleId] = useState(0);
  const [updatingTitle, setUpdatingTitle] = useState(false);

  const [deletingTitle, setDeletingTitle] = useState(false);
  const [deletingTitleId, setDeletingTitleId] = useState(0);

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

  // Ajouter une nouvelle sous-catégorie
  const addSubCategory = () => {
    setAddingSubCategory(true);
  };

  // Ajouter un nouveau titre
  const addTitle = () => {
    setAddingTitle(true);
  };

  const deleteSubCategory = (id : number) => {
    setDeletingSubCategory(true);
    setDeletingSubCategoryId(id);
  };

  const deleteTitle = (id : number) => {
    setDeletingTitle(true);
    setDeletingTitleId(id);
  };

  const updateSubCategory = (id : number, name : string, url : string, order : number) =>{
    setSelectedSubCategoryId(id);
    setNewSubCategoryName(name);
    setNewSubCategoryUrl(url);
    setNewSubCategoryOrder(order);
    setupdatingSubCategory(true);
  };

  const updateTitle = (id : number, name : string, url : string, order : number) =>{
    setSelectedTitleId(id);
    setNewTitleName(name);
    setNewTitleUrl(url);
    setNewTitleOrder(order);
    setUpdatingTitle(true);
  };

  // Soumettre le formulaire d'ajout de nouvelle sous-catégorie
  const handleSubmitSubCategory = async(event: React.FormEvent) => {
    event.preventDefault();
    // Ajouter la nouvelle sous-catégorie à la liste des données
    const newSubCategory: NewSubCategory = {
      sub_category_name: newSubCategoryName,
      sub_category_url: newSubCategoryUrl,
      sub_category_order: newSubCategoryOrder,
    };
    try{
      await fetch(`api/categories/${selectedCategoryId}/subcategories/add-subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubCategory),
      });
    }
    catch {
      throw new Error("Erreur lors de l'ajout de la sous-catégorie");
    }
    router.refresh();
    setNewSubCategoryName("");
    setNewSubCategoryUrl("");
    setNewSubCategoryOrder(0);
    setAddingSubCategory(false);
    setSelectedCategory(dataList[0]);
  };

  const handleUpdateSubCategory = async(event: React.FormEvent) => {
    event.preventDefault();
    const updatedSubCategory: NewSubCategory = {
      sub_category_name: newSubCategoryName,
      sub_category_url: newSubCategoryUrl,
      sub_category_order: newSubCategoryOrder,
    };
    try {
      await fetch(`api/categories/${selectedCategoryId}/subcategories/${selectedSubCategoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSubCategory),
      });
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour de la sous-catégorie");
    }
    router.refresh();
    setNewSubCategoryName("");
    setNewSubCategoryUrl("");
    setNewSubCategoryOrder(0);
    setupdatingSubCategory(false);
  };

  const handleDeleteSubCategory = async() => {
    try {
      await fetch(`api/categories/${selectedCategoryId}/subcategories/${deletingSubCategoryId}`,
        {
          method: "DELETE",
        });
    }
    catch {
      throw new Error("Erreur lors de la suppression de la sous-catégorie");
    }
    router.refresh();
    setDeletingSubCategoryId(0);
  };

  // Soumettre le formulaire d'ajout de nouveau titre
  const handleSubmitTitle = async(event: React.FormEvent) => {
    event.preventDefault();
    // Ajouter le nouveau titre à la liste des données
    const newTitle: NewTitle = {
      title_name: newTitleName,
      title_url: newTitleUrl,
      title_order: newTitleOrder,
    };

    try {
    //await fetch(`api/categories/${selectedCategoryId}/subcategories/add-subcategories`, {
      await fetch(`api/categories/${selectedCategoryId}/subcategories/${selectedSubCategoryId}/titles/add-title`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTitle),
        });
    }
    catch {
      throw new Error("Erreur lors de l'ajout du titre");
    }
    router.refresh();
    setNewTitleName("");
    setNewTitleUrl("");
    setNewTitleOrder(0);
    setAddingTitle(false);
  };

  const handleUpdateTitle = async(event: React.FormEvent) => {
    event.preventDefault();
    const updatedTitle: NewTitle = {
      title_name: newTitleName,
      title_url: newTitleUrl,
      title_order: newTitleOrder,
    };
    try {
      await fetch(`api/categories/${selectedCategoryId}/subcategories/${selectedSubCategoryId}/titles/${selectedTitleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTitle),
      });
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour du titre");
    }
    router.refresh();
    setNewTitleName("");
    setNewTitleUrl("");
    setNewTitleOrder(0);
    setAddingTitle(false);
  };

  const handleDeleteTitle = async() => {
    try {
      await fetch(`api/categories/${selectedCategoryId}/subcategories/${selectedSubCategoryId}/titles/${deletingTitleId}`,
        {
          method: "DELETE",
        });
    }
    catch {
      throw new Error("Erreur lors de la suppression du titre");
    }
    router.refresh();
    setDeletingTitleId(0);
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
                setSelectedCategoryId(category.category_id);
                setSelectedCategory(category);
                // alert(JSON.stringify(selectedCategory));
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
                    deleteCategory(category.category_id)
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
          {dataList && selectedCategoryId !== null &&
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
                        <Image className={styles.icon_action_list} onClick={() => updateTitle(title.title_id, title.title_name, title.title_url, title.title_order)} src={crayon} alt="crayon" width={20} height={20} />
                      </a>
                      <a>
                        <Image className={styles.icon_action_list} onClick={() => deleteTitle(title.title_id)} src={poubelle} alt="poubelle" width={20} height={20} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <a onClick={() => {addSubCategory(); {/*alert(JSON.stringify(selectedCategory));*/}}}>
            <Image className={styles.icon_action_list} src={plus} alt="plus" width={32} height={32} />
          </a>
        </ul>
      </div>

      {updatingSubCategory && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <h2>Modifiez le nom, l&apos;URL et l&apos;ordre de cette sous-catégorie :</h2>
            <form onSubmit={handleUpdateSubCategory}>
              <div className={styles.container_input}>
                <h3>Nom : </h3>
                <input
                  type="text"
                  placeholder="Nom de la sous-catégorie"
                  value={newSubCategoryName}
                  onChange={(e) => setNewSubCategoryName(e.target.value)}
                />
                <h3>URL : </h3>
                <input
                  type="text"
                  placeholder="URL de la sous-catégorie"
                  value={newSubCategoryUrl}
                  onChange={(e) => setNewSubCategoryUrl(e.target.value)}
                />
                <h3>Ordre : </h3>
                <input
                  type="number"
                  placeholder="Ordre de la sous-catégorie"
                  value={newSubCategoryOrder}
                  onChange={(e) => setNewSubCategoryOrder(parseInt(e.target.value))}
                />
              </div>
              <div className={styles.container_buttons}>
                <button onClick=
                  {
                    () =>
                    {
                      setupdatingSubCategory(false);
                      setNewSubCategoryName("");
                      setNewSubCategoryUrl("");
                      setNewSubCategoryOrder(0);
                    }
                  }
                >Annuler</button>
                <button type="submit">Modifier</button>
              </div>
            </form>
          </div>
        </div>
      )
      }

      {
        updatingTitle && (
          <div className={styles.container_dialog}>
            <div className={styles.dialog}>
              <h2>Modifiez le nom, l&apos;URL et l&apos;ordre de ce titre :</h2>
              <form onSubmit={handleUpdateTitle}>
                <div className={styles.container_input}>
                  <h3>Nom : </h3>
                  <input
                    type="text"
                    placeholder="Nom du titre"
                    value={newTitleName}
                    onChange={(e) => setNewTitleName(e.target.value)}
                  />
                  <h3>URL : </h3>
                  <input
                    type="text"
                    placeholder="URL du titre"
                    value={newTitleUrl}
                    onChange={(e) => setNewTitleUrl(e.target.value)}
                  />
                  <h3>Ordre : </h3>
                  <input
                    type="number"
                    placeholder="Ordre du titre"
                    value={newTitleOrder}
                    onChange={(e) => setNewTitleOrder(parseInt(e.target.value))}
                  />
                </div>
                <div className={styles.container_buttons}>
                  <button onClick=
                    {
                      () =>
                      {
                        setUpdatingTitle(false);
                        setNewTitleName("");
                        setNewTitleUrl("");
                        setNewTitleOrder(0);
                      }
                    }
                  >Annuler</button>
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
            <h2>Choisissez le nom, l&apos;URL et l&apos;ordre de cette nouvelle sous-catégorie :</h2>
            <form onSubmit={handleSubmitSubCategory}>
              <div className={styles.container_input}>
                <h3>Nom : </h3>
                <input
                  type="text"
                  placeholder="Nom de la sous-catégorie"
                  value={newSubCategoryName}
                  onChange={(e) => setNewSubCategoryName(e.target.value)}
                />
                <h3>URL : </h3>
                <input
                  type="text"
                  placeholder="URL de la sous-catégorie"
                  value={newSubCategoryUrl}
                  onChange={(e) => setNewSubCategoryUrl(e.target.value)}
                />
                <h3>Ordre : </h3>
                <input
                  type="number"
                  placeholder="Ordre de la sous-catégorie"
                  value={newSubCategoryOrder}
                  onChange={(e) => setNewSubCategoryOrder(parseInt(e.target.value))}
                />
              </div>
              <div className={styles.container_buttons}>
                <button onClick={() => setAddingSubCategory(false)}>Annuler</button>
                <button type="submit">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Boîte de dialogue pour ajouter un nouveau titre */}
      {addingTitle && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <h2>Choisissez le nom, l&apos;URL et l&apos;ordre de ce nouveau titre :</h2>
            <form onSubmit={handleSubmitTitle}>
              <div className={styles.container_input}>
                <h3>Nom : </h3>
                <input
                  type="text"
                  placeholder="Nom du titre"
                  value={newTitleName}
                  onChange={(e) => setNewTitleName(e.target.value)}
                />
                <h3>URL : </h3>
                <input
                  type="text"
                  placeholder="URL du titre"
                  value={newTitleUrl}
                  onChange={(e) => setNewTitleUrl(e.target.value)}
                />
                <h3>Ordre : </h3>
                <input
                  type="number"
                  placeholder="Ordre du titre"
                  value={newTitleOrder}
                  onChange={(e) => setNewTitleOrder(parseInt(e.target.value))}
                />
              </div>
              <div className={styles.container_buttons}>
                <button onClick={() => setAddingTitle(false)}>Annuler</button>
                <button type="submit">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )
      }

      {deletingSubCategory && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <h2>Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?</h2>
            <div className={styles.container_buttons}>
              <button onClick={() => setDeletingSubCategory(false)}>Annuler</button>
              <button onClick={() => {handleDeleteSubCategory(); setDeletingSubCategory(false);}}>Confirmer</button>
            </div>
          </div>
        </div>
      )}

      {deletingTitle && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <h2>Êtes-vous sûr de vouloir supprimer ce titre ?</h2>
            <div className={styles.container_buttons}>
              <button onClick={() => setDeletingTitle(false)}>Annuler</button>
              <button onClick={() => {handleDeleteTitle(); setDeletingTitle(false);}}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
