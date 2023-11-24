import React from "react";
import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app, auth } from "../config/firebaseConfig";

function Login() {
  const [user, setUser] = useState("");
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

  const checkIfUserIsActive = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("user is still logged in");
        setUser(user);
        // ...
      } else {
          console.log("user is logged out");
          setUser(null);
        // User is signed out
        // ...
      }
    });
  };

  const handleLogin = async (e) => {
    //never forgetting to prevent this refresh default behaviour!
    e.preventDefault();
    console.log("email, password :>> ", email, password);

    const auth = getAuth();
    console.log('auth :>> ', auth);

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          // Signed in
          const user = userCredential.user;
          alert("successfully logged in!");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message; 
        alert(`Login failed: ${errorMessage}`);
    }
};
    useEffect(() => {
        // const auth = getAuth();
        checkIfUserIsActive(auth); 
    }, []);

   const handleLogout = () => {
    console.log('logout :>> ');
    //reseting states
    setUser(null);
    setEmail("");
    setPassword("");
    alert("you are logged out");
    };

  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="email"
          placeholder="email"
          onChange={handleEmailChange}
        />
        <label htmlFor="email">email</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handlePasswordChange}
        />
        <label htmlFor="password">password</label>
        <button type="submit">Login</button>
      </form>
        <button onClick={handleLogout} type="submit">Logout</button>
    </div>
  );
}

export default Login;
