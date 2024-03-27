"use client";
import { useFetchIssues } from "@/hooks/useIssues";
import CardItem from "@/components/user/card-item";

export default function Home() {
  const repoOwner = process.env.OWNER_NAME as string;
  const { issues, loading } = useFetchIssues();

  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          issues.map((issue) => (
            <CardItem issue={issue} />
          ))
        )}
      </div>
    </>
  );
}
