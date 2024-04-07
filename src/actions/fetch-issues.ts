import { IssueInfo } from "@/types/issue";
import { toast } from "sonner";

export async function FetchIssues (page: number, perPage: number = 10){
  const repoOwner = process.env.NEXT_PUBLIC_OWNER_NAME || "";
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "";

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch issues");
    }
    const issuesData: IssueInfo[] = await response.json();
    return issuesData;
  } catch (error) {
    console.error("Error fetching GitHub issues:", error);
    return [];
  }
};