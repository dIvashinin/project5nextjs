import React from 'react'

function Register() {
  return (
    <div>
    <h2>Register</h2>
    <form action="">
        <input type="text" id="email"/>
        <label htmlFor="email" placeholder="email">email</label>
        <input type="password" id="password"/>
        <label htmlFor="password" placeholder="password">password</label>
    </form>
    </div>
  );
}

export default Register;