import { useEffect, useState } from "react";

function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // CHECK AUTHENTICATION 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      //SET LOADIN TO TRUE, AT THE START OF FETCHING
      setLoading(true);
      try {
        //GET THE TOKEN FROM COOKIE
        const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (tokenCookie) {
          setIsAuthenticated(true);
          console.log('Token cookie found. Fetching user data...');
          const response = await fetch('http://localhost:3001/api/user',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            }
          )
          if (!response.ok) {
            throw new Error('Failed to fetch user data: ', response.status)
          }
          const data = await response.json();
          setUser(data)
          console.log('from useUser: ',data)
        } else {
          setIsAuthenticated(false);
          setUser(null);
          console.log('Token cookie not found!')
        }


      } catch (error) {
        console.log('Error fetching user data: ', error)
        setError(error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { error, loading, user, setUser,isAuthenticated,setIsAuthenticated };
}

export default useUser;