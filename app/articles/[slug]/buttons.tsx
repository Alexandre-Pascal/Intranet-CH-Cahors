"use client";

import styles from "./styles.module.css";
export default function Buttons({ slug } : { slug : string }){

  const handleEditArticle = () => {
    window.location.href = `/PageEditor/?CreateOrUpdate=update&idPage=${slug}/`;
  };

  const handleDelete = () => {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      handleDeleteArticle();
    }
  };

  async function handleDeleteArticle() {
    try {
      await fetch(
        `/api/articles/${slug}`,
        {
          method: "DELETE",
        }
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  }

  return (
    <div>
      <div className={styles.container_buttons}>
        <button type="button"
          onClick={() => window.location.href = "/" }
          className="bg-stone-300 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded mt-4"
        >
                Accueil
        </button>

        <button type="button"
          onClick={() => handleDelete()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
                Supprimer
        </button>
        <button type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => handleEditArticle()}
        >
                Modifier
        </button>
      </div>
    </div>
  );
}