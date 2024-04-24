// Utilisez le mot-clé 'use server' pour indiquer que ce code est exécuté côté serveur
"use server";

export default async function Page() {

  const fetchData = async() => {
    try {
      // Récupérer les titres de la table l76aj_content avec Prisma
      // const titles = await prisma.l76aj_content.findMany({
      //   select: {
      //     title: true,
      //   },
      // });

      // Retourner le rendu de la page avec les titres récupérés
      const htmlContent = "<h1><span style=\"color: #ff0000\">Présentation de moi</span></h1><p><em>alors déjà j'aime l'eau</em></p><p><u>Mais ce que j'aime le plus</u></p><p><strong>C'est le ricard qui est dedans</strong></p><p>avec minimum <s>2</s> 3 glaçons</p><p></p><ul class=\"list-disc\"><li><p>ezeze</p></li><li><p>zeze</p></li><li><p>zezez</p></li></ul><p></p><p></p><ol class=\"list-decimal\"><li><p>zezez</p></li><li><p>zezez</p></li><li><p>zeeze</p></li><li><p>zeze</p></li></ol><p></p><h2 style=\"text-align: center\">Ce que je préfère dans le Ricard</h2><table style=\"minWidth: 50px\"><colgroup><col><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\"><p>Avantages</p></td><td colspan=\"1\" rowspan=\"1\"><p>Inconvénients</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\"><p>Absolument</p></td><td colspan=\"1\" rowspan=\"1\"><p>rien</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\"><p>tout</p></td><td colspan=\"1\" rowspan=\"1\"><p>du tout</p></td></tr></tbody></table><p></p>";
      return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}/>
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
