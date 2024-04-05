"use client";

import InfosNeeded from "./components/HomePage/InfosNeeded/InfosNeeded";
import FastPathBis from "./components/HomePage/FastPathBis/FastPathBis";
import Infos from "./components/HomePage/Infos/Infos";

import { useGlobalState } from "./utils/GlobalStateContext";

import { useEffect } from "react";

export default function Home() {

  const { isMenuOpen } = useGlobalState();

  return (
    <main>
      {!isMenuOpen && (
        <>
          <InfosNeeded/>
          <FastPathBis/>
          <Infos/>
          <a href="/testationnage"> Testationnage </a>
        </>
      )}
    </main>
  );
}
