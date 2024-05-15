import styles from "../styles.module.css";
import Image from "next/image";
import Link from "next/link";
import connexion from "../../../../assets/icons/utilisateur.png";
import { useState } from "react";
import { LogInForm } from "./form/login-form";

export default function LogIn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <a className={styles.logIn} onClick={() => setIsMenuOpen(true)}>
        <div>
          <Image src={connexion} width={32} height={32} alt="Se Connecter"/>
          <p>Se Connecter</p>
        </div>
      </a>
      { isMenuOpen &&
      <LogInForm setIsMenuOpen={setIsMenuOpen}/>
      }
    </>
  );
}