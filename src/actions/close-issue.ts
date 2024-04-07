import { getSession } from "next-auth/react";

export async function CloseIssue (issueNumber: number){
  const repoOwner = process.env.NEXT_PUBLIC_OWNER_NAME || "";
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "";

  try {
    const session = await getSession();
    const githubAccessToken = session?.user?.accessToken;
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${githubAccessToken}`,
        },
        body: JSON.stringify({
          state: "closed",
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to lock issue");
    }
    return {"success": true};
  } catch (error) {
    console.error("Error locking GitHub issue:", error);
    return {"success": false};
  }
};