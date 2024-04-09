// Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import menu from "../../../assets/icons/menu.png";
import ennov from "../../../assets/icons/ennov.png";
import tableauDeBord from "../../../assets/icons/tableau-de-bord.png";
import demandeIntervention from "../../../assets/icons/cle.png";
import attention from "../../../assets/icons/attention.png";
import connexion from "../../../assets/icons/utilisateur.png";
import loupe from "../../../assets/icons/loupe.png";

import styles from "./styles.module.css";
import Menu from "./Menu/Menu";

export default function NavBar({ isMenuOpen, setIsMenuOpen }:
  {
    isMenuOpen: boolean,
    setIsMenuOpen: (value: boolean) => void
  }
) {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  // const handleSearchClick = () => {
  //   setIsSearchOpen(!isSearchOpen);
  // };

  // const handleMenuClick = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // Extraire les titres sous forme de tableau de chaînes de caractères

  return (
    <div>
      <nav className={styles.navBar}>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        {/* <div onClick={handleMenuClick} style={{ cursor: "pointer" }}>
        <Image src={menu} width={32} height={32} className={styles.rounded} alt="Menu"/> METTRE DANS UN COMPOSANT CLIENT
        <p className={styles.altColorText}>Menu</p>
      </div> */}
        <Link className={styles.fastPath} href="/">
          <div>
            <Image src={tableauDeBord} width={32} height={32} alt="Tableau de bord"/>
            <p>Tableaux des Gardes</p>
          </div>
        </Link>
        <Link className={styles.fastPath} href="/">
          <div >
            <Image src={demandeIntervention} width={32} height={32} alt="Demande d'intervention"/>
            <p>Demande d&apos;intervention</p>
          </div>
        </Link>
        <Link className={styles.fastPath} href="/">
          <div>
            <Image src={ennov} width={32} height={32} alt="Ennov"/>
            <p>Gestion Documentaire</p>
          </div>
        </Link>
        <Link className={styles.fastPath} href="/">
          <div>
            <Image src={attention} width={32} height={32} alt="Déclarer un évènement indésirable"/>
            <p>Déclarer un évènement indésirable</p>
          </div>
        </Link>
        <Link className={styles.logIn} href="/">
          <div>
            <Image src={connexion} width={32} height={32} alt="Se Connecter"/>
            <p>Se Connecter</p>
          </div>
        </Link>
        {/* <div
          className={`${styles.searchContainer} & ${isSearchOpen ? styles.softRounded : ""}`}
          style={{ width: isSearchOpen ? "15vw" : "auto" }}
        >
          <div onClick={handleSearchClick}>
            <Image src={loupe} width={32} height={32}
              className={`${!isSearchOpen ? styles.rounded : ""} `}
              alt="Rechercher"/>
          </div>
           {isSearchOpen && (
          <input type="text" placeholder="Rechercher..." />   METTRE DANS UN COMPOSANT CLIENt
        )}
        </div> */}
      </nav>
      {/* {isMenuOpen && <Menu/>} */}

    </div>
  );
}
