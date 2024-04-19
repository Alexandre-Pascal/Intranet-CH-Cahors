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
      {editor && <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive("table") ? true : false}

        tippyOptions={{ duration: 100 }}>
        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
          addColumnBefore
        </button>
        <button className={editor.isActive("italic") ? "is-active" : ""} onClick={() => editor.chain().focus().addColumnAfter().run()}>addColumnAfter</button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>deleteColumn</button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()}>addRowBefore</button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>addRowAfter</button>
        <button onClick={() => editor.chain().focus().deleteRow().run()}>deleteRow</button>
        <button onClick={() => editor.chain().focus().deleteTable().run()}>deleteTable</button>
      </BubbleMenu>}

    </>
  );
}
