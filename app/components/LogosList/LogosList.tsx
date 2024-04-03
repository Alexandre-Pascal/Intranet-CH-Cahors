import React from "react";
import Image from "next/image";
import GHT from "../../assets/logos/GHT2.png";
import CHCahors from "../../assets/logos/CHCahors2.png";

import styles from "./styles.module.css";

export default function LogosList() {
  return (
    <div className={styles.logosList}>
      {/* <Image src={CHCahors} width={200} height={100} alt="CH Cahors"/>
      <Image src={GHT} width={100} height={100} alt="GHT"/> */}
      <Image className={styles.chc} src={CHCahors} alt="CH Cahors"/>
      <Image className={styles.ght} src={GHT} alt="GHT"/>
    </div>
  );
}