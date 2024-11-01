
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/Header/Header";
import React from "react";
import { DataList, SessionObject } from "@/app/lib/utils/types";

import fetchDatas from "./lib/utils/fetchData";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./lib/utils/AppContext";
import { getSession } from "./lib/session";

const inter = Inter({ subsets: ["latin"] });

// Fichier lancé avant la création de page, utilisé pour bien structurer

export const metadata: Metadata = {
  title: "Intranet",
  description: "Intranet du Centre Hospitalier de Cahors",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const datasSession : SessionObject = {
    email : session?.user.email,
    name : session?.user.nom,
    role : session?.user.role,
  };

  const datas : DataList[] = await fetchDatas();
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AppProvider>
          <Header session={datasSession} dataList={datas} />
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
