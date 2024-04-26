import { LinkEditorPanel } from "@/app/components/panels";
import { Icon } from "@/app/lib/utils/Icon";
import { Toolbar } from "@/app/components/ui/ToolBar";
import * as Popover from "@radix-ui/react-popover";
import { EditLinkPopoverProps } from "@/app/lib/utils/types";

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="Insérer un lien">
          <Icon name="Link" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <LinkEditorPanel onSetLink={onSetLink} />
      </Popover.Content>
    </Popover.Root>
  );
};
