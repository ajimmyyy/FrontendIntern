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
import { useState } from "react";

export function IssueDialog(
  { open, handleOpen, handleSave, defaultTitle = '', defaultBody = ''}: 
  { open: boolean; handleOpen: () => void;
    handleSave: (arg0: string, arg1: string) => void;
    defaultTitle?: string;
    defaultBody?: string;
  }) {
  const [title, setTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);

  return (
    <>
      <Dialog placeholder={undefined} open={open} size="sm" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader placeholder="" className="flex flex-col items-start">
            {" "}
            <Typography placeholder="" className="mb-1" variant="h4">
              Issue
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Body"
            className="h-full"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogBody>
        <DialogFooter placeholder={undefined} className="space-x-2">
          <Button placeholder={undefined} variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button placeholder={undefined} variant="gradient" color="gray" onClick={() => handleSave(title, body)}>
            save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}