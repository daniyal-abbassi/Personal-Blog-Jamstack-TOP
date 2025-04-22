import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Blog from "./pages/Blog";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Admin from "../../private-client/src/pages/Admin/Admin";
import { useContext} from "react";
import { UserContext } from "../../private-client/src/UserProviders";
import {ThemeProvider} from "../../private-client/src/components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
export default function App() {
    const {isAuthenticated} = useContext(UserContext);

    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog isAuthenticated={isAuthenticated}/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/admin" element={
          <ThemeProvider>
            <Admin />
            <Toaster />
          </ThemeProvider>
          
          } />
      </Routes>
    </BrowserRouter>
  );
}
