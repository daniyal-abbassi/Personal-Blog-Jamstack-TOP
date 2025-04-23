import { Navigate } from "react-router-dom";

async function signUp({ username, password }, navigate) {
    const res = await fetch('http://localhost:3001/api/sign-up', {
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

    if (res.ok) {
        console.log('Sign Up successful: ', data)
        navigate('/sign-in'); // Call navigate here
        return data;
    } else {
        console.error('Sign Up failed: ', data);
        throw new Error("Username or password is incorrect");
    }
}

async function singIn({ username, password }, navigate) {
    const res = await fetch('http://localhost:3001/api/log-in', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });
    const data = res.json();
    if (res.ok) {
        console.log('Sign In successful: ', data);
        navigate('/');
        return data;
    } else {
        console.error('Sign In failed', data)
        throw new Error('log in failed so badly!!!')
    }
}
export { signUp, singIn }