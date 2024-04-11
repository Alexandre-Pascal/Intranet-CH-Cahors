import { useState, useEffect } from "react";
import { DataList } from "@/app/utils/types";
import styles from "./styles.module.css";
import Image from "next/image";

import crayon from "../../../../assets/icons/crayon.png";
import plus from "../../../../assets/icons/plus.png";
import poubelle from "../../../../assets/icons/poubelle.png";

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
            <a href=""><Image className={styles.icon_action_list} src={crayon} alt="crayon" width={32} height={32}/></a>
            <a href=""><Image className={styles.icon_action_list} src={poubelle} alt="poubelle" width={32} height={32}/></a>
          </div>
        ))}
        <a href=""><Image className={styles.icon_action_list} style={{ marginInlineStart : "2vw" }} src={plus} alt="plus" width={32} height={32}/></a>
      </div>
      <div className={styles.list_sub_categories_and_titles}>
        <ul>
          {Object.keys(dataList) && selectedCategoryId !== null
          && dataList[selectedCategoryId]?.sub_categories?.map((subCategory, index) =>
            (
              <li key={index} className={styles.sub_categorie}>
                <div className={styles.action_list}>
                  {subCategory.sub_category_url ? (
                    <a href={subCategory.sub_category_url}>
                      <h2>{subCategory.sub_category_name}</h2>
                    </a>) : (
                    <h2>{subCategory.sub_category_name}</h2>
                  )
                  }
                  <a href=""><Image className={styles.icon_action_list} src={crayon} alt="crayon" width={20} height={20}/></a>
                  <a href=""><Image className={styles.icon_action_list} src={plus} alt="plus" width={20} height={20} /></a>
                  <a href=""><Image className={styles.icon_action_list} src={poubelle} alt="poubelle" width={20} height={20} /></a>
                </div>
                <ul>
                  {subCategory.titles.map((title, index) => (
                    <li>
                      <div className={styles.action_list}>
                        {title.title_url ? (
                          <a href={title.title_url}>
                            <h3 key={index}>{title.title_name}</h3>
                          </a> ) : (
                          <h3 key={index}>{title.title_name}</h3>
                        )
                        }
                        <a href=""><Image className={styles.icon_action_list} src={crayon} alt="crayon" width={20} height={20}/></a>
                        <a href=""><Image className={styles.icon_action_list} src={poubelle} alt="poubelle" width={20} height={20}/></a>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          <a href=""><Image className={styles.icon_action_list} src={plus} alt="plus" width={32} height={32}/></a>
        </ul>
      </div>
    </div>
  );
}
