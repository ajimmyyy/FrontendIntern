import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import { IssueInfo } from "@/types/issue";
import { CommentInfo } from "@/types/comment";
import CommentItem from "@/components/issue/comment-item";
import ReactMarkdown from "react-markdown";

export default function CommentList({ issue, comments }: { issue: IssueInfo, comments: CommentInfo[] }) {
  return (
    <>
      <Card placeholder="" className="mt-6 w-2/3">
          <CardBody placeholder="">
            <ReactMarkdown className="prose">
              {issue.body}
            </ReactMarkdown>
          </CardBody>
        </Card>
      {
        comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id}/>
        ))
      }
    </>
  );
}