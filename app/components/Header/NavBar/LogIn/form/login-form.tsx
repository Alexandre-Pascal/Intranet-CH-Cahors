// app/ui/login-form.tsx

"use client";
import { LogInButton } from "./login-button";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/app/lib/utils/Icon";
// import { login } from "@/app/actions/auth";

import styles from "../styles.module.css";

interface LogInFormProps {
  setIsMenuOpen:(isMenuOpen : boolean) => void;
}

export function LogInForm({ setIsMenuOpen }: LogInFormProps) {
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
    // const result = await login(datas);
    const result = null;
    if (result?.errors) {
      setErrors(result.errors);
      alert("Please fix the errors in the form");
    } else if (result?.message) {
      alert(result.message);
    }
    else {
      alert("Success");
    }
  };

  return (
    <div className={styles.login_container}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <p className={styles.cross} onClick={() => setIsMenuOpen(false)}><Icon name="X" className={styles.icon} /></p>
        <h2>Connectez-vous</h2>
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

        <LogInButton pending={pending} />

        <div className={styles.sign_in}>
          <label>Vous n'avez pas de compte ? </label>
          <a className={styles.button} href="/SignUp">S'inscrire</a>
        </div>
      </form>
    </div>
  );
}
