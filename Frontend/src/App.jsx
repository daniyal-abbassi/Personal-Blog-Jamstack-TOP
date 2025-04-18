import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/pages/Blog";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import { useEffect, useState } from "react";

export default function App() {
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Function to check if a cookie with a given name exists
      const checkCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return true; // We only care if it exists
        }
        return false;
      }
  
      if (checkCookie('token')) {
        setIsAuthenticated(true);
        console.log('Token cookie found on load.');
      } else {
        setIsAuthenticated(false);
        console.log('Token cookie not found on load.');
      }
    }, []);

    const handleAuthChange = (status) => {
      console.log('handleAtuhChange is ',status)
      setIsAuthenticated(status)
    }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog isAuthenticated={isAuthenticated}/>} />
        <Route path="/sign-up" element={<SignUp onAuthChange={handleAuthChange}/>} />
        <Route path="/sign-in" element={<SignIn onAuthChange={handleAuthChange}/>} />
      </Routes>
    </BrowserRouter>
  );
}
