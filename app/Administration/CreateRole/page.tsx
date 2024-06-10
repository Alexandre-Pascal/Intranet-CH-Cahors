"use client";

import { DataList, RoleObject, RoleObjectDb, SubCategory } from "@/app/lib/utils/types";
import { useState, useEffect, ChangeEvent } from "react";
import styles from "./styles.module.css";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/lib/utils/AppContext";
import notAuthorised from "@/app/components/Header/notAuthorised";
import { Spinner } from "@/app/components/ui/Spinner";

export default function CreateRole() {

  const [categories, setCategories] = useState<any[]>([]);
  const [role, setRole] = useState<RoleObject>({ name: "", pages: [], read: [], edit: [] });

  const [roles, setRoles] = useState<RoleObjectDb[]>([]);

  const searchParams = useSearchParams();
  const kind = searchParams.get("kind");

  const { session, loading } = useAppContext();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
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
    const checkBoxReadAll = document.getElementsByName("CheckAllRead");
    checkBoxReadAll.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const category_id = target.id;
        const category = categories.find((categorie : any) => categorie.category_id.toString() === category_id);

        category.sub_categories.forEach((sub_category : SubCategory) => {
          const index = role.pages?.indexOf(sub_category.sub_category_name) ?? -1;
          if (target.checked) {
            role.read?.splice(index, 1, true);
            setRole({ ...role });

            const checkBoxRead = Array.from(document.querySelectorAll(`input[name="read"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[];
            checkBoxRead.forEach((check) => {
              check.checked = true;
            });

          }

          else{
            role.read?.splice(index, 1, false);
            setRole({ ...role });

            const checkBoxRead = Array.from(document.querySelectorAll(`input[name="read"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[];
            checkBoxRead.forEach((check) => {
              check.checked = false;
            });
          }
        });
      });
    });

    const checkBoxEditAll = document.getElementsByName("CheckAllEdit");
    checkBoxEditAll.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const category_id = target.id;
        const category = categories.find((categorie : any) => categorie.category_id.toString() === category_id);
        category.sub_categories.forEach((sub_category : SubCategory) => {
          const index = role.pages?.indexOf(sub_category.sub_category_name) ?? -1;
          if (target.checked) {
            role.read?.splice(index, 1, true);
            role.edit?.splice(index, 1, true);
            setRole({ ...role });

            const checkBoxEdit = Array.from(document.querySelectorAll(`input[name="edit"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[];
            checkBoxEdit.forEach((check) => {
              check.checked = true;
            });

            const checkBoxRead = Array.from(document.querySelectorAll(`input[name="read"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[]; //
            checkBoxRead.forEach((check) => {
              check.checked = true;
              check.disabled = true;
            });
            const checkBoxReadAll = document.querySelector(`input[name="CheckAllRead"][id="${category_id}"]`) as HTMLInputElement; //la case tout cocher lecture
            checkBoxReadAll.checked = true;
            checkBoxReadAll.disabled = true;
          }
          else{
            const index = role.pages?.indexOf(sub_category.sub_category_name) ?? -1;
            role.edit?.splice(index, 1, false);
            role.read?.splice(index, 1, false);
            setRole({ ...role });

            const checkBoxEdit = Array.from(document.querySelectorAll(`input[name="edit"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[];
            checkBoxEdit.forEach((check) => {
              check.checked = false;
            });

            //On est obligé de pouvoir lire si on peux modifier
            const checkBoxRead = Array.from(document.querySelectorAll(`input[name="read"][id="${sub_category.sub_category_id.toString()}"]`)) as HTMLInputElement[];
            checkBoxRead.forEach((check) => {
              check.checked = false;
              check.disabled = false;
            });
            const checkBoxReadAll = document.querySelector(`input[name="CheckAllRead"][id="${category_id}"]`) as HTMLInputElement;
            checkBoxReadAll.checked = false;
            checkBoxReadAll.disabled = false;
          }});
      });
    });

    const checkBoxRead = document.querySelectorAll("input[name=\"read\"]");
    checkBoxRead.forEach((checkBox) => {
      //je veux que quand je coche une checkbox read, cela coche la checkbox edit et ça la disable
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const sub_category_id = target.id;
        const category : DataList = categories.find((categorie : any) => categorie.sub_categories.find((subCategorie : SubCategory) => subCategorie.sub_category_id.toString() === sub_category_id));
        const sub_category = category.sub_categories.find((subCategorie : SubCategory) => subCategorie.sub_category_id.toString() === sub_category_id);
        const sub_category_name = sub_category ? sub_category.sub_category_name : "";
        const index = role.pages?.indexOf(sub_category_name) ?? -1;
        if (target.checked) {
          role.read?.splice(index, 1, true);
        }
        else{
          role.read?.splice(index, 1, false);
        }
        setRole({ ...role });
      });
    });

    const checkBoxEdit = document.querySelectorAll("input[name=\"edit\"]");
    checkBoxEdit.forEach((checkBox) => {
      checkBox.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const sub_category_id = target.id;
        const category : DataList = categories.find((categorie : any) => categorie.sub_categories.find((subCategorie : SubCategory) => subCategorie.sub_category_id.toString() === sub_category_id));
        const sub_category = category.sub_categories.find((subCategorie : SubCategory) => subCategorie.sub_category_id.toString() === sub_category_id);
        const sub_category_name = sub_category ? sub_category.sub_category_name : "";
        const index = role.pages?.indexOf(sub_category_name) ?? -1;
        const checkBoxRead = document.querySelector(`input[name="read"][id="${sub_category_id}"]`) as HTMLInputElement;
        if (target.checked) {
          role.edit?.splice(index, 1, true);
          role.read?.splice(index, 1, true);
          checkBoxRead.checked = true;
          checkBoxRead.disabled = true;
        }
        else{
          role.edit?.splice(index, 1, false);
          role.read?.splice(index, 1, false);
          checkBoxRead.checked = false;
          checkBoxRead.disabled = false;
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
        role.read?.push(false);
        role.edit?.push(false);
      });
    });
  }, [categories]
  );

  useEffect(() => {
    console.log("role",role);
  }, [role]);

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
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
    const listTemp : RoleObjectDb = { name: "", pages: [], access: [] };
    role.pages?.forEach((page, index) => {
      listTemp.name = role.name;
      listTemp.pages?.push(page);
      let access = 0;
      if(role.read?.[index] === true) {
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
    const selectedRole = roles.find((role) => role.name === e.target.value);
    if (selectedRole) {
      const newRole : RoleObject = convertBdToRoleObject(selectedRole);
      setRole(newRole);
      updateCheckboxes(newRole);
    }
  }

  function convertBdToRoleObject(roleDb : RoleObjectDb) {
    const newRole : RoleObject = { name: roleDb.name, pages: [], read: [], edit: [] };
    roleDb.pages?.forEach((page, index) => {
      newRole.pages?.push(page);
      if (roleDb.access?.[index] === 1) {
        newRole.read?.push(true);
        newRole.edit?.push(false);
      }
      else if (roleDb.access?.[index] === 2) {
        newRole.read?.push(true);
        newRole.edit?.push(true);
      }
      else{
        newRole.read?.push(false);
        newRole.edit?.push(false);
      }
    });
    return newRole;
  }

  function updateCheckboxes(newRole : RoleObject) {
    newRole.pages?.forEach((page, index) => {
      const sub_category_id = categories.find((categorie) => categorie.sub_categories.find((subCategorie : any) => subCategorie.sub_category_name === page))?.sub_categories.find((subCategorie : any) => subCategorie.sub_category_name === page)?.sub_category_id;
      const checkBoxRead = document.querySelector(`input[name="read"][id="${sub_category_id}"]`) as HTMLInputElement;
      const checkBoxEdit = document.querySelector(`input[name="edit"][id="${sub_category_id}"]`) as HTMLInputElement;
      if (newRole.read?.[index] === true) {
        checkBoxRead.checked = true;
      } else {
        checkBoxRead.checked = false;
      }

      if (newRole.edit?.[index] === true) {
        checkBoxEdit.checked = true;
      } else{
        checkBoxEdit.checked = false;
      }
    });
  }

  const handleDelete = async() => {
    const result = await fetch(`/api/roles/${role.name}`, {
      method: "DELETE",
    });
    await result.json();
  };

  const confirmDelete = () => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer ce rôle ?");
    if (confirm) {
      handleDelete();
      window.location.href = "/Administration";
    }
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
                      <th><input type="checkbox" name="CheckAllRead" id={categorie.category_id} /></th>
                      <th><input type="checkbox" name="CheckAllEdit" id={categorie.category_id} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorie.sub_categories.length > 0 && categorie.sub_categories.map((subCategorie : SubCategory, index : any) => (
                      <tr key={index}>
                        <td>{subCategorie.sub_category_name}</td>
                        <td><input type="checkbox" name="read" id={subCategorie.sub_category_id.toString()} /></td>
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