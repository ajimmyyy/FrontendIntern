"use client";
import { FetchIssues } from "@/actions/fetch-issues";
import LoadMore from "@/components/issue/load-more";
import Issues from "@/components/issue/Issues";
import { useEffect, useState } from "react";
import { IssueInfo } from "@/types/issue";

export default function Home() {
  const [issues, setIssues] = useState<IssueInfo[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const newIssues = await FetchIssues(1);
      setIssues(newIssues);
    };
    fetchIssues();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-2">
        <Issues issues={issues}/>
        <LoadMore />
      </div>
    </>
  );
}
