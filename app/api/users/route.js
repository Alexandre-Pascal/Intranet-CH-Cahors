import prisma from "../../lib/utils/prisma";
import { NextResponse } from "next/server";
//récupérer la liste de tous les users en bd

export async function GET(){
  const users = await prisma.users.findMany();
  return NextResponse.json({ users });
}