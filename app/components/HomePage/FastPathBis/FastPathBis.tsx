"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import hopital from "../../../assets/icons/hopital.png";
import annuaire from "../../../assets/icons/annuaire.png";
import messagerie from "../../../assets/icons/messagerie.png";
import cgos from "../../../assets/icons/cgos.png";
import reglement from "../../../assets/icons/reglement.png";
import crayon from "../../../assets/icons/crayon.png";

import styles from "./styles.module.css";
import { Button } from "../../ui/button";
import { useAppContext } from "@/app/lib/utils/AppContext";
import { isAdminOrEditeur as adminOrEditeur } from "@/app/lib/utils/access";
import SelectorArticle from "../../Header/NavBar/Menu/Categories/DialogContainers/SelectorArticle";
import { article } from "@/app/lib/utils/types";

// Raccourcis secondaires de la page d'accueil

export default function FastPathBis() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isAdminOrEditeur,setIsAdminOrEditeur] = useState(false);
  const [articleLinked, setArticleLinked] = useState<React.SetStateAction<article | null>>(null);
  const [url,setUrl] = useState<string>("");

  const { session } = useAppContext();
  const isConnected = session?.email ? true : false;

  useEffect(() => {
    if (isConnected){
      const fetchRole = () =>{
        setIsAdminOrEditeur(adminOrEditeur(session));
      };
      fetchRole();
    }
  }, [session]);
  return (
    <>
      <div className={styles.bar}>
        {isAdminOrEditeur && <Image onClick={()=> setIsPopUpOpen(true)} className={styles.editButton} src={crayon} width={40} height={40} alt="Crayon"/> }
        <div className={styles.spaced} >
          <Image src={hopital} width={20} height={20} alt="Site de l'hôpital"/>
          <a href={"/"}><h3>Site de l&apos;hôpital</h3></a>
        </div>
        <div className={styles.spaced} >
          <Image src={annuaire} width={20} height={20} alt="Annuaire"/>
          <a href={"/"}><h3>Annuaire</h3></a>
        </div>
        <div className={styles.spaced} >
          <Image src={messagerie} width={20} height={20} alt="Messagerie"/>
          <a href={"/"}><h3>Messagerie</h3></a>
        </div>
        <div className={styles.spaced} >
          <Image src={cgos} width={20} height={20} alt="CGOS"/>
          <a href={"/"}><h3>CGOS</h3></a>
        </div>
        <div className={styles.spaced} >
          <Image src={reglement} width={20} height={20} alt="Règlement Intérieur"/>
          <a href={"/"}><h3>Règlement Intérieur</h3></a>
        </div>
      </div>
      {
        isPopUpOpen && (
          <>
            <div className={styles.popup}>
              {[...Array(5)].map((_, index) => (
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
    </>
  );
}