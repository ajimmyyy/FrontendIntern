"use client";
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useFetchComment } from "@/hooks/useComment"; 
import CommentList from "@/components/issue/comment-list";

export default function Issue() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const comment = useFetchComment(searchParams.get('number') ?? '');

  useEffect(() => {
    if (!searchParams.get('number')) {
      router.push('/home');
    }
  }, []);
  
  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-2">
        {comment.issue && (
          <CommentList issue={comment.issue} comments={comment.comment} />
        )}
      </div>
    </>
  );
}