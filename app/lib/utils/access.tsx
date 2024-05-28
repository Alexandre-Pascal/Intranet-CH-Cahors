import { SessionObject, RoleObjectDb, DataList } from "./types";
import getRole from "./getRole";

export function isAdmin(user : SessionObject | null) {
  if (!user) return false;
  if (user.role === "Administrateur") return true;
  return false;
}

export function canEdit(categories : DataList[], role? : RoleObjectDb | null ) {
  if (!role) return false;
  const listEditables : string[] = [];
  categories.map((category) => {
    category.sub_categories.map((subCategory) => {
      if(role.name === "Administrateur" || role.name === "Editeur") {
        listEditables.push(subCategory.sub_category_name);
        return;
      }
      const indexSousCatCorrespDansListePages = role?.pages?.findIndex((p : string) => p === subCategory.sub_category_name);
      if (indexSousCatCorrespDansListePages) {
        if (role?.access && role?.pages && role?.access[indexSousCatCorrespDansListePages] == 2) {
          // console.log("true", role?.pages[indexSousCatCorrespDansListePages]);
          listEditables.push(role.pages[indexSousCatCorrespDansListePages]);
        }
      }
    });
  }
  );

  return listEditables;
  // return false;
}
