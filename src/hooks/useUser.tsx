import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { UserInfo } from "@/types/user";

export const useFetchUser = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();

      if (!session) {
        console.log('You need to sign in first.');
        setLoading(false);
        return;
      }

      const githubAccessToken = session?.user?.accessToken;
      fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${githubAccessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data: UserInfo) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return { user, loading };
};
