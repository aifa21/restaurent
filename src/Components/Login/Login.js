import React, { useContext, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import "./Login.css";
import google from "../images/google.png";
import fb from "../images/fb.png";
firebase.initializeApp(firebaseConfig);

function Login() {
  

  const [user, setUser] = useState({
    isSignedIn: "false",
    // newUser:false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } }; //login theke shipment page e niye jabe
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const googleSignedIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const isSignedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(isSignedInUser);
        setLoggedInUser(isSignedInUser);
        history.replace(from);
        console.log(displayName, photoURL, email);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const fbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log("fb", user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };
  const handleSignedOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const isSignedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        };
        setUser(isSignedOutUser);
      })
      .catch((err) => {});
  };

  const handleBlur = (e) => {
    console.log("name", e.target.name);
    // console.log(event.target.value);

    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);

          UpdateUser(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("SignedIn use info", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
        });
    }

    e.preventDefault();
  };
  const UpdateUser = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        // Update successful.
        console.log("Update Successfully");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

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
              required
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
                <a href="#">
                  {" "}
                  <small> Forgot Password?</small>
                </a>
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
              <button className="google" onClick={googleSignedIn}>
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
