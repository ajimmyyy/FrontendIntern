import {
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { IssueDialog } from "./issue-dialog";
import { MdOutlineAdd } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";
import { CreateIssues } from "@/actions/create-issue";

export default function AddButton({onAdd}: {onAdd: (value: boolean) => void}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleSave = async (title:string, body:string) => {
    if (title.trim() === '' || body.trim().length < 30) {
      toast.error('Title is required and body must be at least 30 characters long');
      return;
    }

    try {
      await CreateIssues(title, body);
      onAdd(true);
      toast.success('Issue created successfully');
      handleOpen();
    } catch (error) {
      toast.error('Failed to create issue');
      console.error(error);
    }
  };

  return (
    <Tooltip
      content="add new article"
    >
      <>
        <IconButton
          placeholder=""
          variant="outlined"
          className="rounded-full"
          color="white"
          onClick={handleOpen}
        >
          <MdOutlineAdd size={40} />
        </IconButton>
        <IssueDialog open={open} handleOpen={handleOpen} handleSave={handleSave} defaultBody="" defaultTitle=""/>
      </>
    </Tooltip>
  );
}