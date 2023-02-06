import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
import DialogBox from "./components/Dialog Box/DialogBox";
import { ToastContainer, useToast } from "react-toastify";
import { fetchProfileData } from "./components/auth/requests/getProfileData";
import { useDispatch } from "react-redux";

function App(props) {
  // const [load, upadateLoad] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isVarified, setVarified] = useState(false);
  const [showLogout, setShowLogout] = useState(2);
  // const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        fetchProfileData(dispatch, userAuth.email, navigate);
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
    <>
      {" "}
      {/* <_BackgroundMusic /> */}{" "}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {(() => {
        if (showLogout === 1) {
          return (
            <DialogBox
              setShowLogout={setShowLogout}
              setEmail={props.setEmail}
            />
          );
        }
      })()}{" "}
      <div className="App">
        <Navbar
          email={email}
          setEmail={setEmail}
          name={name}
          setShowLogout={setShowLogout}
          showLogout={showLogout}
        />{" "}
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
          })()}{" "}
          {(() => {
            if (email) {
              return (
                <>
                  <Route
                    path="/profile"
                    element={
                      <Profile_main
                        email={email}
                        setEmail={setEmail}
                        isVarified={isVarified}
                        setShowLogout={setShowLogout}
                        showLogout={showLogout}
                      />
                    }
                  />{" "}
                </>
              );
            }
          })()}{" "}
          <Route path="/signup-step-2" element={<LoginForm email={email} />} />{" "}
          <Route path="*" element={<Navigate to="/" />} />{" "}
          <Route path="/test" element={<DialogBox />} />{" "}
        </Routes>{" "}
        <Footer />
      </div>{" "}
    </>
  );
}

export default App;
