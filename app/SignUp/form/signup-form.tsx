// app/ui/signup-form.tsx

"use client";
import { SignupButton } from "./signup-button";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { signup } from "@/app/actions/auth";

import styles from "../styles.module.css";

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
  const { pending } = useFormStatus();

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
    } else if (result?.message) {
      alert(result.message);
    }
    else {
      alert("Inscription réussie");
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
        <button type="submit">S'enregizzstrer</button>
      </form>
    </div>
  );
}
