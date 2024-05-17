"use client";

import { useState, useEffect } from "react";

export default function CreateRole() {

  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const categories_temp : string[] = [];
    const fetchArticles = async() => {
      try {
        const response = await fetch("/api/categories?value=name");
        const data = await response.json();
        data.data.forEach(element => {
          categories_temp.push(element.category_name);
        });
        setCategories(categories_temp);
      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchArticles();
  }, []);

  if (categories) {
    // alert(categories);
  }
  return (
    <div>
      <h1>Création de rôle</h1>
      <select
        name="categorie"
        id="categorie"
        onChange={(event) => {
          const categorieId = event.target.value;
          console.log(categorieId);
        }}
      >
        <option value="">Choisissez une catégorie</option>
        {categories.length > 0 && categories.map((categorie, index) => (
          <option key={index} value={categorie}>{categorie}</option>
        ))}
      </select>
    </div>
  );
}