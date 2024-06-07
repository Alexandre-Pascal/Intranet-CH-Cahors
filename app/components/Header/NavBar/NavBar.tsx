// Navbar.js

import Link from "next/link";
import Image from "next/image";
import ennov from "../../../assets/icons/ennov.png";
import tableauDeBord from "../../../assets/icons/tableau-de-bord.png";
import demandeIntervention from "../../../assets/icons/cle.png";
import attention from "../../../assets/icons/attention.png";
import parametres from "../../../assets/icons/parametres.png";
import crayon from "../../../assets/icons/crayon-blanc.png";

import styles from "./styles.module.css";
import Menu from "./Menu/Menu";
import SearchBar from "./SearchBar/SearchBar";
import LogIn from "./LogIn/LogIn";
import { SessionObject } from "@/app/lib/utils/types";
import { isAdmin as admin, isAdminOrEditeur as adminOrEditeur } from "@/app/lib/utils/access";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
interface NavBarProps {
  session: SessionObject,
  isMenuOpen: boolean,
  setIsMenuOpen: any
}

export default function NavBar({ session, isMenuOpen, setIsMenuOpen }: NavBarProps)
{

  // if (session.email) {
  //   alert("Vous êtes connecté");
  //   alert(Object.values(session));
  // }

  const [isAdmin,setIsAdmin] = useState(false);
  const [isAdminOrEditeur,setIsAdminOrEditeur] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const isConnected = session.email ? true : false;

  useEffect(() => {
    if (isConnected){
      const fetchRole = () =>{
        setIsAdmin(admin(session));
      };
      fetchRole();
    }
  }, [session]);

  useEffect(() => {
    if (isConnected){
      const fetchRole = () =>{
        setIsAdminOrEditeur(adminOrEditeur(session));
      };
      fetchRole();
    }
  }, [session]);

  return (
    <div>
      <nav className={styles.navBar}>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Link className={styles.fastPath} href="/">
          <div>
            <Image src={tableauDeBord} width={32} height={32} alt="Tableau de bord"/>
            <p>Tableaux des Gardes</p>
            {isAdminOrEditeur && <Image onClick={()=> setIsPopUpOpen(true)} className={styles.editButton} src={crayon} width={32} height={32} alt="Crayon"/> }
          </div>
        </Link>
        <Link className={styles.fastPath} href="/">
          <div>
            <Image src={demandeIntervention} width={32} height={32} alt="Demande d'intervention"/>
            <p>Demande d&apos;intervention</p>
            {isAdminOrEditeur && <Image onClick={()=> setIsPopUpOpen(true)} className={styles.editButton} src={crayon} width={32} height={32} alt="Crayon"/> }
          </div>
        </Link>
        <Link className={styles.fastPath} href="/">
          <div>
            <Image src={ennov} width={32} height={32} alt="Ennov"/>
            <p>Gestion Documentaire</p>
            {isAdminOrEditeur && <Image onClick={()=> setIsPopUpOpen(true)} className={styles.editButton} src={crayon} width={32} height={32} alt="Crayon"/> }
          </div>
        </Link>
        <Link className={styles.fastPath} href="/">
          <div>
            <Image src={attention} width={32} height={32} alt="Déclarer un évènement indésirable"/>
            <p>Déclarer un évènement indésirable</p>
            {isAdminOrEditeur && <Image onClick={()=> setIsPopUpOpen(true)} className={styles.editButton} src={crayon} width={32} height={32} alt="Crayon"/> }
          </div>
        </Link>
        <LogIn connected={isConnected}/>
        <SearchBar/>
        { isAdmin && (
          <Link className={styles.admin} href="/Administration">
            <div>
              <Image src={parametres} width={32} height={32} alt="Connexion"/>
              <p>Administration</p>
            </div>
          </Link>
        )}
      </nav>

      {
        isPopUpOpen && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h2>Modifier</h2>
              <form>
                <label htmlFor="image">Icone à afficher</label><input type="file" id="image" name="image" accept=".png, .jpg, .jpeg"/>
                <input
                  type="text"
                  id="edit"
                  name="edit"
                  placeholder="Nom du raccourci"
                />
                <div className={styles.container_buttons}>
                  <Button
                    type="submit"
                  >
            Modifier
                  </Button>
                  <Button
                    onClick={() => setIsPopUpOpen(false)}
                  >
          Fermer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </div>
  );
}
