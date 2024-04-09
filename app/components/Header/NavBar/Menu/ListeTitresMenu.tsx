import { useState, useEffect } from "react";
import { datasList } from "@/app/utils/types";
import styles from "./styles.module.css";

export default function ListeTitres(datas : datasList) {
  const [loadedTitles, setLoadedTitles] = useState<datasList>(
    {
      mainCategories: [],
      categoryData: { // Initialisation de la propriété categoryData avec un objet vide
        category_name: "",
        sub_categories: [],
      },
    }
  );

  useEffect(() => {
    // Mettre à jour les titres chargés avec les titres reçus en props
    setLoadedTitles(datas);
  }, [datas]); // Rafraîchir les titres chargés lorsque les titres en props changent

  return (
    <div className={styles.menu}>
      <div className={styles.list_main_categories}>
        {loadedTitles.mainCategories !== undefined && loadedTitles.mainCategories.map((title, index) => (
          <h1 key={index}>{title}</h1>
        ))}
      </div>
      <div className={styles.list_sub_categories_and_titles}>
        <ul>
          {loadedTitles.categoryData !== undefined && loadedTitles.categoryData.sub_categories.map((sub_categorie) => (
            <li key={sub_categorie.sub_category_id}>
              <h2>{sub_categorie.sub_category_name}</h2>
              <ul>
                {sub_categorie.titles.map(title => (
                  <li><h3 key={title.title_id}>{title.title_name}</h3></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
