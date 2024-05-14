import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback } from "react";

import { VideoUploader } from "./VideoUploader";

export const VideoUpload = ({ getPos, editor }: { getPos: () => number; editor: Editor }) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        editor.chain().setVideo(url).deleteRange({ from: getPos(), to: getPos() }).focus().run();
      }
    },
    [getPos, editor],
  );

  return (
    <NodeViewWrapper>
      <div className="p-0 m-0" data-drag-handle>
        <VideoUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  );
};

export default VideoUpload;
