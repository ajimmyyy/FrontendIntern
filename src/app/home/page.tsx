"use client";
import { useFetchIssues } from "@/hooks/useIssues";
import CardItem from "@/components/issue/card-item";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const endOfListRef = useRef<HTMLDivElement>(null);
  const { issues, loading } = useFetchIssues(page);

  useEffect(() => {
    const handleScroll = () => {
      if (endOfListRef.current && window.innerHeight + window.scrollY >= endOfListRef.current.offsetTop) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          issues.map((issue) => (
            <CardItem issue={issue}/>
          ))
        )}
        <div ref={endOfListRef} />
      </div>
    </>
  );
}
