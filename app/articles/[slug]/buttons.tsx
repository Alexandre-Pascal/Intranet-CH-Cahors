"use client";
import { useAppContext } from "@/app/lib/utils/AppContext";
import { use, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { canEdit } from "@/app/lib/utils/access";
import { RoleObjectDb, SubCategory, Title } from "@/app/lib/utils/types";
import getRole from "@/app/lib/utils/getRole";

interface ButtonsProps {
  slug: string;
  subCategorie?: SubCategory;
  title?: Title;
}

export default function Buttons({ slug, subCategorie }: ButtonsProps) {
  const { session } = useAppContext();

  const [role, setRole] = useState<RoleObjectDb>();

  const [isEditable, setIsEditable] = useState<boolean>(false);

  useEffect(() => {
    if (session){
      const fetchRole = async() => {
        setRole(await getRole(session));
      };
      fetchRole();
    }},[session]
  );

  useEffect(() => {
    if (role){
      if (subCategorie?.sub_category_id){
        setIsEditable(canEdit(subCategorie, undefined, role) as boolean);
      }
    }
  }
  ,[role]);

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
    <>
      { isEditable && (
        <div className={`${styles.container_buttons} ${styles.clear}`}>
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
      )}
    </>
  );
}