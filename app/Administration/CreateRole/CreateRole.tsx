"use client";

import generateTitleId from "@/app/lib/utils/generateId";
import getCategoryIdByName from "@/app/lib/utils/getCategoryIdByName";
import { RoleObject } from "@/app/lib/utils/types";
import { useState, useEffect, use } from "react";

export default function CreateRole() {

  const [categories, setCategories] = useState<string[]>([]);
  const [categorie, setCategorie] = useState<string>("");
  const [categrorieId, setCategorieId] = useState<number>(0);

  const [subCategories, setSubCategories] = useState<string[]>([]);

  const [role, setRole] = useState<RoleObject>({ name: "", pages: [], read: [], edit: [] });

  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    const categories_temp : string[] = [];
    const fetchCategories = async() => {
      try {
        const response = await fetch("/api/categories?value=name");
        const data = await response.json();
        data.data.forEach((element: { category_name: string; }) => {
          categories_temp.push(element.category_name);
        });
        setCategories(categories_temp);
      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categorie === "") {
      return;
    }
    const getCategoryId = async() => {
      try {
        console.log("categorie",categorie);
        setRole({ ...role, name: categorie });
        const id = await getCategoryIdByName(categorie);
        setCategorieId(Number(id));
      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    getCategoryId();
  }, [categorie]);

  useEffect(() => {
    const subCategories_temp : string[] = [];
    const fetchSubCategories = async() => {
      console.log("categorie iddddd",categrorieId);

      try {
        const response = await fetch(`/api/categories/${categrorieId}/subcategories`);
        const data = await response.json();
        console.log(data.result);
        data.result.forEach((element: { sub_category_name: string; }) => {
          subCategories_temp.push(element.sub_category_name);
        });
        setSubCategories(subCategories_temp);
      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchSubCategories();
  }, [categrorieId]);

  if (categories) {
    // alert(categories);
  }

  useEffect(() => {
    const checkBox = document?.querySelectorAll("input[type=\"checkbox\"]");
    if (checkBox) {
      checkBox.forEach((check) => {
        check.addEventListener("change", (event) => {
          setModified(true);
        });
      });
    }
  }
  );

  useEffect(() => {
    if (modified == false) {
      return;
    }
    setModified(true);
    const checkBoxRead = document.querySelectorAll("input[name=\"read\"]");
    const checkBoxEdit = document.querySelectorAll("input[name=\"edit\"]");
    checkBoxRead.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        //si la page est déjà dans la liste
        //on la supprime pour la rajouter avec le nouveau niveau de lecture
        const index = role.pages?.indexOf(target.id) ?? -1;

        role.pages?.splice(index, 1, target.id);
        role.read?.splice(index, 1, target.checked);
        setRole({ ...role });
      });
    });
    checkBoxEdit.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const index = role.pages?.indexOf(target.id) ?? -1;

        role.pages?.splice(index, 1, target.id);
        role.edit?.splice(index, 1, target.checked);

        // role.pages?.push(target.id);
        // role.edit?.push(editLevel);
        setRole({ ...role });
      });
    });
  }, [modified]
  );

  useEffect(() => {
    console.log("role",role);
  }, [role]);

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();

  };

  useEffect(() => {
    if (subCategories.length === 0) {
      return;
    }
    //je veux charger la liste de mes pages dans role
    subCategories.forEach((subCategorie) => {
      role.pages?.push(subCategorie);
      role.read?.push(false);
      role.edit?.push(false);
    });

  }, [subCategories]
  );

  return (
    <div>
      <h1>Création de rôle</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="role" id="role" placeholder="Nom du rôle" />
        <select
          name="categorie"
          id="categorie"
          onChange={(event) => {
            const categorieId = event.target.value;
            console.log(categorieId);
            setCategorie(categorieId);
          }}
        >
          <option value="">Choisissez une catégorie</option>
          {categories.length > 0 && categories.map((categorie, index) => (
            <option key={index} value={categorie}>{categorie}</option>
          ))}
        </select>

        <div>
          <table>
            <thead>
              <tr>
                <th>Sous-catégories</th>
                <th>Lecture</th>
                <th>Écriture</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.length > 0 && subCategories.map((subCategorie, index) => (
                <tr key={index}>
                  <td>{subCategorie}</td>
                  <td><input type="checkbox" name="read" id={subCategorie} /></td>
                  <td><input type="checkbox" name="edit" id={subCategorie} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}