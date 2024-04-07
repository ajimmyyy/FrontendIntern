import {
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { AddIssueDialog } from "./add-dialog";
import { MdOutlineAdd } from "react-icons/md";
import { useState } from "react";

export default function AddButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Tooltip
      content="add new article"
    >
      <>
        <IconButton
          placeholder
          variant="outlined"
          className="rounded-full"
          color="white"
          onClick={handleOpen}
        >
          <MdOutlineAdd size={40} />
        </IconButton>
        <AddIssueDialog open={open} handleOpen={handleOpen} />
      </>
    </Tooltip>
  );
}