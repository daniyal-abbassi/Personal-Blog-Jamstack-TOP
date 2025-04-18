import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Blog from "./pages/Blog";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";

export default function App() {
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    useEffect(()=>{
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    },[]);

    const handleAuthChange = (status) => {
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
