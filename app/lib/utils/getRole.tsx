import { RoleObjectDb, SessionObject } from "./types";

// Fonction pour récupérer tous les rôles

export default async function getRole(user : SessionObject) {
  try {
    const role = user.role ?? "undefined";
    const url = `/api/roles/${role}`;
    const response = await fetch(url);
    const data = await response.json();
    const userRole : RoleObjectDb = data.result;
    return userRole;
  }
  catch (error) {
    console.error("Erreur:", error);
  }
}