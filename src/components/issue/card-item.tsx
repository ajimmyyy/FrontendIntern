"use client"
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { CloseIssue } from "@/actions/close-issue";
import { IssueInfo } from "@/types/issue";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SlTrash } from "react-icons/sl";
import ReactMarkdown from "react-markdown";
import CloseButton from "./close-button";

export default function CardItem({ issue }: { issue: IssueInfo }) {
  const router = useRouter();
  const { data: session, status } = useSession()
  const LIMIT_LINE_NUM = 8;

  function limitTextLines(text: string, limit: number) {
    const lines = text.split('\n');
    if (lines.length <= limit) {
      return lines.join('\n');
    } else {
      const truncatedLines = lines.slice(0, limit);
      truncatedLines.push('...');
      return truncatedLines.join('\n');
    }
  }

  return (
    <Card placeholder="" className="mt-6 w-2/3">
      <CardBody placeholder="">
        <Typography placeholder="" variant="h5" color="blue-gray" className="mb-2">
          {issue.title}
        </Typography>
        <ReactMarkdown className="prose">
          {limitTextLines(issue.body, LIMIT_LINE_NUM)}
        </ReactMarkdown>
      </CardBody>
      <CardFooter placeholder="" className="flex pt-0 justify-between">
        <Button
          placeholder=""
          size="sm"
          variant="text"
          className="flex items-center gap-2 text-gray-500"
          onClick={() => router.push(`home/issue?number=${issue.number}`)}
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
        {session ? 
          // <Tooltip 
          //   content="delete article" 
          // >
          //   <span 
          //     className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-red-500/30 hover:bg-red-500/30 hover:!opacity-100 group-hover:opacity-70" 
          //     onClick={async() => await CloseIssue(issue.number)}
          //   >
          //     <SlTrash />
          //   </span>
          // </Tooltip>
          <CloseButton issueNumber={issue.number} />
          : null
        }
      </CardFooter>
    </Card>
  );
}