import { SessionObject, RoleObjectDb, DataList, SubCategory } from "./types";

// Fichier utiliser pour définir les autorisations

export function isAdmin(user : SessionObject | null) {
  if (!user) return false;
  if (user.role === "Administrateur") return true;
  return false;
}

export function isEditeur(user : SessionObject | null) {
  if (!user) return false;
  if (user.role === "Editeur") return true;
  return false;
}

export function isAdminOrEditeur(user : SessionObject | null) {
  if (!user) return false;
  if (user.role === "Administrateur" || user.role === "Editeur") return true;
  return false;
}

export function canEdit(subCategorie? : SubCategory, categories? : DataList[], role? : RoleObjectDb | null ) {
  if (!role) return false;

  const listEditables : string[] = [];
  if (subCategorie && subCategorie.sub_category_name) {
    console.log("subCategorie", subCategorie);
    const index = role.pages?.findIndex((p : string) => {
      return p === subCategorie.sub_category_name;
    }
    );
    if (index) {
      if (role?.access && role?.pages && role?.access[index] == 2) {
        return true;
      }
      return false;
    }
    return false;
  }

  categories?.map((category) => {
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
