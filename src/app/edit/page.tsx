"use client";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useFetchIssues } from "@/hooks/useIssues";
import CardItem from "@/components/issue/card-item";
import { Badge } from "@material-tailwind/react";

export default function User() {
  const repoOwner = process.env.OWNER_NAME as string;
  const { issues, loading } = useFetchIssues();

  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          issues.map((issue) => (
            <>
              {issue.comments !== 0 ? (
                <Badge content={issue.comments} placement="bottom-end" withBorder>
                  <CardItem issue={issue} />
                </Badge>
              ) : (
                <CardItem issue={issue} />
              )}
            </>
          ))
        )}
      </div>
    </>
  );
}