"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommand from "./slash-command";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import React, { useState, useEffect } from "react";
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
import { BulletList, FontSize, ImageBlock, Link, Underline, ImageUpload, VideoUpload } from "@/app/extensions";
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

import { newArticle } from "@/app/lib/utils/types";

import { useForm } from "react-hook-form";
import generateTitleId from "@/app/lib/utils/generateId";
import FilesManager from "./FilesManager/FilesManager";

import { useAppContext } from "@/app/lib/utils/AppContext";
// import { Button, Modal, Input, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Video } from "@/app/extensions/VideoUpload/video";

export default function Editor({ kind, idPage } : {kind : string, idPage : string}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { currentIdPage, setCurrentIdPage } = useAppContext();

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
      Video,
      VideoUpload,
    ],
    onUpdate({ editor }) {
      console.log(editor.getHTML());
    },
  });

  if(Number(currentIdPage) == 0) {
    if (kind == "update" && idPage){
      setCurrentIdPage(idPage);
    }
    else{
      setCurrentIdPage(generateTitleId());
    }
  }

  // const [isVideoInputModalOpen, setIsVideoInputModalOpen] = useState(false);

  // const [videoUrl, setVideoUrl] = useState("/video.mp4");
  // const addVideo = () => editor?.commands.setVideo(videoUrl) && closeModal();

  // const openModal = () => setIsVideoInputModalOpen(true);

  // const closeModal = () => setIsVideoInputModalOpen(false);

  function replaceTempFiles(html : any) {
    return html.replace(/\/tempFiles\/\d+\//, `/savedFiles/${idPage}`);
  }

  // Fonction pour remplacer les balises <p> vides par un retour à la ligne
  function replaceEmptyParagraphs(html: any) {
    return html.replace(/<p><\/p>/g, "<br>");
  }

  // Fonction principale pour traiter le code HTML
  useEffect(() => {
    let processedHTML = replaceTempFiles(content);
    processedHTML = replaceEmptyParagraphs(processedHTML);
    editor?.commands.setContent(processedHTML);
  }
  , [content]);

  useEffect(() => {
    const fetchData = async() => {
      if (editor && kind === "update" && idPage) {
        try {
          const response = await fetch(`/api/articles/${idPage}`);
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
          }
          const jsonData = await response.json();

          setContent(jsonData.result.content);
          setTitle(jsonData.result.title);
        } catch (error) {
          console.error("Erreur:", error);
        }
      }
    };

    fetchData();
  }
  , [editor, kind, idPage]);

  // useEffect(() => {
  //   const fetchData = async() => {
  //     if (editor && kind === "update" && idPage) {
  //       try {
  //         const response = await fetch(`/api/articles/${idPage}`);
  //         if (!response.ok) {
  //           throw new Error("Erreur lors de la récupération des données");
  //         }
  //         const jsonData = await response.json();

  //         // Récupérer le contenu HTML du JSON
  //         const htmlContent = jsonData.result.content;

  //         // Analyser la chaîne HTML pour extraire les balises p et les images
  //         const parser = new DOMParser();
  //         const doc = parser.parseFromString(htmlContent, "text/html");
  //         const paragraphs = doc.querySelectorAll("p");

  //         // Parcourir chaque balise p dans l'ordre
  //         paragraphs.forEach(p => {
  //           // Récupérer le texte à l'intérieur du paragraphe
  //           const text = p.textContent.trim();

  //           // Vérifier si le paragraphe est vide
  //           if (text === "") {
  //             // Insérer un retour à la ligne dans l'éditeur Tiptap
  //             editor.chain().focus().insertContent({ type: "hardBreak" }).run();
  //           } else {
  //             // Créer un nœud de paragraphe Tiptap pour chaque balise p non vide
  //             const paragraphNode = {
  //               type: "paragraph",
  //               content: [{ type: "text", text }],
  //             };

  //             // Insérer le nœud de paragraphe dans l'éditeur Tiptap
  //             editor.chain().focus().insertContent(paragraphNode).run();
  //           }
  //         });

  //         // Trouver les images et insérer les nœuds image block correspondants
  //         const images = doc.querySelectorAll("img");
  //         images.forEach(img => {
  //           const src = img.getAttribute("src");
  //           const alt = img.getAttribute("alt");
  //           const width = img.getAttribute("data-width");
  //           const align = img.getAttribute("data-align");

  //           // Créer un nœud image block Tiptap
  //           const imageNode = {
  //             type: "imageBlock",
  //             attrs: {
  //               src: src.replace(/.*(?=\/uploadedFiles)/, "").replace(/\/%22$/, ""),
  //               alt,
  //               width,
  //               align,
  //             },
  //           };

  //           // Trouver l'index de l'image dans le contenu HTML pour l'afficher au bon encdroit
  //           const index = Array.from(img.parentNode.children).indexOf(img);
  //           //insérer l'élément image dans l'éditeur Tiptap au nivau de l'index correspondant
  //           // editor.chain().focus().insertContentAt(index, imageNode).run();
  //           //editor.chain().focus().insertContent(imageNode).run(); n'est pas bon car, l'index vaut 5 et l'image est inséréré après le 5ème caracète, alors que je veux qu'elle soit insérée après le 5 ème élément
  //           //donc pour faire ça
  //           editor.chain().focus().insertContent(imageNode).run();

  //         });

  //         // Définir le titre de la page
  //         setTitle(jsonData.result.title);
  //       } catch (error) {
  //         console.error("Erreur:", error);
  //       }
  //       document.querySelectorAll("img").forEach((image) => {
  //         if (image.src.includes("tempFiles")) {
  //           console.log(image.src);
  //           image.src = image.src.replace(/tempFiles\/\d+/, `savedFiles/${idPage}`);
  //           console.log(image.src);
  //         }
  //       });

  //       alert("Le contenu de l'article a été chargé avec succès !");
  //       console.log("contenu final : ", editor.getHTML());
  //       alert ("contenu final : " + editor.getHTML());

  //     }
  //   };

  //   fetchData();
  // }, [editor, kind, idPage]);

  async function handleSubmitForm(title : string) {

    const newArticle = {
      title: title,
      content: editor?.getHTML(),
    } as newArticle;
    try {
      await fetch(
        `/api/articles/${currentIdPage}`,
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
    const newArticle = {
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
    <div className="editor">
      <form onSubmit={handleSubmit((data) => kind == "create" ? handleSubmitForm(data.title) : handleUpdateForm())} className="w-full">
        <input
          {...register(
            "title",
            {
              required : true,
              minLength : 3,
              maxLength: 50,
            }
          )
          }
          type="text"
          value={title}
          onChange={
            (e) => setTitle(e.target.value)
          }
          placeholder="Titre de la page"
          className="w-full p-2 text-4xl font-bold text-center mt-4"
        />

        <EditorContent editor={editor}/>
        {editor &&
        <>
          <ImageBlockMenu editor={editor}/>
          <TextMenu editor={editor}/>
          <BubbleMenu editor={editor}
            shouldShow={({ editor }) => editor.isActive("table") ? true : false}
            tippyOptions={{ duration: 100 }}
          >
            <div className={styles.columnsIcons}>
              <NextImage
                className={styles.icons}
                height={32}
                width={32}
                src={ajoutLigneHaut}
                title="Insérer une ligne au dessus"
                alt="Insérer une ligne au dessus"
                onClick={
                  () => editor.chain().focus().addRowBefore().run()
                }
              />
              <NextImage
                className={styles.icons}
                height={32}
                width={32}
                src={ajoutLigneBas}
                title="Insérer une ligne en dessous"
                alt="Insérer une ligne en dessous"
                onClick={
                  () => editor.chain().focus().addRowAfter().run()
                }
              />
              <NextImage
                className={styles.icons}
                height={32}
                width={32}
                src={ajoutColGauche}
                title="Insérer une colonne à gauche"
                alt="Insérer une colonne à gauche"
                onClick={
                  () => editor.chain().focus().addColumnBefore().run()
                }
              />
              <NextImage
                className={styles.icons}
                height={32}
                width={32}
                src={ajoutColDroit}
                title="Insérer une colonne à droite"
                alt="Insérer une colonne à droite"
                onClick={
                  () => editor.chain().focus().addColumnAfter().run()
                }
              />
              <NextImage
                className={styles.icons}
                height={32}
                width={32}
                src={supprLigne}
                title="Supprimer une ligne"
                alt="Supprimer une ligne"
                onClick={
                  () => editor.chain().focus().deleteRow().run()
                }
              />
              <NextImage
                className={styles.icons}
                height={32}
                width={32}
                src={supprCol}
                title="Supprimer une colonne"
                alt="Supprimer une colonne" onClick={() => editor.chain().focus().deleteColumn().run()
                }
              />
              <NextImage
                className={styles.icons}
                height={32}
                width={32}
                src={supprTable}
                title="Supprimer le tableau" alt="Supprimer le tableau" onClick={() => editor.chain().focus().deleteTable().run()
                }
              />
              <NextImage
                className={styles.icons}
                height={32}
                width={32}
                src={insererTable}
                title="Insérer un tableau" alt="Insérer un tableau" onClick={() => editor.chain().focus().insertTable().run()
                }
              />
            </div>
          </BubbleMenu>

          {
            errors.title &&
            <>
              {
                kind === "update" &&
            <p className={["text-black-500 text-lg ml-10"].join(" ")}>
            Si vous n'avez pas modifié le titre, veuillez cliquer à nouveau sur le bouton "Mettre à jour", sinon :
            </p>
              }
              <p className={["text-red-500 text-lg font-bold ml-10"].join(" ")}>
            Le titre doit contenir au moins 3 caractères et maximum 50 !
              </p>
            </>
          }
          <div className={styles.container_buttons}>
            <button type="button"
              onClick={() => window.location.href = "/" }
              className="bg-stone-300 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Annuler
            </button>
            {
              kind === "update" &&
            <button type="button"
              onClick={() => handleDelete()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Supprimer
            </button>
            }
            {
              kind === "create" &&
            <button type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Publier
            </button>
            }
            {
              kind === "update" &&
            <button type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Mettre à jour
            </button>
            }
          </div>
          {
            (idPage || Number(currentIdPage) !== 0) && <FilesManager idPage={idPage !== "" ? idPage : Number(currentIdPage)} onlyView={false}/>
          }
          {/* <video controls src="/video.mp4"/>
          <div>
            <Button onClick={openModal}> Add Video </Button>
            <Modal
              closeButton
              aria-labelledby="modal-title"
              isOpen={isVideoInputModalOpen}
              onClose={closeModal}
            >
              <ModalHeader>
                <h2 id="modal-title" className="text-2xl">
                  Add Video Url
                </h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Enter video url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)
                  }

                  fullWidth
                  color="primary"
                  size="lg"

                  autoFocus
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={closeModal}>
        Fermer
                </Button>
                <Button color="warning" onClick={addVideo}>
        Ajouter une vidéo
                </Button>
              </ModalFooter>
            </Modal>
          </div> */}
        </>
        }
      </form>
    </div>
  );
}

