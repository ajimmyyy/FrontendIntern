"use client"
import { FetchIssues } from "@/actions/fetch-issues";
import { IssueInfo } from "@/types/issue";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Issues from "@/components/issue/Issues";
import { toast } from "sonner";

export default function LoadMore() {
  const [issues, setIssues] = useState<IssueInfo[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const { ref, inView } = useInView();
  
  const loadMoreIssues = async () => {
    if (reachedEnd) return;
    const nextPage = pagesLoaded + 1;
    const newIssues = await FetchIssues(nextPage) ?? [];
    if (newIssues.length === 0) {
      setReachedEnd(true);
      return;
    }
    setIssues([...issues, ...newIssues]);
    setPagesLoaded(nextPage);
  }

  useEffect(() => { 
    if (inView){
      loadMoreIssues();
    } 
  }, [inView]);

  return (
    <>
      <Issues issues={issues}/>
      <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3" ref={ref}>
        <Spinner className="h-8 w-8" />
      </div>
    </>
  );
}