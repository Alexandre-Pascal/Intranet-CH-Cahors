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
import Icon from "@/app/lib/utils/Icon";
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
                <button>Insérer colonne à gauche</button>
              </div>
              <div onClick={() => editor.chain().focus().addColumnAfter().run()}>
                <Icon name="ArrowRightToLine" />
                <button>Insérer colonne à droite </button>
              </div>
              <div onClick={() => editor.chain().focus().deleteColumn().run()}>
                <Icon name="Trash" />
                <button>Supprimer colonne</button>
              </div>
            </div>
            <div className={styles.columns}>
              <div onClick={() => editor.chain().focus().addRowBefore().run()}>
                <Icon name="ArrowUpToLine" />
                <button >Insérer ligne au dessus</button>
              </div>
              <div onClick={() => editor.chain().focus().addRowAfter().run()}>
                <Icon name="ArrowDownToLine" />
                <button>Insérer ligne en dessous</button>
              </div>
              <div onClick={() => editor.chain().focus().deleteRow().run()}>
                <Icon name="Trash" />
                <button>Supprimer ligne</button>
              </div>
            </div>
          </div>
          <div className={styles.deleteTable} onClick={() => editor.chain().focus().deleteTable().run()}>
            <Icon name="Trash" />
            <button>Supprimer tableau</button>
          </div>
        </div>
      </BubbleMenu>
      } */}

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

    </>
  );
}
