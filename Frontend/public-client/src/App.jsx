import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Blog from "./pages/Blog";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";
import PagePost from "./pages/PagePost";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAdminCookie = () => {
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (tokenCookie) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    checkAdminCookie();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog isAuth={isAuth} setIsAuth={setIsAuth} />} />
        <Route path="/sign-up" element={<SignUp setIsAuth={setIsAuth} />} />
        <Route path="/sign-in" element={<SignIn setIsAuth={setIsAuth} />} />
        <Route path="/post/:postId" element={<PagePost />} />
      </Routes>
    </BrowserRouter>
  );
}
