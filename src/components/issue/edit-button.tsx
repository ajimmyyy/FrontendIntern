import {
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { IssueDialog } from "./issue-dialog";
import { EditIssue } from "@/actions/edit-issue";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";

export default function EditButton({ issueNumber, title, body }: { issueNumber: number, title: string, body: string}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleSave = async (title:string, body:string) => {
    if (title.trim() === '' || body.trim().length < 30) {
      toast.error('Title is required and body must be at least 30 characters long');
      return;
    }

    try {
      await EditIssue(issueNumber, title, body);
      toast.success('Issue created successfully');
      handleOpen();
    } catch (error) {
      toast.error('Failed to create issue');
      console.error(error);
    }
  };

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
        <IssueDialog open={open} handleOpen={handleOpen} handleSave={handleSave} defaultTitle={title} defaultBody={body}/>
      </>
    </Tooltip>
  );
}