"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import loupe from "../../../../assets/icons/loupe.png";
import { useState } from "react";

// Fichier interface barre de recherche
// Reste à faire le back, requête API pour afficher les éléments par rapport aux éléments inscrit dans la barre de recherche

export default function SearchBar() {

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <div
      className={`${styles.searchContainer} & ${isSearchOpen ? styles.softRounded : ""}`}
      style={{ width: isSearchOpen ? "15vw" : "auto" }}
    >
      <div onClick={handleSearchClick}>
        <Image src={loupe} width={32} height={32}
          className={`${!isSearchOpen ? styles.rounded : ""} `}
          alt="Rechercher"/>
      </div>
      {isSearchOpen && (
        <input type="text" placeholder="Rechercher..." />
      )}
    </div>
  );
}