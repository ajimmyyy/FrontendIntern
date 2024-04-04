import { useState, useEffect } from "react";
import { IssueInfo } from "@/types/issue";
import { getSession } from "next-auth/react";

export const useFetchIssues = (page: number, perPage: number = 10) => {
  const [issues, setIssues] = useState<IssueInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [fetchCount, setFetchCount] = useState<number>(1);
  const repoOwner = process.env.NEXT_PUBLIC_OWNER_NAME || "";
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "";

  const fetchIssues = async () => {
    const session = await getSession();
    const githubAccessToken = session?.user?.accessToken;
    try {
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/issues?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${githubAccessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }
      const issuesData: IssueInfo[] = await response.json();
      if (issuesData.length === 0) {
        setReachedEnd(true);
      } else {
        setIssues(prevIssues => [...prevIssues, ...issuesData]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GitHub issues:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reachedEnd && page > 0) {
      fetchIssues();
      setFetchCount(prevCount => prevCount + 1);
      console.log(`Fetched ${page}, ${fetchCount} times`);
      console.log(reachedEnd);
    }
  }, [page, reachedEnd]);

  return { issues, loading };
};