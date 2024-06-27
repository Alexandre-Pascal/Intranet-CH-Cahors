import { Image as BaseImage } from "@tiptap/extension-image";

// Groupe créé discerné les images

export const Image = BaseImage.extend({
  group: "block",
});

export default Image;
