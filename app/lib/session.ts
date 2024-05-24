"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./utils/prisma";
import bcrypt from "bcryptjs";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("600 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {

  const utilisateur = await prisma.users.findFirst({
    where: {
      email: formData.get("email")?.toString(),
    },
  });

  // console.log("user", utilisateur);

  if (!utilisateur) {
    return {
      errors: {
        email: ["Email inexistant."],
      },
    };
  }

  const email = formData.get("email");
  const password = formData.get("password") ?? "undefined";
  const passwordMatch = await bcrypt.compare(password.toString(), utilisateur.password.toString());
  if (!passwordMatch) {
    return {
      errors: {
        password: ["Le mot de passe est incorrect"],
      },
    };
  }

  const user = { email: email, nom: utilisateur.name, role: utilisateur.role };
  // Create the session
  console.log("create");

  const expires = new Date(Date.now() + 600 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}
// }

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  console.log("update");
  parsed.expires = new Date(Date.now() + 600 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}