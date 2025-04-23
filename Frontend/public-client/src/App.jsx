import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Blog from "./pages/Blog";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";


export default function App() {

  const [isAuth,setIsAuth] = useState(false);
    const navigate = useNavigate();
  
  
   
   
    useEffect(()=>{
      const checkAdminCookie = ()=>{
        const tokenCookie = document.cookie.split('; ').find(row=>row.startsWith('token='));
        if(tokenCookie) {
          setIsAuth(true)
        } else {
          setIsAuth(false);
        }
      }
      checkAdminCookie();
    },[])
  
    const handleLogOut = () => {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setIsAuth(false);
      navigate('/')
    }
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog isAuth={isAuth} handleLogOut={handleLogOut}/>} />
        <Route path="/sign-up" element={<SignUp setIsAuth={setIsAuth}/>} />
        <Route path="/sign-in" element={<SignIn  setIsAuth={setIsAuth}/>} />
      </Routes>
    </BrowserRouter>
  );
}
