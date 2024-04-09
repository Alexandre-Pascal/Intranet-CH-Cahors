// Utilisez le mot-clé 'use server' pour indiquer que ce code est exécuté côté serveur
"use server";

// Importez PrismaClient
import prisma from "../utils/prisma";

export default async function Page() {

  const fetchData = async() => {
    try {
      // Récupérer les titres de la table l76aj_content avec Prisma
      const titles = await prisma.l76aj_content.findMany({
        select: {
          title: true,
        },
      });
      // Retourner le rendu de la page avec les titres récupérés
      return (
        <div>
          <h1>Titres du contenu</h1>
          {/* <div>
            {titles.map((title, index) => (
              <h1 key={index}>{title.title}</h1>
            ))}
          </div> */}
        </div>
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des titres:", error);
      // En cas d'erreur, retournez un message d'erreur
      return (
        <div>
          <p>Une erreur s&aposest produite lors de la récupération des titres.</p>
        </div>
      );
    }
  };

  // Renvoyer l'appel à la fonction fetchData pour exécuter la récupération des données
  return fetchData();
}
