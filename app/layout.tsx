
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/Header/Header";
import React from "react";
import { DataList } from "@/app/utils/types";

import fetchDatas from "./utils/fetchData";

// import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intranet",
  description: "Intranet du Centre Hospitalier de Cahors",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const datas : DataList[] = await fetchDatas();

  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header {...datas}/>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
