"use client";
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFetchComment } from "@/hooks/useComment"; 
import CommentList from "@/components/issue/comment-list";
import CloseButton from "@/components/issue/close-button";

export default function Issue() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const comment = useFetchComment(searchParams.get('number') ?? '');
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!searchParams.get('number')) {
      router.push('/home');
    }
  }, []);
  
  return (
    <>
      <div className="flex min-w-full justify-center items-start">
        <div className="flex min-h-screen flex-col p-2">
          {comment.issue && (
            <CommentList issue={comment.issue} comments={comment.comment} />
          )}
        </div>
        <div className="mt-8">
          {comment.issue && session && <CloseButton issueNumber={comment.issue.number} />}
        </div>
      </div>
    </>
  );
}