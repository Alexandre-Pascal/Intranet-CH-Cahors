"use client";

import { DataList, RoleObject, RoleObjectDb, SubCategory } from "@/app/lib/utils/types";
import { useState, useEffect, ChangeEvent } from "react";
import styles from "./styles.module.css";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/lib/utils/AppContext";
import notAuthorised from "@/app/components/Header/notAuthorised";
import { Spinner } from "@/app/components/ui/Spinner";

export default function ManageRole() {
  const [categories, setCategories] = useState<any[]>([]);
  const [role, setRole] = useState<RoleObject>({ name: "", pages: [], hide: [], edit: [] });
  const [roles, setRoles] = useState<RoleObjectDb[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const { session, loading } = useAppContext();

  const searchParams = useSearchParams();
  const kind = searchParams.get("kind");

  useEffect(() => {
    // Tester si l'utilisateur est autorisé à accéder à cette page
    if (!loading) {
      if (session?.role == undefined || session.role !== "Administrateur") {
        notAuthorised();
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    }
  }, [loading, session]);

  useEffect(() => {
    // Récupérer les rôles existants
    const fetchRoles = async() => {
      if (kind == "update") {
        try {
          const response = await fetch("/api/roles");
          const result = await response.json();
          console.log(result);
          setRoles(result.roles);
        } catch (error) {
          console.error("Erreur:", error);
        }
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    // Récupérer les catégories et sous-catégories
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

  useEffect(() => {
    // Gérer les événements de changement des cases à cocher

    // Vérifier si la case tout cocher cacher est cochée
    const checkBoxHideAll = document.getElementsByName("CheckAllHide");
    checkBoxHideAll.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement; // la case tout cocher cacher
        const category_id = target.id;
        const category = categories.find((categorie : any) => categorie.category_id.toString() === category_id);

        // Pour chaque sous-catégorie de la catégorie
        category.sub_categories.forEach((sub_category : SubCategory) => {
          const index = role.pages?.indexOf(sub_category.sub_category_name) ?? -1;

          // Si la case tout cocher "Caché" est cochée
          if (target.checked) {
            // On coche toutes les cases cacher
            role.hide?.splice(index, 1, true);
            setRole({ ...role });

            // On coche toutes les cases cacher
            const checkBoxHide = Array.from(document.querySelectorAll(`input[name="hide"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[]; // toutes les cases cacher
            checkBoxHide.forEach((check) => {
              check.checked = true;
            });

            // On désactive toutes les cases écrire
            const checkBoxEdit = Array.from(document.querySelectorAll(`input[name="edit"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[]; // toutes les cases écrire
            checkBoxEdit.forEach((check) => {
              check.disabled = true;
            });

            // On désactive la case tout cocher écrire
            const checkBoxEditAll = document.querySelector(`input[name="CheckAllEdit"][id="${category_id}"]`) as HTMLInputElement; // la case tout cocher lecture
            checkBoxEditAll.disabled = true;
          }

          else{
            // Si la case tout cocher "Caché" n'est pas cochée
            role.hide?.splice(index, 1, false);
            setRole({ ...role });

            // On décoche toutes les cases cacher
            const checkBoxHide = Array.from(document.querySelectorAll(`input[name="hide"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[]; // toutes les cases cacher
            checkBoxHide.forEach((check) => {
              check.checked = false;
            });

            // On active toutes les cases écrire
            const checkBoxEdit = Array.from(document.querySelectorAll(`input[name="edit"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[]; // toutes les cases écrire
            checkBoxEdit.forEach((check) => {
              check.disabled = false;
            });

            // On active la case tout cocher écrire
            const checkBoxEditAll = document.querySelector(`input[name="CheckAllEdit"][id="${category_id}"]`) as HTMLInputElement; // la case tout cocher lecture
            checkBoxEditAll.disabled = false;
          }
        });
      });
    });

    // Vérifier si la case tout cocher écrire est cochée
    const checkBoxEditAll = document.getElementsByName("CheckAllEdit");
    checkBoxEditAll.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement; // la case tout cocher écrire
        const category_id = target.id;
        const category = categories.find((categorie : any) => categorie.category_id.toString() === category_id);

        // Pour chaque sous-catégorie de la catégorie
        category.sub_categories.forEach((sub_category : SubCategory) => {
          const index = role.pages?.indexOf(sub_category.sub_category_name) ?? -1;

          // Si la case tout cocher "Écriture" est cochée
          if (target.checked) {
            role.hide?.splice(index, 1, true);
            role.edit?.splice(index, 1, true);
            setRole({ ...role });

            // On coche toutes les cases écrire
            const checkBoxEdit = Array.from(document.querySelectorAll(`input[name="edit"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[]; // toutes les cases écrire
            checkBoxEdit.forEach((check) => {
              check.checked = true;
            });

            // On désactive toutes les cases cacher
            const checkBoxHide = Array.from(document.querySelectorAll(`input[name="hide"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[]; // toutes les cases cacher
            checkBoxHide.forEach((check) => {
              // check.checked = true;
              check.disabled = true;
            });

            // On désactive la case tout cocher cacher
            const checkBoxHideAll = document.querySelector(`input[name="CheckAllHide"][id="${category_id}"]`) as HTMLInputElement; //la case tout cocher lecture
            // checkBoxHideAll.checked = true;
            checkBoxHideAll.disabled = true;
          }

          else{
            // Si la case tout cocher "Écriture" n'est pas cochée
            const index = role.pages?.indexOf(sub_category.sub_category_name) ?? -1;
            role.edit?.splice(index, 1, false);
            role.hide?.splice(index, 1, false);
            setRole({ ...role });

            // On décoche toutes les cases écrire
            const checkBoxEdit = Array.from(document.querySelectorAll(`input[name="edit"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[];
            checkBoxEdit.forEach((check) => {
              check.checked = false;
            });

            // On active toutes les cases cacher
            const checkBoxHide = Array.from(document.querySelectorAll(`input[name="hide"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[];
            checkBoxHide.forEach((check) => {
              check.checked = false;
              check.disabled = false;
            });

            // On active la case tout cocher cacher
            const checkBoxHideAll = document.querySelector(`input[name="CheckAllHide"][id="${category_id}"]`) as HTMLInputElement;
            checkBoxHideAll.checked = false;
            checkBoxHideAll.disabled = false;
          }});
      });
    });

    const checkBoxHide = document.querySelectorAll("input[name=\"hide\"]");
    checkBoxHide.forEach((checkBox) => {
      //je veux que quand je coche une checkbox hide, cela coche la checkbox edit et ça la disable
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement; // une case cacher
        const sub_category_id = target.id;
        const category : DataList = categories.find((categorie : any) => categorie.sub_categories.find((subCategorie : SubCategory) => subCategorie.sub_category_id.toString() === sub_category_id));
        const sub_category = category.sub_categories.find((subCategorie : SubCategory) => subCategorie.sub_category_id.toString() === sub_category_id);
        const sub_category_name = sub_category ? sub_category.sub_category_name : "";
        const index = role.pages?.indexOf(sub_category_name) ?? -1;
        const checkBoxEdit = document.querySelector(`input[name="edit"][id="${sub_category_id}"]`) as HTMLInputElement;
        if (target.checked) {
          role.hide?.splice(index, 1, true);
          checkBoxEdit.disabled = true;
        }
        else{
          role.hide?.splice(index, 1, false);
          checkBoxEdit.disabled = false;
        }
        setRole({ ...role });
      });
    });

    const checkBoxEdit = document.querySelectorAll("input[name=\"edit\"]");
    checkBoxEdit.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement; // une case écrire
        const sub_category_id = target.id;
        const category : DataList = categories.find((categorie : any) => categorie.sub_categories.find((subCategorie : SubCategory) => subCategorie.sub_category_id.toString() === sub_category_id));
        const sub_category = category.sub_categories.find((subCategorie : SubCategory) => subCategorie.sub_category_id.toString() === sub_category_id);
        const sub_category_name = sub_category ? sub_category.sub_category_name : "";
        const index = role.pages?.indexOf(sub_category_name) ?? -1;
        const checkBoxHide = document.querySelector(`input[name="hide"][id="${sub_category_id}"]`) as HTMLInputElement;
        if (target.checked) {
          role.edit?.splice(index, 1, true);
          role.hide?.splice(index, 1, true);
          // checkBoxHide.checked = true;
          checkBoxHide.disabled = true;
        }
        else{
          role.edit?.splice(index, 1, false);
          role.hide?.splice(index, 1, false);
          // checkBoxHide.checked = false;
          checkBoxHide.disabled = false;
        }

        setRole({ ...role });
      });
    });
  });

  useEffect(() => {
    if (categories.length === 0 || (role.pages?.length ?? 0) > 0) {
      return;
    }
    //je veux charger la liste de mes pages dans role
    categories.forEach((categorie) => {
      categorie.sub_categories.forEach((subCategorie : any) => {
        role.pages?.push(subCategorie.sub_category_name);
        role.hide?.push(false);
        role.edit?.push(false);
      });
    });
  }, [categories]
  );

  // useEffect(() => {
  //   console.log("role",role);
  // }, [role]);

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    // Créer un nouveau rôle
    event.preventDefault();
    role.name = (document.getElementById("role") as HTMLInputElement).value;
    const newList = checkAccess();
    const datas = new FormData();
    console.log("role définitif",JSON.stringify(newList));
    datas.append("role", JSON.stringify(newList));
    const result = await fetch("/api/roles", {
      method: "POST",
      body: JSON.stringify(newList),
    });
    await result.json();
    window.location.href = "/Administration";
  };

  const handleUpdate = async(event: React.FormEvent<HTMLFormElement>) => {
    // Mettre à jour un rôle
    event.preventDefault();
    const newList = checkAccess();
    const datas = new FormData();
    console.log("role définitif",JSON.stringify(newList));
    datas.append("role", JSON.stringify(newList));
    const result = await fetch(`/api/roles/${role.name}`, {
      method: "PUT",
      body: JSON.stringify(newList),
    });
    await result.json();
    window.location.href = "/Administration";
  };

  function checkAccess() {
    // Créer une liste de pages avec les accès
    const listTemp : RoleObjectDb = { name: "", pages: [], access: [] };

    // Pour chaque page, on ajoute le nom du rôle, la page et l'accès
    role.pages?.forEach((page, index) => {
      listTemp.name = role.name;
      listTemp.pages?.push(page);
      let access = 0;
      if(role.hide?.[index] === true) {
        access = 1;
      }
      if (role.edit?.[index] === true) {
        access = 2;
      }
      listTemp.access?.push(access);
    });
    return listTemp;
  }

  function handleOnChangeSelectedRole(e : ChangeEvent<HTMLSelectElement>) {
    // Mettre à jour le rôle sélectionné
    const selectedRole = roles.find((role) => role.name === e.target.value);

    // Si le rôle sélectionné existe, on le convertit en objet RoleObject
    if (selectedRole) {
      const newRole : RoleObject = convertBdToRoleObject(selectedRole);
      setRole(newRole);
      updateCheckboxes(newRole);
    }
  }

  function convertBdToRoleObject(roleDb : RoleObjectDb) {
    // Convertir un rôle de la base de données en objet RoleObject
    const newRole : RoleObject = { name: roleDb.name, pages: [], hide: [], edit: [] };

    // Pour chaque page, on ajoute le nom de la page, si elle est cachée et si elle est éditable
    roleDb.pages?.forEach((page, index) => {
      newRole.pages?.push(page);
      if (roleDb.access?.[index] === 1) {
        newRole.hide?.push(true);
        newRole.edit?.push(false);
      }
      else if (roleDb.access?.[index] === 2) {
        newRole.hide?.push(true);
        newRole.edit?.push(true);
      }
      else{
        newRole.hide?.push(false);
        newRole.edit?.push(false);
      }
    });
    return newRole;
  }

  function updateCheckboxes(newRole : RoleObject) {
    // Mettre à jour les cases à cocher
    newRole.pages?.forEach((page, index) => {
      // Pour chaque pages définis dans le rôle

      // On récupère la catégorie d'une page
      const category = categories.find(categorie =>
        categorie.sub_categories.some(
          (subCategorie: any) => subCategorie.sub_category_name === page
        )
      );

      // On récupère la sous-catégorie d'une page
      const subCategory = category?.sub_categories.find(
        (subCategorie: any) => subCategorie.sub_category_name === page
      );

      // Trouver l'id de la sous-catégorie
      const sub_category_id = subCategory?.sub_category_id;

      const checkBoxHide = document.querySelector(`input[name="hide"][id="${sub_category_id}"]`) as HTMLInputElement; // la case cacher
      const checkBoxEdit = document.querySelector(`input[name="edit"][id="${sub_category_id}"]`) as HTMLInputElement; // la case écrire

      // Si la page est cachée, on coche la case cacher
      if (newRole.hide?.[index] === true) {
        checkBoxHide.checked = true;
      }

      // Sinon, on décoche la case cacher
      else {
        checkBoxHide.checked = false;
      }

      // Si la page est éditable, on coche la case écrire
      if (newRole.edit?.[index] === true) {
        checkBoxEdit.checked = true;
      }

      // Sinon, on décoche la case écrire
      else{
        checkBoxEdit.checked = false;
      }
    });
  }

  const confirmDelete = () => {
    // Si on veux supprimer un rôle, on demande une confirmation
    const confirm = window.confirm("Voulez-vous vraiment supprimer ce rôle ?");
    if (confirm) {
      // si l'utilisateur confirme la suppression on déclenche la suppression
      handleDelete();
      window.location.href = "/Administration";
    }
  };

  const handleDelete = async() => {
    // On supprime le rôle
    const result = await fetch(`/api/roles/${role.name}`, {
      method: "DELETE",
    });
    await result.json();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
        <Spinner className="text-neutral-500" size={3} />
      </div>
    );
  }

  if (isAuthorized === false) {
    return null;
  }

  if (isAuthorized === true) {
    return (
      <div>
        <h1 className="ml-10">
          {
            kind === "update" ? "Modifier un rôle" : "Créer un rôle"
          }
        </h1>
        <form className={styles.form} onSubmit={kind === "update" ? (e) => handleUpdate(e) : (e) => handleSubmit(e)}>
          { kind === "update" ? (
            <select onChange={(e) => handleOnChangeSelectedRole(e)}>
              {
                <option value={""}>Choisissez un role</option>
              }

              { roles && ( roles.map((role, index) => (
                <option key={index} value={role.name}>{role.name}</option>
              )))}
            </select>
          ) :
            <input className="w-full p-2 text-4xl font-bold text-center mt-4" type="text" name="role" id="role" placeholder="Nom du rôle" />
          }
          <div className={styles.list_sous_cat}>
            {categories?.length > 0 && categories?.map((categorie: any, index: any) => (
              <div key={index}>
                <h3>{categorie.category_name}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Sous-catégories</th>
                      <th>Caché</th>
                      <th>Écriture</th>
                    </tr>
                    <tr>
                      <th>Tout cocher</th>
                      <th><input type="checkbox" name="CheckAllHide" id={categorie.category_id} /></th>
                      <th><input type="checkbox" name="CheckAllEdit" id={categorie.category_id} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorie.sub_categories.length > 0 && categorie.sub_categories.map((subCategorie : SubCategory, index : any) => (
                      <tr key={index}>
                        <td>{subCategorie.sub_category_name}</td>
                        <td><input type="checkbox" name="hide" id={subCategorie.sub_category_id.toString()} /></td>
                        <td><input type="checkbox" name="edit" id={subCategorie.sub_category_id.toString()} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <div className={styles.container_buttons}>
            {
              kind === "update" && (
                <button type="button" className="bg-stone-300 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => window.location.href = "/Administration"}>
              Annuler
                </button>
              )
            }
            {
              kind === "create" && (
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Créer
                </button>
              )
            }
            { role && role.name && (
              <>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Modifier
                </button>

                <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={confirmDelete}>
              Supprimer
                </button>
              </>
            )
            }
          </div>
        </form>
      </div>
    );
  }
}