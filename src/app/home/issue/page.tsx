"use client";
import {
  Menu,
  MenuHandler,
  MenuList,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFetchComment } from "@/hooks/useComment";
import CommentList from "@/components/comment/comment-list";
import CloseButton from "@/components/issue/close-button";
import EditButton from "@/components/issue/edit-button";
import { MdOutlineSettings } from "react-icons/md";

export default function Issue() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const comment = useFetchComment(searchParams.get('number') ?? '');
  const { data: session, status } = useSession()
  const [closeIssue, setCloseIssue] = useState(false);

  useEffect(() => {
    if (!searchParams.get('number')) {
      router.back();
    }
  }, []);

  useEffect(() => {
    if (closeIssue) {
      router.back();
      setCloseIssue(false);
    }
  }, [closeIssue, router]);

  return (
    <>
      <div className="flex min-w-full justify-center items-start">
        <div className="p-2">
          {comment.issue && (
            <CommentList issue={comment.issue} comments={comment.comment} />
          )}
        </div>
        <div className="mt-8">
          {comment.issue && session && (
            <Menu
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              placement="bottom-start"
            >
              <MenuHandler>
                <IconButton placeholder="" variant="text" color="blue-gray" className="rounded-full">
                  <MdOutlineSettings size={40} />
                </IconButton>
              </MenuHandler>
              <MenuList placeholder="" className="flex flex-col justify-center space-y-2">
                <EditButton
                  issueNumber={comment.issue.number}
                  title={comment.issue.title}
                  body={comment.issue.body}
                />
                <CloseButton
                  issueNumber={comment.issue.number}
                  setIssueClose={setCloseIssue}
                />
              </MenuList>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
}