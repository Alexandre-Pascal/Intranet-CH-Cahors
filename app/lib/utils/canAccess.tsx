"use server";
import { SessionObject } from "./types";
import prisma from "./prisma";
export default async function canAccess(user : SessionObject, page? : string) {
  if (!user) return false;
  if (user.role === "Administrateur") return true;

  const getRole = async() => {
    try {
      const response = await fetch(`/api/roles/${user.email}`);
      const data = await response.json();
      return data.role;
    }
    catch (error) {
      console.error("Erreur:", error);
    }
  };
  return false;
}