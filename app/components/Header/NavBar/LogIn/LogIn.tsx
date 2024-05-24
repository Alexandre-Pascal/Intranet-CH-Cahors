import styles from "../styles.module.css";
import Image from "next/image";
import Link from "next/link";
import connexion from "../../../../assets/icons/utilisateur.png";
import deconnexion from "../../../../assets/icons/deconnecter.png";

import { useState } from "react";
import { LogInForm } from "./form/login-form";
import { logout } from "@/app/lib/session";

interface LogInProps {
  connected: boolean;
}
export default function LogIn({ connected }: LogInProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async() => {
    await logout();
    alert("Déconnexion réussie"),
    window.location.href = "/";
  };
  return (
    <>
      { !connected ? (
        <a className={styles.logIn} onClick={() => setIsMenuOpen(true)}>
          <div>
            <Image src={connexion} width={32} height={32} alt="Se Connecter"/>
            <p>Se Connecter</p>
          </div>
        </a>
      ) :
        (
          <a className={styles.logIn} onClick={() => handleLogout()}>
            <div>
              <Image src={deconnexion} width={32} height={32} alt="Se Connecter"/>
              <p>Se déconnecter</p>
            </div>
          </a>
        )
      }
      { isMenuOpen &&
      <LogInForm setIsMenuOpen={setIsMenuOpen}/>
      }
    </>
  );
}