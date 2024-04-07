import { getSession } from "next-auth/react";

export async function CreateIssues (title: string, body: string){
  const repoOwner = process.env.NEXT_PUBLIC_OWNER_NAME || "";
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "";

  try {
    const session = await getSession();
    const githubAccessToken = session?.user?.accessToken;
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
      {
        method: "POST",
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
      throw new Error("Failed to create issue");
    }
    return {"success": true};
  } catch (error) {
    console.error("Error creating GitHub issue:", error);
    return {"success": false};
  }
};