import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";

export default function EditButton({ issueNumber }: { issueNumber: number }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Tooltip
      content="edit article"
    >
      <>
        <Button
          placeholder=""
          color="gray"
          className="flex items-center justify-center rounded-full gap-1 h-7"
          onClick={handleOpen}
        >
          <MdEdit size={15} />
          edit
        </Button>
      </>
    </Tooltip>
  );
}