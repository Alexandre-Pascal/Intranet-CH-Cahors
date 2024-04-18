"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommand from "./slash-command";
import Table from "@tiptap/extension-table"; // Importez l'extension de tableau
import TableRow from "@tiptap/extension-table-row"; // Importez l'extension de ligne de tableau
import TableHeader from "@tiptap/extension-table-header"; // Importez l'extension d'en-tête de tableau
import TableCell from "@tiptap/extension-table-cell"; // Importez l'extension de cellule de tableau

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
    ]
    ,
    content: "<h1>Untitled</h1>",
  });

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}