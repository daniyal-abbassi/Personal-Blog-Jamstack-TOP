import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/pages/Blog";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import { useState } from "react";

export default function App() {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog isAuthenticated={isAuthenticated}/>} />
        <Route path="/sign-up" element={<SignUp onAuthChange={setIsAuthenticated}/>} />
        <Route path="/sign-in" element={<SignIn onAuthChange={setIsAuthenticated}/>} />
      </Routes>
    </BrowserRouter>
  );
}
