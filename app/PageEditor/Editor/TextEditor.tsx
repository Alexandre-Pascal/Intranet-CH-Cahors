"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommand from "./slash-command";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import React, { useEffect } from "react";
import styles from "./styles.module.css";
import NextImage from "next/image";

import ajoutColDroit from "@/app/assets/icons/ajoutColDroit.png";
import ajoutColGauche from "@/app/assets/icons/ajoutColGauche.png";
import ajoutLigneBas from "@/app/assets/icons/ajoutLigneBas.png";
import ajoutLigneHaut from "@/app/assets/icons/ajoutLigneHaut.png";
import supprCol from "@/app/assets/icons/supprCol.png";
import supprLigne from "@/app/assets/icons/supprLigne.png";
import supprTable from "@/app/assets/icons/supprimer.png";
import insererTable from "@/app/assets/icons/insererTab.png";
import TaskItem from "@tiptap/extension-task-item";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { BulletList, FontSize, ImageBlock, Link, Underline, ImageUpload } from "@/app/extensions";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import ImageBlockMenu from "@/app/extensions/ImageBlock/components/ImageBlockMenu";
import Image from "@tiptap/extension-image";
import { TextMenu } from "./TextMenu/TextMenu";

import { newArticle, article } from "@/app/lib/utils/types";

import { useForm } from "react-hook-form";
import generateTitleId from "@/app/lib/utils/generateId";

export default function Editor({ kind, idPage } : {kind : string, idPage : string}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit,
      Placeholder.configure({
        placeholder: "Tapez '/' pour voir les commandes disponibles ou commencez à écrire du texte.",
      }),
      SlashCommand,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskItem,
      //TaskList,//marche pas ; update c'est bon marche mais je dégage
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal",
        },
        keepMarks: true,
        keepAttributes: true,
      }) , // mrche pas
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc",
        },
      }),
      ListItem,
      FontFamily,
      TextStyle,
      FontSize,
      Underline,
      Link,
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ImageBlock,
      Image,
      ImageUpload,
    ],
    onUpdate({ editor }) {
      console.log(editor.getHTML());
    },
  });

  const [isEditable, setIsEditable] = React.useState(true);
  const [title, setTitle] = React.useState("");

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  useEffect(() => {
    const fetchData = async() => {
      if (editor && kind === "update" && idPage) {
        try {
          const response = await fetch(`/api/articles/${idPage}`);
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
          }
          const jsonData = await response.json();
          editor.commands.setContent(jsonData.result.content);
          setTitle(jsonData.result.title);
        } catch (error) {
          console.error("Erreur:", error);
        }
      }
    };

    fetchData();
  }, [editor]);

  async function handleSubmitForm(title : string) {
    let newArticle = {
      title: title,
      content: editor?.getHTML(),
    } as newArticle;
    try {
      await fetch(
        "/api/articles/add-article",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newArticle),
        }
      );
      const newArticleUrl = generateTitleId(title);
      window.location.href = `/articles/${newArticleUrl}`; //redirige vers la page nouvellement créée
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  }

  async function handleUpdateForm() {
    let newArticle = {
      title: watch("title"),
      content: editor?.getHTML(),
    } as newArticle;
    try {
      await fetch(
        `/api/articles/${idPage}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newArticle),
        }
      );
      const newArticleUrl = generateTitleId(watch("title"));
      console.log(newArticle);
      window.location.href = `/articles/${newArticleUrl}`; //redirige vers la page nouvellement créée
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  }

  //popup confirm delete
  const handleDelete = () => {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      handleDeleteArticle();
    }
  };

  async function handleDeleteArticle() {
    try {
      await fetch(
        `/api/articles/${idPage}`,
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
      <form onSubmit={handleSubmit((data) => kind == "create" ? handleSubmitForm(data.title) : handleUpdateForm())} className="w-full">
        <input {...register("title", { required : true, minLength : 3, maxLength: 50 })} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de la page" className="w-full p-2 text-4xl font-bold text-center mt-4" />
        <EditorContent editor={editor} />
        {editor &&
        <>
          <ImageBlockMenu editor={editor}/>
          <TextMenu editor={editor}/>
          <BubbleMenu editor={editor}
            shouldShow={({ editor }) => editor.isActive("table") ? true : false}
            tippyOptions={{ duration: 100 }}
          >
            <div className={styles.columnsIcons}>
              <NextImage className={styles.icons} height={32} width={32} src={ajoutLigneHaut} title="Insérer une ligne au dessus" alt="Insérer une ligne au dessus" onClick={() => editor.chain().focus().addRowBefore().run()} />
              <NextImage className={styles.icons} height={32} width={32} src={ajoutLigneBas} title="Insérer une ligne en dessous" alt="Insérer une ligne en dessous" onClick={() => editor.chain().focus().addRowAfter().run()} />
              <NextImage className={styles.icons} height={32} width={32} src={ajoutColGauche} title="Insérer une colonne à gauche" alt="Insérer une colonne à gauche" onClick={() => editor.chain().focus().addColumnBefore().run()} />
              <NextImage className={styles.icons} height={32} width={32} src={ajoutColDroit} title="Insérer une colonne à droite" alt="Insérer une colonne à droite" onClick={() => editor.chain().focus().addColumnAfter().run()} />
              <NextImage className={styles.icons} height={32} width={32} src={supprLigne} title="Supprimer une ligne" alt="Supprimer une ligne" onClick={() => editor.chain().focus().deleteRow().run()} />
              <NextImage className={styles.icons} height={32} width={32} src={supprCol} title="Supprimer une colonne" alt="Supprimer une colonne" onClick={() => editor.chain().focus().deleteColumn().run()} />
              <NextImage className={styles.icons} height={32} width={32} src={supprTable} title="Supprimer le tableau" alt="Supprimer le tableau" onClick={() => editor.chain().focus().deleteTable().run()} />
              <NextImage className={styles.icons} height={32} width={32} src={insererTable} title="Insérer un tableau" alt="Insérer un tableau" onClick={() => editor.chain().focus().insertTable().run()} />
            </div>
          </BubbleMenu>

          {errors.title && <p className="text-red-500 text-lg font-bold">Le titre  doit contenir au moins 3 caractères et maximum 50 !</p>}
          <div className={styles.container_buttons}>
            <button type="button" onClick={() => window.location.href = "/" } className="bg-stone-300 hover:bg-stone-500	 text-white font-bold py-2 px-4 rounded mt-4">Annuler</button>
            { kind === "update" && <button type="button" onClick={() => handleDelete()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Supprimer</button> }
            { kind === "create" && <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Publier</button>}
            { kind === "update" && <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Mettre à jour</button> }
          </div>
        </>
        }
      </form>
    </div>
  );

}

