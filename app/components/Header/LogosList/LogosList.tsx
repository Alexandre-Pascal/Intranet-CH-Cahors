import React from "react";
import Image from "next/image";
import GHT from "../../../assets/logos/GHT2.png";
import CHCahors from "../../../assets/logos/CHCahors2.png";

import styles from "./styles.module.css";

export default function LogosList() {
  return (
    <div className={styles.logosList}>
      <Image onClick={() => window.location.href = "/"} className={styles.chc} src={CHCahors} alt="CH Cahors"/>
      <Image onClick={() => window.location.href = "/"} className={styles.ght} src={GHT} alt="GHT"/>
    </div>
  );
}