import { useState, useEffect } from "react";
import { IssueInfo } from "@/types/issue";
import { CommentInfo } from "@/types/comment";

export const useFetchComment = (number: string) => {
  const [issue, setIssue] = useState<IssueInfo>();
  const [comment, setComments] = useState<CommentInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const repoOwner = process.env.NEXT_PUBLIC_OWNER_NAME || "";
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const issueResponse = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${number}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!issueResponse.ok) {
          throw new Error("Failed to fetch issue");
        }

        const issueData = await issueResponse.json();
        setIssue(issueData);

        const commentsResponse = await fetch(
          issueData?.comments_url || "",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!commentsResponse.ok) {
          throw new Error("Failed to fetch issue comments");
        }

        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [number]);

  return { issue, comment, loading };
}