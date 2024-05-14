import React from "react";
import Image from "next/image";

import hopital from "../../../assets/icons/hopital.png";
import annuaire from "../../../assets/icons/annuaire.png";
import messagerie from "../../../assets/icons/messagerie.png";
import cgos from "../../../assets/icons/cgos.png";
import reglement from "../../../assets/icons/reglement.png";

import styles from "./styles.module.css";

export default function FastPathBis() {
  return (
    <div className={styles.bar}>
      <div className={styles.spaced} >
        <Image src={hopital} width={16} height={16} alt="Site de l'hôpital"/>
        <a href={"/"}><h3>Site de l&apos;hôpital</h3></a>
      </div>
      <div className={styles.spaced} >
        <Image src={annuaire} width={16} height={16} alt="Annuaire"/>
        <a href={"/"}><h3>Annuaire</h3></a>
      </div>
      <div className={styles.spaced} >
        <Image src={messagerie} width={16} height={16} alt="Messagerie"/>
        <a href={"/"}><h3>Messagerie</h3></a>
      </div>
      <div className={styles.spaced} >
        <Image src={cgos} width={16} height={16} alt="CGOS"/>
        <a href={"/"}><h3>CGOS</h3></a>
      </div>
      <div className={styles.spaced} >
        <Image src={reglement} width={16} height={16} alt="Règlement Intérieur"/>
        <a href={"/"}><h3>Règlement Intérieur</h3></a>
      </div>
    </div>
  );
}