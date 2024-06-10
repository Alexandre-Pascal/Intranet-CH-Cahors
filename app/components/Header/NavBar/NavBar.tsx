// Navbar.js

import Link from "next/link";
import Image from "next/image";
import ennov from "../../../assets/icons/ennov.png";
import tableauDeBord from "../../../assets/icons/tableau-de-bord.png";
import demandeIntervention from "../../../assets/icons/cle.png";
import attention from "../../../assets/icons/attention.png";
import parametres from "../../../assets/icons/parametres.png";
import crayon from "../../../assets/icons/crayon.png";

import styles from "./styles.module.css";
import Menu from "./Menu/Menu";
import SearchBar from "./SearchBar/SearchBar";
import LogIn from "./LogIn/LogIn";
import { SessionObject } from "@/app/lib/utils/types";
import { isAdmin as admin, isAdminOrEditeur as adminOrEditeur } from "@/app/lib/utils/access";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import SelectorArticle from "./Menu/Categories/DialogContainers/SelectorArticle";
import { article } from "@/app/lib/utils/types";
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

  const [articleLinked, setArticleLinked] = useState<React.SetStateAction<article | null>>(null);
  const [url,setUrl] = useState<string>("");

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
      <div className={styles.announce}>
        <p><b>INFO : 🎉 Rejoignez-nous le 6 juin pour l'Apéro de l'hosto de 18h30 à 22h30 ! 🍸 Confirmez votre présence avant le 10 mai pour ne rien manquer ! 🎈</b></p>
      </div>
      <nav className={styles.navBar}>
        {isAdminOrEditeur && <Image onClick={()=> setIsPopUpOpen(true)} id={styles.editButton} src={crayon} width={40} height={40} alt="Crayon"/> }
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Link className={styles.fastPath} href="/">
          <div>
            <Image src={tableauDeBord} width={32} height={32} alt="Tableau de bord"/>
            <p>Tableaux des Gardes</p>
          </div>
        </Link>
        <Link className={styles.fastPath} href="/">
          <div>
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
        isPopUpOpen && (<>
          <div className={styles.popup}>
            <div className={styles.card} id={styles.card_announce}>
              <div className={styles.popupContent}>
                <h2>Modifier le bandeau d'annonce</h2>
                <form>
                  <label htmlFor={"image$"}>Bandeau à afficher</label>
                  <input
                    type="text"
                    id={"edit"}
                    name={"edit"}
                    placeholder="Contenu à afficher dans le bandeau d'annonce"
                  />
                  <div className={styles.container_buttons}>
                    <Button type="submit">Modifier</Button>
                    <Button className={styles.button_delete} onClick={() => setIsPopUpOpen(false)}>Supprimer</Button>
                  </div>
                </form>
              </div>
            </div>
            {[...Array(4)].map((_, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.popupContent}>
                  <h2>Modifier le raccourci n°{index + 1}</h2>
                  <form>
                    <label htmlFor={`image${index}`}>Icone à afficher</label>
                    <input type="file" id={`image${index}`} name={`image${index}`} accept=".png, .jpg, .jpeg"/>
                    <input
                      type="text"
                      id={`edit${index}`}
                      name={`edit${index}`}
                      placeholder="Nom du raccourci"
                    />
                    {setArticleLinked && <SelectorArticle setArticle = {setArticleLinked} setUrl={setUrl} url={url} />}
                    <h3>URL : </h3>
                    <input
                      disabled={articleLinked ? true : false}
                      type="text"
                      placeholder={ articleLinked ? url : "https://___________"}
                      value={url}
                      onChange={(e) => setUrl ? setUrl(e.currentTarget.value) : ""}
                    />
                    <div className={styles.container_buttons}>
                      <Button type="submit">Modifier</Button>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </div>
          <Button id={styles.close_interface} onClick={() => setIsPopUpOpen(false)}>Fermer</Button>
        </>
        )
      }
    </div>
  );
}
