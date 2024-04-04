"use client";
import { FetchIssues } from "@/actions/fetch-issues";
import LoadMore from "@/components/issue/load-more";
import Issues from "@/components/issue/Issues";

export default async function Home() {
  const issues = await FetchIssues(1);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-2">
        <Issues issues={issues}/>
        <LoadMore />
      </div>
    </>
  );
}
