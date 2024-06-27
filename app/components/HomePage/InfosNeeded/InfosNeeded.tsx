import React from "react";
import Image from "next/image";
import fleche from "../../../assets/icons/fleche-droite.png";

import styles from "./styles.module.css";

// Raccourcis pour accéder à des catégories du menu
// Pas le back de fait

export default function InfosNeeded() {
  return (
    <div className={styles.bar}>
      <p className={styles.spaced}>Vous souahitez des informations </p>
      <Image className={styles.spaced} src={fleche} width={24} height={24} alt="Fleche"/>
      <a href={"/"}><h2 className={styles.spaced}>ADMINISTRATIF</h2></a>
      <p className={styles.spaced}>|</p>
      <a href={"/"}><h2 className={styles.spaced}>PLATEAUX MÉDICAUX TECHNIQUES</h2></a>
      <p className={styles.spaced}>|</p>
      <a href={"/"}><h2 className={styles.spaced}>APPLICATIONS MÉTIERS</h2></a>
    </div>
  );
}