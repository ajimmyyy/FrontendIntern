import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
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
        <Dialog placeholder="" open={open} handler={handleOpen}>
          <DialogHeader placeholder="">
            <Typography placeholder="" variant="h5" color="blue-gray">
              Your Attention is Required!
            </Typography>
          </DialogHeader>
          <DialogBody placeholder="" divider className="grid place-items-center gap-4">
            The issue will be closed. Are you sure you want to proceed?
          </DialogBody>
          <DialogFooter placeholder="" className="space-x-2">
            <Button placeholder="" variant="text" color="blue-gray" onClick={handleOpen}>
              cancle
            </Button>
            <Button
              placeholder=""
              variant="gradient"
            >
              Ok, Close it
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </Tooltip>
  );
}