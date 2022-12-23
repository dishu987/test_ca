import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/login-styles.css";
import Google from "./google.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../firebase-config";
import PreLoader from "../preloader/preloader";

function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  let navigate = useNavigate();
  const loginGoogle = () => {
    const authentication = getAuth();
    signInWithPopup(authentication, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        sessionStorage.setItem("Auth Token", token);
        toast.success("Loggedin  Successfully");
        // ...
      })
      .catch((error) => {
        toast.error("Something went wrong, Try Again!");
      });
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      toast.error("Fill required field first");
    } else {
      setLoading(true);
      const authentication = getAuth();
      signInWithEmailAndPassword(authentication, user.email, user.password)
        .then((response) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          setLoading(false);
          toast.success("Logged in");
          navigate("/profile");
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
            setLoading(false);
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
            setLoading(false);
          }
        });
    }
  }
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
        {(() => {
          if (loading) {
            return <PreLoader />;
          }
        })()}
        <form className="custom-form" noValidate onSubmit={handleSubmit}>
          <h3>Login Here</h3>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => onInputChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => onInputChange(e)}
          />
          <button typeof="submit" as={Link}>
            Log In
          </button>
          <div className="seprate-div">
            <div />
            Or
            <div />
          </div>
          <div className="social">
            <Link className="fb" onClick={loginGoogle}>
              <img src={Google} alt="" srcSet="" />
              <span> Sign In with Google</span>
            </Link>
          </div>
          <small>
            <Link to={"/forgot-password"}>Forgot Passowrd</Link>
          </small>
          <small>
            Don't have account? <Link to={"/signup"}>SignUp</Link>
          </small>
        </form>
      </div>
    </>
  );
}

export default Login;
