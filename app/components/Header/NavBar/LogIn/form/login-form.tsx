// app/ui/login-form.tsx

"use client";
import { LogInButton } from "./login-button";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/app/lib/utils/Icon";
// import { login } from "@/app/actions/auth";
import { getSession, login, logout } from "@/app/lib/session";

import styles from "../styles.module.css";
import { redirect } from "next/navigation";

interface LogInFormProps {
  setIsMenuOpen:(isMenuOpen : boolean) => void;
}

export function LogInForm({ setIsMenuOpen }: LogInFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const { pending } = useFormStatus();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datas : FormData = new FormData();
    datas.append("email", formData.email);
    datas.append("password", formData.password);
    const result = await login(datas);
    // vérifier si les données existent dans la bd

    // let session;
    if (result?.errors) {
      setErrors(result.errors);
    }
    else {
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.login_container}>
      <form
        className={styles.login_form}
        onSubmit={handleSubmit}>
        <p className={styles.cross} onClick={() => setIsMenuOpen(false)}><Icon name="X" className={styles.icon} /></p>
        <h2>Connectez-vous</h2>
        <div className={styles.email_container}>
          <input id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          {errors?.email && <p id={styles.email_error}>{errors.email}</p>}
        </div>

        <div className={styles.password_container}>
          <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe"/>
          {errors?.password && (
            <div>
              <p id={styles.password_error}>{errors.password}</p>
            </div>
          )}
        </div>

        <LogInButton pending={pending} />

        <div className={styles.sign_in}>
          <label>Vous n'avez pas de compte ? </label>
          <a className={styles.button} href="/SignUp">S'inscrire</a>
        </div>
      </form>
    </div>
  );
}
