import React, { useState } from "react";
import PreLoader from "../preloader/preloader";
import { Link } from "react-router-dom";
import "./CSS/login-styles.css";
import { getAuth } from "firebase/auth";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassowrd() {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      toast.error("Fill required field first");
    } else {
      toast.info(
        "Email sent successfully. Please check promotions or spam folder"
      );
      setLoading(false);
      await sendPasswordResetEmail(email);
    }
    setLoading(false);
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="form-container">
        {" "}
        {(() => {
          if (loading) {
            return <PreLoader />;
          }
        })()}{" "}
        <form className="custom-form" noValidate onSubmit={handleResetPassword}>
          <h3> Forgot Password </h3>{" "}
          <input
            type="text"
            placeholder="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <button type="submit"> Send Email </button>{" "}
          <small>
            <Link to={"/login"}> Login </Link>{" "}
          </small>{" "}
        </form>{" "}
      </div>{" "}
    </>
  );
}

export default ForgotPassowrd;
