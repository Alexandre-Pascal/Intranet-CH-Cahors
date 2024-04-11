import { useState, useEffect } from "react";
import { DataList } from "@/app/utils/types";
import styles from "./styles.module.css";

export default function ListeTitres(datas : DataList[]) {
  const [dataList, setdataList] = useState<DataList[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    // Mettre à jour les titres chargés avec les titres reçus en props
    setdataList(datas);
  }, [datas]); // Rafraîchir les titres chargés lorsque les titres en props changent

  // alert("dataList: " + JSON.stringify(dataList));

  return (
    <div className={styles.menu}>
      <div className={styles.list_main_categories}>
        {Object.keys(dataList) && Object.values(dataList).map((category, index) => (
          <h1 key={index} className=
            {
              selectedCategoryId === category.category_id - 1 ?
                styles.selectedCategory : styles.notSelectedCategory
            }
          onClick={() => setSelectedCategoryId(category.category_id - 1)
          }>
            {category.category_name}
          </h1>
        ))}
      </div>
      <div className={styles.list_sub_categories_and_titles}>
        <ul>
          {Object.keys(dataList) && selectedCategoryId !== null
          && dataList[selectedCategoryId]?.sub_categories?.map((subCategory, index) =>
            (
              <li key={index} className={styles.sub_categorie}>
                {subCategory.sub_category_url ? (
                  <a href={subCategory.sub_category_url}>
                    <h2>{subCategory.sub_category_name}</h2>
                  </a>) : (
                  <h2>{subCategory.sub_category_name}</h2>
                )
                }
                <ul>
                  {subCategory.titles.map((title, index) => (
                    <li>
                      {title.title_url ? (
                        <a href={title.title_url}>
                          <h3 key={index}>{title.title_name}</h3>
                        </a> ) : (
                        <h3 key={index}>{title.title_name}</h3>
                      )
                      }
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
