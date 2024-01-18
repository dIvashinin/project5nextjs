import React from 'react'
//need to check the imports, because they can be done automatically wrong
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, auth } from '../config/firebaseConfig';
import ProtectedRoute from '../components/ProtectedRoute';

function Register() {
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

    const handleRegister = (e) => {
        //never forgetting to prevent this refresh default behaviour!
        e.preventDefault();
        console.log('email, password :>> ', email, password);
        
//this code we paste from firebase docs 'sign up new users'
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("successfully registered");
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
        };

  return (
    <ProtectedRoute>
    <div>
    <h2>Register</h2>
    <form onSubmit={handleRegister}>
        <input type="text" id="email" placeholder="email" onChange={handleEmailChange}/>
        <label htmlFor="email" >email</label>
        <input type="password" id="password" placeholder="password" onChange={handlePasswordChange}/>
        <label htmlFor="password" >password</label>
        <button type="submit">Register</button>
    </form>
    </div>
    </ProtectedRoute>
  );
}

export default Register;