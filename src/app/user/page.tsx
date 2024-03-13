"use client";
import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const query = gql`
query {
  viewer {
    login
  }
}
`;

export default function User() {
  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">hi {data.viewer.login}</h1>
    </main>
  );
}