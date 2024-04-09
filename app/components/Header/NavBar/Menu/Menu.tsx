"use client";

import styles from "./styles.module.css";

// components/Titles.tsx

// const Titles = () => {
//   const [titles, setTitles] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTitles = async() => {
//       try {
//         const res = await fetch("/api/menu/");
//         if (!res.ok) {
//           throw new Error("Erreur lors de la récupération des données");
//         }
//         const data = await res.json();
//         setTitles(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des titres:", error);
//         setError("Une erreur s'est produite lors de la récupération des titres.");
//       }
//     };
//     fetchTitles();
//   }, []);

// return (
// <div>
//   <h2>Titres</h2>
//   {error ? (
//     <p>Erreur : {error}</p>
//   ) : (
//     <ul>
//       {titles.map((title, index) => (
//         <li key={index}>{title}</li>
//       ))}
//     </ul>
//   )}
// </div>
//   );
// };

// export default Titles;

// import prisma from "../../../../../lib/prisma";
// async function fetchTitles() {
//   const titles = await prisma.l76aj_content.findMany({
//     select: {
//       title: true,
//     },
//   });
//   return titles;
// }

// export default async function Titles() {
//   const titles = await fetchTitles();
//   // Extraire les 5 premiers titres
//   const firstFiveTitles = titles.slice(0, 5);
//   console.log(firstFiveTitles);
//   return (
//     <div>
//       <h2>Titres</h2>
//       <ul>
//         {firstFiveTitles.map((title, index) => (
//           <h1 key={index}>{title.title}</h1>
//         ))}
//       </ul>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";

// const FetchDataButton = ({ onClick }) => {
//   return (
//     <button onClick={onClick}>
//       Fetch Data
//     </button>
//   );
// };

// const MyPage = () => {
//   const [titles, setTitles] = useState([]);

//   const handleFetchData = async() => {
//     try {
//       const response = await axios.get("/api/fetchData");
//       setTitles(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div>
//       <FetchDataButton onClick={handleFetchData} />
//       {/* Afficher les titres récupérés */}
//       <ul>
//         {titles.map((title, index) => (
//           <li key={index}>{title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyPage;
import { useState } from "react";

import menu from "../../../../assets/icons/menu.png";

import Image from "next/image";

export default function Menu({ isMenuOpen, setIsMenuOpen }:
    {
      isMenuOpen: boolean,
      setIsMenuOpen: (value: boolean) => void
    })
{

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return(
    <div onClick={handleMenuClick} style={{ cursor: "pointer" }}>
      <Image src={menu} width={32} height={32} className={styles.rounded} alt="Menu"/>
      <p className={styles.altColorText}>Menu</p>
    </div>
  );
}