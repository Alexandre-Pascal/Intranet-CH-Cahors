// Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import ennov from "../../../assets/icons/ennov.png";
import tableauDeBord from "../../../assets/icons/tableau-de-bord.png";
import demandeIntervention from "../../../assets/icons/cle.png";
import attention from "../../../assets/icons/attention.png";
import connexion from "../../../assets/icons/utilisateur.png";

import styles from "./styles.module.css";
import Menu from "./Menu/Menu";
import SearchBar from "./SearchBar/SearchBar";
import LogIn from "./LogIn/LogIn";
interface NavBarProps {
  session: any,
  isMenuOpen: boolean,
  setIsMenuOpen: any
}

export default function NavBar({ session, isMenuOpen, setIsMenuOpen }: NavBarProps)
{

  // if (session) {
  //   alert("Vous êtes connecté");
  //   alert(Object.values(session));
  // }
  const isConnected = session ? true : false;

  return (
    <div>
      <nav className={styles.navBar}>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
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
        <LogIn connected={isConnected}/>
        <SearchBar/>
      </nav>
    </div>
  );
}
