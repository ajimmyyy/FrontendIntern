import { getSession } from "next-auth/react";

export async function EditIssue(issueNumber: number, title: string, body: string) {
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
          title: title,
          body: body,
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update issue");
    }
    return { "success": true };
  } catch (error) {
    console.error("Error updating GitHub issue:", error);
    return { "success": false };
  }
};