"use client";
import CardItem from "@/components/issue/card-item";
import { IssueInfo } from "@/types/issue";

export default function Issues({ issues }: { issues: IssueInfo[]}) {
  return (
    <>
      {
        issues.map((issue) => (
          <CardItem issue={issue} key={issue.number}/>
        ))
      }
    </>
  );
}