"use server";
import { SignupFormSchema } from "@/app/lib/definitions";
import { hashSync } from "bcrypt-ts";
import prisma from "../lib/utils/prisma";

export async function signup(formData : FormData) {
  // Valider les champs du formulaire

  // console.log("Début de la fonction signup");

  const checkUserNotExists = await prisma.users.findUnique({
    where: {
      email: formData.get("email")?.toString() ?? undefined,
    },
  });

  if (checkUserNotExists) {
    return {
      errors: {
        email: ["L'email existe déjà"], // L'email existe déjà.
      },
    };
  }

  // Créé un objet avec les données du formulaire
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Si un des champs du formulaire est invalide, retourner immédiatement
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // console.log("validatedFields");
  // console.log(validatedFields.data.email);

  // 2. Préparer les données pour l'insertion dans la base de données
  // hacher le mot de passe de l'utilisateur avant de le stocker
  const hashedPassword = hashSync(validatedFields.data.password, 10);

  // 3. Insérer l'utilisateur dans la base de données
  // utilisation de prisma
  console.log("name", validatedFields.data.name);
  console.log("email", validatedFields.data.email);
  const data = await prisma.users.create({
    data: {
      name : validatedFields.data.name,
      email: validatedFields.data.email,
      password: hashedPassword,
    },
  });

  if (!data) {
    return {
      message: "Une erreur s'est produite lors de la création de votre compte.",
    };
  }
}