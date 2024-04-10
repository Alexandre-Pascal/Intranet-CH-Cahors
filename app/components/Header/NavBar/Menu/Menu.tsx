"use client";

import styles from "./styles.module.css";

import menu from "../../../../assets/icons/menu.png";

import Image from "next/image";

export default function Menu({ isMenuOpen, setIsMenuOpen }:
    {
      isMenuOpen: boolean,
      setIsMenuOpen: any
    })
{

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return(
    <div onClick={handleMenuClick} style={{ cursor: "pointer", height: "5vh" }}>
      <Image src={menu} width={32} height={32} className={styles.rounded} alt="Menu"/>
      <p className={styles.altColorText}>Menu</p>
    </div>
  );
}