import Image from "next/image";

import plan from "../../../assets/images/plan.png";

import styles from "./styles.module.css";

// Page contenant les informations de la page d'accueil

export default function Infos() {
  return (
    <div className={styles.container}>
      <iframe src="https://www.ch-cahors.fr/"/>
      <Image src={plan} alt="Plan de l'hôpital"/>
    </div>
  );
}