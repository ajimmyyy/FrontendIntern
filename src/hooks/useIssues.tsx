import { useState, useEffect } from "react";
import { IssueInfo } from "@/types/issue";

export const useFetchIssues = () => {
  const [issues, setIssues] = useState<IssueInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const repoOwner = process.env.NEXT_PUBLIC_OWNER_NAME || "";
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "";

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }

        const data = await response.json();
        setIssues(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub issues:", error);
        setLoading(false);
      }
    };

    fetchIssues();
  }, [repoName]);

  return { issues, loading };
};