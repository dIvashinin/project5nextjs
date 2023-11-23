import React from 'react'
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../config/firebaseConfig';


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // console.log('email :>> ', email);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // console.log('password :>> ', password);
    };

    const handleLogin = (e) => {
        //never forgetting to prevent this refresh default behaviour!
        e.preventDefault();
        console.log('email, password :>> ', email, password);
        

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("successfully logged in!");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

  return (
    <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
        <input type="text" id="email" placeholder="email" onChange={handleEmailChange}/>
        <label htmlFor="email" >email</label>
        <input type="password" id="password" placeholder="password" onChange={handlePasswordChange}/>
        <label htmlFor="password" >password</label>
        <button type="submit">Login</button>
    </form>
    </div>
  )

}

export default Login;