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
import { Icon } from "@/app/lib/utils/Icon";
import styles from "./styles.module.css";
import Image from "next/image";

import ajoutColDroit from "@/app/assets/icons/ajoutColDroit.png";
import ajoutColGauche from "@/app/assets/icons/ajoutColGauche.png";
import ajoutLigneBas from "@/app/assets/icons/ajoutLigneBas.png";
import ajoutLigneHaut from "@/app/assets/icons/ajoutLigneHaut.png";
import supprCol from "@/app/assets/icons/supprCol.png";
import supprLigne from "@/app/assets/icons/supprLigne.png";
import supprTable from "@/app/assets/icons/supprimer.png";
import insererTable from "@/app/assets/icons/insererTab.png";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { TextMenu } from "./TextMenu/TextMenu";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import OrderedList from "@tiptap/extension-ordered-list";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize, Link, Underline } from "@/app/extensions";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder,
      SlashCommand,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskItem,
      TaskList,//marche pas
      OrderedList, // mrche pas
      FontFamily,
      TextStyle,
      FontSize,
      Underline,
      Link,
      Highlight,
      Color,
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<h1>Untitled</h1>",
  });

  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <>
      <div>
        <EditorContent editor={editor} />
      </div>
      {/* {
        editor &&
      <BubbleMenu editor={editor}
        shouldShow={({ editor }) => editor.isActive("table") ? true : false}
        tippyOptions={{ duration: 100 }}
      >
        <div className={styles.table}>
          <div className={styles.rows}>
            <div className={styles.columns}>
              <div onClick={() => editor.chain().focus().addColumnBefore().run()}>
                <Icon name="ArrowLeftToLine" />
                <Image>Insérer colonne à gauche</Image>
              </div>
              <div onClick={() => editor.chain().focus().addColumnAfter().run()}>
                <Icon name="ArrowRightToLine" />
                <Image>Insérer colonne à droite </Image>
              </div>
              <div onClick={() => editor.chain().focus().deleteColumn().run()}>
                <Icon name="Trash" />
                <Image>Supprimer colonne</Image>
              </div>
            </div>
            <div className={styles.columns}>
              <div onClick={() => editor.chain().focus().addRowBefore().run()}>
                <Icon name="ArrowUpToLine" />
                <Image >Insérer ligne au dessus</Image>
              </div>
              <div onClick={() => editor.chain().focus().addRowAfter().run()}>
                <Icon name="ArrowDownToLine" />
                <Image>Insérer ligne en dessous</Image>
              </div>
              <div onClick={() => editor.chain().focus().deleteRow().run()}>
                <Icon name="Trash" />
                <Image>Supprimer ligne</Image>
              </div>
            </div>
          </div>
          <div className={styles.deleteTable} onClick={() => editor.chain().focus().deleteTable().run()}>
            <Icon name="Trash" />
            <Image>Supprimer tableau</Image>
          </div>
        </div>
      </BubbleMenu>
      } */}
      {editor && <TextMenu editor={editor} />}

      {
        editor &&
      <BubbleMenu editor={editor}
        shouldShow={({ editor }) => editor.isActive("table") ? true : false}
        tippyOptions={{ duration: 100 }}
      >
        <div className={styles.columnsIcons}>
          <Image className={styles.icons} height={32} width={32} src={ajoutLigneHaut} title="Insérer une ligne au dessus" alt="Insérer une ligne au dessus" onClick={() => editor.chain().focus().addRowBefore().run()} />
          <Image className={styles.icons} height={32} width={32} src={ajoutLigneBas} title="Insérer une ligne en dessous" alt="Insérer une ligne en dessous" onClick={() => editor.chain().focus().addRowAfter().run()} />
          <Image className={styles.icons} height={32} width={32} src={ajoutColGauche} title="Insérer une colonne à gauche" alt="Insérer une colonne à gauche" onClick={() => editor.chain().focus().addColumnBefore().run()} />
          <Image className={styles.icons} height={32} width={32} src={ajoutColDroit} title="Insérer une colonne à droite" alt="Insérer une colonne à droite" onClick={() => editor.chain().focus().addColumnAfter().run()} />
          <Image className={styles.icons} height={32} width={32} src={supprLigne} title="Supprimer une ligne" alt="Supprimer une ligne" onClick={() => editor.chain().focus().deleteRow().run()} />
          <Image className={styles.icons} height={32} width={32} src={supprCol} title="Supprimer une colonne" alt="Supprimer une colonne" onClick={() => editor.chain().focus().deleteColumn().run()} />
          <Image className={styles.icons} height={32} width={32} src={supprTable} title="Supprimer le tableau" alt="Supprimer le tableau" onClick={() => editor.chain().focus().deleteTable().run()} />
          <Image className={styles.icons} height={32} width={32} src={insererTable} title="Insérer un tableau" alt="Insérer un tableau" onClick={() => editor.chain().focus().insertTable().run()} />
        </div>
      </BubbleMenu>
      }
      {/*
      {
        editor &&
      <BubbleMenu editor={editor}
        tippyOptions={{ duration: 100 }}
      >
        <div className={styles.text_icons}>

          <Bold
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${styles.icons} ${styles.mono}`} width={32} height={32}
          />

          <Italic
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${styles.icons} ${styles.mono}`} width={32} height={32}
          />

          <Strikethrough
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${styles.icons} ${styles.mono}`} width={32} height={32}
          />
        </div>
      </BubbleMenu>
      } */}

    </>
  );
}
