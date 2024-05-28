import { SessionObject, RoleObjectDb, DataList } from "./types";
import getRole from "./getRole";
export async function canAccess(user : SessionObject, page? : string) {
  if (!user) return false;
  if (user.role === "Administrateur") return true;

  // const role = await getRole(user);
  // console.log("role", role);

  // if (role?.pages?.find((p : string) => p === page)) return true;

  return false;
}

export function canEdit(categories : DataList[], role? : RoleObjectDb | null ) {
  if (!role) return false;
  // const recup = async() => {
  //   return await getRole(user);
  // };
  // const role = recup();

  console.log("categories",categories);
  // categories.map((category) => {
  // category.sub_categories.findIndex(subCategory => {
  //   subCategory.sub_category_name == (role?.pages?.find((p : string) => p === category.category_name));

  // if(role?.pages && role?.access){
  //   if (role.access[index] == 2)
  //     // console.log("true", role.pages[index]);
  //     return true;
  // }

  const listEditables : string[] = [];
  categories.map((category) => {
    category.sub_categories.map((subCategory) => {
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
