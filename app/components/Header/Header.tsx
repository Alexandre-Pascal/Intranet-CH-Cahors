"use client";

import { DataList } from "@/app/utils/types";
import LogosList from "./LogosList/LogosList";
import ListeTitres from "./NavBar/Menu/ListeTitresMenu";
import NavBar from "./NavBar/NavBar";
import React, { useState } from "react";

export default function Header(dataList : DataList[]) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <LogosList/>
      { isMenuOpen && <ListeTitres {...dataList }/>}
    </header>
  );
}
