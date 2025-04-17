import { Navigate } from "react-router-dom";

async function signUp({username,password}, navigate) {
    const res = await fetch('http://localhost:3001/api/sign-up',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
        credentials: "include", //use cookies
    });

    const data = res.json();

    if(res.ok) {
        console.log('Sign Up successful: ',data)
        navigate('/sign-in'); // Call navigate here
    return data; 
    } else {
        console.error('Sign Up failed: ',data);
        throw new Error("Username or password is incorrect");
    }
}

export {signUp}