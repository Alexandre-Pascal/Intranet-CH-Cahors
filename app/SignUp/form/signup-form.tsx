// app/ui/signup-form.tsx

"use client";
import { useState } from "react";
import { signup } from "@/app/actions/auth";

import styles from "../styles.module.css";
import { login } from "@/app/lib/session";

// Page pour l'inscription

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    name?: string[];
    email?: string[];
    password?: string[];
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datas = new FormData();
    datas.append("name", formData.name);
    datas.append("email", formData.email);
    datas.append("password", formData.password);
    console.log("datas", datas);
    const result = await signup(datas);

    if (result?.errors) {
      setErrors(result.errors);
      alert("Remplissez correctement les champs");
    }
    else {
      alert("Inscription réussie");
      const loginDatas = new FormData();
      loginDatas.append("email", formData.email);
      loginDatas.append("password", formData.password);
      const result = await login(datas);
      // vérifier si les données existent dans la bd

      if (result?.errors) {
        setErrors(result.errors);
      }
      else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <form className={styles.signup_form} onSubmit={handleSubmit}>

        <h2>Inscrivez-vous</h2>
        <div>
          <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Prénom" />
          {errors?.name && <p>{errors.name}</p>}
        </div>

        <div>
          <input id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          {errors?.email && <p>{errors.email}</p>}
        </div>

        <div>
          <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe"/>
          {errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit">S'enregistrer</button>
      </form>
    </div>
  );
}
