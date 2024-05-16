"use server";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import prisma from "../lib/utils/prisma";

export async function signup(formData : FormData) {
  // Validate form fields

  const checkUserNotExists = await prisma.users.findUnique({
    where: {
      email: formData.get("email")?.toString() ?? undefined,
    },
  });

  if (checkUserNotExists) {
    return {
      errors: {
        email: ["Email already exists."],
      },
    };
  }

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  //utilisation de prisma
  const data = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!data) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // Call the provider or db to create a user...
}