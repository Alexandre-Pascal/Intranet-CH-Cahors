"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";

import {
  Color,
  Dropcursor,
  FontFamily,
  FontSize,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  StarterKit,
  Subscript,
  Superscript,
  TextAlign,
  TextStyle,
  Underline,
  TaskItem,
  TaskList,
} from ".";
import { ImageUpload } from "./ImageUpload";
import { VideoUpload } from "./VideoUpload";

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null
  userId?: string
  userName?: string
  userColor?: string
}

export const ExtensionKit = ({ provider, userId, userName = "Maxi" }: ExtensionKitProps) => [
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  ImageUpload.configure({
    clientId: provider?.document?.clientID,
  }),
  ImageBlock,
  VideoUpload.configure({
    clientId: provider?.document?.clientID,
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Subscript,
  Superscript,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => "",
  }),
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
];

export default ExtensionKit;
