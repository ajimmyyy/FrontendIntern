import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { CommentInfo } from "@/types/comment";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function CommentItem({ comment }: { comment: CommentInfo }) {
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <div className="inline-flex gap-2 w-2/3">
      <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler {...triggers}>
          <Avatar
            placeholder="https://images./photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="avatar"
            variant="rounded"
            size="md"
            className="mt-6 border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
            src={comment.user?.avatar_url}
          />
        </PopoverHandler>
        <PopoverContent placeholder="" {...triggers} className="z-50 max-w-[26rem]">
          <Typography
            placeholder=""
            variant="small"
            color="gray"
            className="font-normal text-blue-gray-500"
          >
            {comment.user?.login}
          </Typography>
        </PopoverContent>
      </Popover>
      <Card key={comment.id} placeholder="" className="mt-6 w-full">
        <CardBody placeholder="">
          <ReactMarkdown className="prose">
            {comment.body}
          </ReactMarkdown>
        </CardBody>
      </Card>
    </div>
  );
}