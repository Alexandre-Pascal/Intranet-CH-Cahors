// components/Titles.tsx

import React, { useEffect, useState } from "react";

const Titles = () => {
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTitles = async() => {
      try {
        const res = await fetch("/api/menu/");
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await res.json();
        setTitles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des titres:", error);
        setError("Une erreur s'est produite lors de la récupération des titres.");
      }
    };
    fetchTitles();
  }, []);

  return (
    <div>
      <h2>Titres</h2>
      {error ? (
        <p>Erreur : {error}</p>
      ) : (
        <ul>
          {titles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Titles;
