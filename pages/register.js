import React from 'react'
//need to check the imports, because they can be done automatically wrong
import { useState } from 'react';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        console.log('email :>> ', email);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log('password :>> ', password);
    };

  return (
    <div>
    <h2>Register</h2>
    <form action="">
        <input type="text" id="email" onChange={handleEmailChange}/>
        <label htmlFor="email" placeholder="email">email</label>
        <input type="password" id="password"onChange={handlePasswordChange}/>
        <label htmlFor="password" placeholder="password">password</label>
    </form>
    </div>
  );
}

export default Register;