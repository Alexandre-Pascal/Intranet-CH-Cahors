import { Editor } from "@tiptap/react";
import { useMemo } from "react";
import { ContentPickerOptions } from "../components/ContentTypePicker";

// Premiere partie du composant menu

export const useTextmenuContentTypes = (editor: Editor) => {
  const options = useMemo<ContentPickerOptions>(() => {
    return [
      {
        type: "category",
        label: "Hierarchy",
        id: "hierarchy",
      },
      {
        icon: "Pilcrow",
        onClick: () => editor.chain().focus().lift("taskItem").liftListItem("listItem").setParagraph().run(),
        id: "paragraph",
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive("paragraph") &&
          !editor.isActive("orderedList") &&
          !editor.isActive("bulletList") &&
          !editor.isActive("taskList"),
        label: "Paragraphe",
        type: "option",
      },
      {
        icon: "Heading1",
        onClick: () => editor.chain().focus().lift("taskItem").liftListItem("listItem").setHeading({ level: 1 }).run(),
        id: "heading1",
        disabled: () => !editor.can().setHeading({ level: 1 }),
        isActive: () => editor.isActive("heading", { level: 1 }),
        label: "Titre 1",
        type: "option",
      },
      {
        icon: "Heading2",
        onClick: () => editor.chain().focus().lift("taskItem").liftListItem("listItem").setHeading({ level: 2 }).run(),
        id: "heading2",
        disabled: () => !editor.can().setHeading({ level: 2 }),
        isActive: () => editor.isActive("heading", { level: 2 }),
        label: "Titre 2",
        type: "option",
      },
      {
        icon: "Heading3",
        onClick: () => editor.chain().focus().lift("taskItem").liftListItem("listItem").setHeading({ level: 3 }).run(),
        id: "heading3",
        disabled: () => !editor.can().setHeading({ level: 3 }),
        isActive: () => editor.isActive("heading", { level: 3 }),
        label: "Titre 3",
        type: "option",
      },
      {
        type: "category",
        label: "Listes",
        id: "lists",
      },
      {
        icon: "List",
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        id: "bulletList",
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive("bulletList"),
        label: "Liste à puces",
        type: "option",
      },
      {
        icon: "ListOrdered",
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        id: "orderedList",
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive("orderedList"),
        label: "Liste numérotée",
        type: "option",
      },
    ];
  }, [editor, editor.state]);

  return options;
};
