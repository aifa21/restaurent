import React, { useContext, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import "./Login.css";
import google from "../images/google.png";
import fb from "../images/fb.png";
import './LoginManager';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';
firebase.initializeApp(firebaseConfig);

function Login() {
  

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })

  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          handleResponse(res, false);
      })
  }
  const resetPassword=email=>{
    var auth = firebase.auth();
    
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
      }
  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }
  
  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }
  return (
    <div style={{ textAlign: "center" }} className="sign-up">
      <div className="login-container">
        <div className="row">
          <h4>{newUser ? "Create An Account" : "Login"}</h4>

          <form onSubmit={handleSubmit}>
            {newUser && (
              <input
                name="name"
                type="text"
                onBlur={handleBlur}
                placeholder="Name"
                required
              />
            )}

            <br />
            <input
              type="text"
              name="email"
              onBlur={handleBlur}
              placeholder="Email address"
              required
            />

            <br />

            <input
              type="password"
              name="password"
              onBlur={handleBlur}
              placeholder="Password"
              
            />
            <br />

            {newUser && (
              <input
                type="password"
                name="password"
                onBlur={handleBlur}
                placeholder="Confirm Password"
                required
              />
            )}
            <br />

            <div className="d-flex justify-content-between ">
              {!newUser && (
                <label>
                  <input type="checkbox" /> <small> Remember me </small>
                </label>
              )}
              {!newUser && (
                <button className="forgetBtn">
                  {" "}
                  <small onClick={()=>resetPassword(user.email)}> Forgot Password?</small>
                </button>
              )}
            </div>
            <br />
            <input
              type="submit"
              value={newUser ? "Create an account" : "Login"}
            />
            <br />
            <br />
          </form>

          <p style={{ textAlign: "center" }}>
            {newUser ? "Already have an account ? " : "Don't have account ?"}
            <span
              onClick={() => setNewUser(!newUser)}
              style={{ color: "#F9A51A", cursor: "pointer" }}
            >
              {newUser ? " Login" : " Create Account"}
            </span>
          </p>
          <span>Or</span>
          <div className="social">
            <div className="google-div validate-input m-b-20">
              <button className="google" onClick={googleSignIn}>
                <img src={google} height="15" alt="" />
                Continue with Google
              </button>
            </div>
            <br />
            <div className="facebook-div">
              <button className="facebook" onClick={fbSignIn}>
                <img src={fb} height="20" alt="" />
                Continue with Facebook
              </button>
            </div>
            <br />
          </div>
        </div>
        <p style={{ color: "red" }}>{user.error}</p>
        {user.success && (
          <p style={{ color: "green" }}>
            User {newUser ? "Created" : "Logged in"} Successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
