import { useEffect, useState } from "react";

function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { error, loading, user, setUser };
}

export default useUser;