import { ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes, Range } from "@tiptap/core";

import { ImageBlockView } from "./components/ImageBlockView";
import { Image } from "../Image";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageBlock: {
      setImageBlock: (attributes: { src: string, width: string }) => ReturnType
      setImageBlockAt: (attributes: { src: string; pos: number | Range }) => ReturnType
      setImageBlockAlign: (align: "left" | "center" | "right") => ReturnType
      setImageBlockWidth: (width: number) => ReturnType
    }
  }
}

export const ImageBlock = Image.extend({
  name: "imageBlock",

  group: "block",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML: element => element.getAttribute("src"),
        renderHTML: attributes => ({
          src: attributes.src,
        }),
      },
      width: {
        default: "100%",
        parseHTML: element => element.getAttribute("data-width"),
        renderHTML: attributes => ({
          "data-width": attributes.width,
        }),
      },
      align: {
        default: "center",
        parseHTML: element => element.getAttribute("data-align"),
        renderHTML: attributes => ({
          "data-align": attributes.align,
        }),
      },
      alt: {
        default: undefined,
        parseHTML: element => element.getAttribute("alt"),
        renderHTML: attributes => ({
          alt: attributes.alt,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        // Modifiez la balise pour capturer les images et les transformer en imageBlock
        tag: "img",
        getAttrs: node => ({
          src: node.getAttribute("src"),
          width: node.getAttribute("data-width") || "100%", // Vous pouvez ajuster ceci selon vos besoins
          align: node.getAttribute("data-align") || "center", // Vous pouvez définir une valeur par défaut ici
          alt: node.getAttribute("alt"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setImageBlock:
        attrs =>
          ({ commands }) => {
            return commands.insertContent({ type: "imageBlock", attrs: { src: attrs.src, width: attrs.width } });
          },

      setImageBlockAt:
        attrs =>
          ({ commands }) => {
            return commands.insertContentAt(attrs.pos, { type: "imageBlock", attrs: { src: attrs.src } });
          },

      setImageBlockAlign:
        align =>
          ({ commands }) =>
            commands.updateAttributes("imageBlock", { align }),

      setImageBlockWidth:
        width =>
          ({ commands }) =>
            commands.updateAttributes("imageBlock", { width: `${Math.max(0, Math.min(100, width))}%` }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockView);
  },
});

export default ImageBlock;
