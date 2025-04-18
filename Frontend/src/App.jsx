import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/pages/Blog";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
