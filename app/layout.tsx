
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/Header/Header";
import React from "react";
import { DataList } from "@/app/lib/utils/types";

import fetchDatas from "./lib/utils/fetchData";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./lib/utils/AppContext";
import { getSession } from "./lib/session";
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
  const session = await getSession();
  const datas : DataList[] = await fetchDatas();
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header session={session} dataList={datas} />
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
