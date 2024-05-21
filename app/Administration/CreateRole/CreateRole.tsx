"use client";

import { RoleObject } from "@/app/lib/utils/types";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";

export default function CreateRole() {

  const [categories, setCategories] = useState<any[]>([]);

  const [subCategories, setSubCategories] = useState<string[]>([]);

  const [role, setRole] = useState<RoleObject>({ name: "", pages: [], read: [], edit: [] });

  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    const tempArray: any[] = [];
    const fetchCategories = async() => {
      try {
        const response = await fetch("/api/categories");
        const result = await response.json();
        result.data.forEach((categorie: any) => {
          tempArray.push(categorie);
        }
        );
        // console.log("tempArray",JSON.stringify(tempArray));
        setCategories(tempArray);
      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchCategories();
  }, []);

  if (categories) {
    // alert(categories);
  }

  useEffect(() => {
    const checkBox = document?.querySelectorAll("input[type=\"checkbox\"]");
    if (checkBox) {
      checkBox.forEach((check) => {
        check.addEventListener("change", (event) => {
          // alert("checkBox");
          setModified(true);
        });
      });
    }
  }
  );

  useEffect(() => {
    const checkBoxReadAll = document.getElementsByName("CheckAllRead");

    checkBoxReadAll.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {

        const target = event.target as HTMLInputElement;

        if (target.checked) {

          const checkBoxRead = Array.from(document.querySelectorAll(`input[name="read"][id="${target.id}"]`)) as HTMLInputElement[];
          checkBoxRead.forEach((check) => {
            const index = role.pages?.indexOf(check.className) ?? -1;
            role.read?.splice(index, 1, true);
            setRole({ ...role });

            //check toutes les checkbox read
            check.checked = true;
          });
        }
        else{

          const checkBoxRead = Array.from(document.querySelectorAll(`input[name="read"][id="${target.id}"]`)) as HTMLInputElement[];
          checkBoxRead.forEach((check) => {
            const index = role.pages?.indexOf(check.className) ?? -1;
            role.read?.splice(index, 1, false);
            setRole({ ...role });

            //uncheck toutes les checkbox read
            check.checked = false;
          });

        }
      });
    });

    const checkBoxEditAll = document.getElementsByName("CheckAllEdit");

    checkBoxEditAll.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
          const checkBoxEdit = Array.from(document.querySelectorAll(`input[name="edit"][id="${target.id}"]`)) as HTMLInputElement[];
          checkBoxEdit.forEach((check) => {
            const index = role.pages?.indexOf(check.className) ?? -1;
            role.edit?.splice(index, 1, true);
            setRole({ ...role });

            //check toutes les checkbox edit
            check.checked = true;
          });
        }
        else{
          const checkBoxEdit = Array.from(document.querySelectorAll(`input[name="edit"][id="${target.id}"]`)) as HTMLInputElement[];
          checkBoxEdit.forEach((check) => {
            const index = role.pages?.indexOf(check.className) ?? -1;
            role.edit?.splice(index, 1, false);
            setRole({ ...role });

            //uncheck toutes les checkbox edit
            check.checked = false;
          });
        }
      });
    });

    const checkBoxRead = document.querySelectorAll("input[name=\"read\"]");
    checkBoxRead.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const index = role.pages?.indexOf(target.className) ?? -1;
        role.read?.splice(index, 1, target.checked);
        setRole({ ...role });
      });
    });

    const checkBoxEdit = document.querySelectorAll("input[name=\"edit\"]");
    checkBoxEdit.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const index = role.pages?.indexOf(target.className) ?? -1;
        role.edit?.splice(index, 1, target.checked);
        setRole({ ...role });
      });
    });
  }
  );

  useEffect(() => {
    console.log("role",role);
  }, [role]);

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    role.name = (document.getElementById("role") as HTMLInputElement).value;
    console.log("role définitif",role);
  };

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }
    //je veux charger la liste de mes pages dans role
    categories.forEach((categorie) => {
      categorie.sub_categories.forEach((subCategorie : any) => {
        role.pages?.push(subCategorie.sub_category_name);
        role.read?.push(false);
        role.edit?.push(false);
      });
    });

  }, [categories]
  );

  return (
    <div>
      <h1>Création de rôle</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="role" id="role" placeholder="Nom du rôle" />
        <div className={styles.list_sous_cat}>
          {categories?.length > 0 && categories?.map((categorie: any, index: any) => (
            <div key={index}>
              <h3>{categorie.category_name}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Sous-catégories</th>
                    <th>Lecture</th>
                    <th>Écriture</th>
                  </tr>
                  <tr>
                    <th>Tout cocher</th>
                    <th><input type="checkbox" name="CheckAllRead" id={categorie.category_id} /></th>
                    <th><input type="checkbox" name="CheckAllEdit" id={categorie.category_id} /></th>
                  </tr>
                </thead>
                <tbody>
                  {categorie.sub_categories.length > 0 && categorie.sub_categories.map((subCategorie : any, index : any) => (
                    <tr key={index}>
                      <td>{subCategorie.sub_category_name}</td>
                      <td><input type="checkbox" name="read" id={subCategorie.category_id} className={subCategorie.sub_category_name} /></td>
                      <td><input type="checkbox" name="edit" id={subCategorie.category_id} className={subCategorie.sub_category_name} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}