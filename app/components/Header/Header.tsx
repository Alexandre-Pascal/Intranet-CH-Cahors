"use client";

import { DataList, SessionObject } from "@/app/lib/utils/types";
import LogosList from "./LogosList/LogosList";
import ListeTitres from "./NavBar/Menu/ListeTitresMenu";
import NavBar from "./NavBar/NavBar";
import React, { useState } from "react";

interface HeaderProps {
  session : SessionObject;
  dataList : DataList[];
}
export default function Header({ dataList, session }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <NavBar session={session} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <LogosList/>
      { isMenuOpen && <ListeTitres {...dataList }/>}
    </header>
  );
}
