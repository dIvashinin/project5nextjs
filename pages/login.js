import React from "react";
import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { app, auth } from "../config/firebaseConfig";
const shopBanner = "https://res.cloudinary.com/dzghua4dz/image/upload/v1701986735/moonrubyshop/cgfdekd8afqoxuygrrgb.jpg"

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
    // console.log('auth :>> ', auth);

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          // Signed in
          const user = userCredential.user;
          alert("successfully logged in!");
          // Reset input fields
            setEmail(() => "");
            setPassword(() => "");
        //   setEmail("");
        //   setPassword("");
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

//    const handleLogout = () => {
//     console.log('logout :>> ');
//     //reseting states
//     setUser(null);
//     setEmail("");
//     setPassword("");
//     alert("you are logged out");
//     };
const handleLogout = () => {

const auth = getAuth();
//this method will sign us out from firebase not from our app
signOut(auth).then(() => {
    setUser(null);
    setEmail(() => "");
    setPassword(() => "");
    // setEmail("");
    // setPassword("");
    alert("you are logged out");
  // Sign-out successful.
}).catch((error) => {
    console.log('error signing out :>> ', error);
  // An error happened.
});
}

  

  return (
    <div>
      <h3 data-tag="top-about-empty-space"></h3>
    <div className="banner-container">
        <img src={shopBanner} alt="Etsy" className="banner-image" />
      </div>
    <div className="login-container">
      <h2 data-tag="login">Login</h2>
      <form data-tag="submit-login-form" onSubmit={handleLogin}>
        <input data-tag="input-email"
          type="text"
          id="email"
          placeholder="email"
          onChange={handleEmailChange}
        />
        <label data-tag="label-email" htmlFor="email">email</label>
        <input data-tag="input-password"
          type="password"
          id="password"
          placeholder="password"
          onChange={handlePasswordChange}
        />
        <label data-tag="label-password" htmlFor="password">password</label>
        <button data-tag="login-button" type="submit">Login</button>
      </form>
        <button data-tag="logout-button" onClick={handleLogout} type="submit">Logout</button>
    </div>
    </div>
  );
}

export default Login;
