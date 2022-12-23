import "./App.css";
import React, { useState, useEffect } from "react";
import Preloader from "./components/preloader/Pre";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/login";
import LoginFirst from "./components/Login/loginFirst";
import LoginForm from "./components/Login/loginForm";
import { app } from "./firebase-config";
import { getAuth } from "firebase/auth";

import ForgotPassowrd from "./components/Login/forgotPassword";
import Profile_main from "./components/Profile/Profile-main";

function App(props) {
  const [load, upadateLoad] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isVarified, setVarified] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setEmail(userAuth.email);
        setName(userAuth.displayName);
        setVarified(userAuth.emailVerified);
      } else {
        setEmail("");
        setVarified(false);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <Router>
      <Preloader load={load} />
      {/* <PreLoader /> */}
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar email={email} setEmail={setEmail} name={name} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home email={email} />} />{" "}
          {(() => {
            if (!email) {
              return (
                <>
                  <Route path="/login" element={<Login />} />{" "}
                  <Route path="/signup" element={<LoginFirst />} />{" "}
                  <Route path="/forgot-password" element={<ForgotPassowrd />} />{" "}
                </>
              );
            }
          })()}
          {(() => {
            if (email) {
              return (
                <>
                  <Route
                    path="/profile"
                    element={
                      <Profile_main email={email} isVarified={isVarified} />
                    }
                  />{" "}
                </>
              );
            }
          })()}
          <Route path="/signup-step-2" element={<LoginForm email={email} />} />{" "}
          <Route path="*" element={<Navigate to="/" />} />{" "}
        </Routes>{" "}
        <Footer />
      </div>{" "}
    </Router>
  );
}

export default App;
