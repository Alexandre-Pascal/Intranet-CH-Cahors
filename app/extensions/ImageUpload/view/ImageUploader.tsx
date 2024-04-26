import { Spinner } from "@/app/components/ui/Spinner";
import { useDropZone, useFileUpload, useUploader } from "./hooks";
import { Button } from "@/app/components/ui/button";
import { Icon } from "@/app/lib/utils/Icon";
import { cn } from "@/app/lib/utils";
import { ChangeEvent, useCallback } from "react";

export const ImageUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const { loading, uploadFile } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({ uploader: uploadFile });

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => (e.target.files ? uploadFile() : undefined),
    [uploadFile],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
        <Spinner className="text-neutral-500" size={1.5} />
      </div>
    );
  }

  const wrapperClass = cn(
    "flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80",
    draggedInside && "bg-neutral-100",
  );

  return (
    <div
      className={wrapperClass}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}
    >
      <Icon name="Image" className="w-12 h-12 mb-4 text-black dark:text-white opacity-20" />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
          {draggedInside ? "Déposez votre image ici" : "Glissez et déposez ou"}
        </div>
        <div>
          <Button type="button" disabled={draggedInside} onClick={handleUploadClick} variant="primary" buttonSize="small">
            <Icon name="Upload" />
            Chargez une image
          </Button>
        </div>
      </div>
      <input
        className="w-0 h-0 overflow-hidden opacity-0"
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageUploader;
