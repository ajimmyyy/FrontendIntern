import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { CreateIssues } from "@/actions/create-issue";
import { useState } from "react";
import { toast } from "sonner";

export function AddIssueDialog({ open, handleOpen }: { open: boolean; handleOpen: () => void }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSave = async () => {
    if (title.trim() === '' || body.trim().length < 30) {
      toast.error('Title is required and body must be at least 30 characters long');
      return;
    }

    try {
      await CreateIssues(title, body);
      handleOpen();
    } catch (error) {
      toast.error('Failed to create issue');
      console.error(error);
    }
  };

  return (
    <>
      <Dialog placeholder={undefined} open={open} size="sm" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader placeholder="" className="flex flex-col items-start">
            {" "}
            <Typography placeholder="" className="mb-1" variant="h4">
              New Issue
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody placeholder={undefined} className="h-[60vh] grid grid-rows-[auto,auto,1fr] gap-6">
          <Typography placeholder={undefined} className="-mb-1" color="blue-gray" variant="h6">
            Title
          </Typography>
          <Input 
            crossOrigin={undefined}
            label="Title" 
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea 
            label="Body" 
            className="h-full"
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogBody>
        <DialogFooter placeholder={undefined} className="space-x-2">
          <Button placeholder={undefined} variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button placeholder={undefined} variant="gradient" color="gray" onClick={handleSave}>
            save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}