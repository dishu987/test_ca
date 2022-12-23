import "./css/profile.css";
import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import PreLoader from "../preloader/preloader";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  sendEmailVerification,
  updatePhoneNumber,
} from "firebase/auth";

const Profile = (props) => {
  let navigate = useNavigate();
  const [copyText, setCopyText] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [college, setCollege] = useState();
  const [gender, setGender] = useState();
  const [state, setState] = useState();
  const [id_card, setID_Card] = useState();
  const [dob, setDOB] = useState();
  const [phone, setPhone] = useState();
  const [YearOfPassing, setYearOfPassing] = useState();
  const [refferal, setRefferal] = useState();
  const [isSent, setIsSent] = useState(false);
  const [udatingPhone, setUpdatingPhone] = useState(false);
  const SendVarificationEmail = () => {
    const auth = getAuth();
    try {
      sendEmailVerification(auth.currentUser).then(() => {
        toast.success("Email Verification sent! Check your inbox or spam box");
        setIsSent(true);
      });
    } catch {
      toast.error("Something went wrong.Try Again!");
      setIsSent(false);
    }
  };
  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };
  const copyToClipboard = () => {
    copy(refferal);
    toast.success(`Copied`);
  };
  const updatePhone = () => {
    setUpdatingPhone(true);
    if (phone.length !== 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    const res = fetch("http://localhost:5000/profile/phoneUpdate", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ email: props.email, phone: phone }),
    })
      .then((response) => {
        toast.success("Phone updated Successfully");
        setUpdatingPhone(false);
      })
      .catch((err) => {
        toast.error("Something went wrong...");
        setUpdatingPhone(false);
      });
    console.log(res);
  };
  const handleProfileData = () => {
    setLoading(true);
    const res = fetch("http://localhost:5000/profile/getUser", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ id: props.email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.name) {
          // navigate("/signup-step-2");
          return;
        }
        setName(data.name);
        setCollege(data.collegeName);
        setDOB(data.dob);
        setGender(data.gender);
        setPhone(data.phone);
        setState(data.collegeState);
        setYearOfPassing(data.YearOfPassing);
        setRefferal(data.referral_code);
        setID_Card(data.idCard);
      })
      .catch((err) => {
        toast.error("Something went wrong...");
        Navigate("/");
      });
    setLoading(false);
  };
  useEffect(() => {
    return handleProfileData;
  }, [props.email]);
  if (loading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            width: "600px",
            height: "300px",
          }}
        >
          <h1> Please wait... </h1>{" "}
        </div>{" "}
      </>
    );
  }
  return (
    <>
      <div className="profile">
        <div className="profile-left">
          <div className="profile-personal-details">
            <div className="profile-personal-details-head">
              <h1> Personal Details </h1>{" "}
            </div>{" "}
            <div className="profile-personal-details-content">
              <ul>
                <li>
                  <span className="id"> Name </span>{" "}
                  <span className="value"> {name} </span>{" "}
                </li>{" "}
                <li>
                  <span className="id"> Gender </span>{" "}
                  <span className="value"> {gender} </span>{" "}
                </li>{" "}
                <li>
                  <span className="id"> Date of Birth </span>{" "}
                  <span className="value"> {dob} </span>{" "}
                </li>{" "}
                <li>
                  <span className="id"> College </span>{" "}
                  <span className="value"> {college} </span>{" "}
                </li>{" "}
                <li>
                  <span className="id"> College State </span>{" "}
                  <span className="value"> {state} </span>{" "}
                </li>{" "}
                <li>
                  <span className="id"> Year of Passing </span>{" "}
                  <span className="value"> {YearOfPassing} </span>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
          </div>{" "}
          <div className="profile-contact-info">
            <div className="profile-contact-details-head">
              <h1> Contact Details </h1>{" "}
            </div>{" "}
            <br />
            <div className="profile-contact-details-content">
              <ul>
                <li>
                  <span className="id"> Phone </span>{" "}
                  <span className="value">
                    +91 -
                    <input
                      type="number"
                      className={udatingPhone ? "phone  active-edit" : "phone"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!udatingPhone && "disabled"}
                    />{" "}
                    {(() => {
                      if (udatingPhone) {
                        return (
                          <>
                            <span
                              style={{
                                padding: "2px 2px",
                                fontSize: "0.7rem",
                                fontWeight: "800",
                                minWidth: "60px",
                                borderRadius: "16px",
                                background: "rgba(255,0,0,0.3)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                margin: "0 0px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onClick={updatePhone}
                            >
                              Save{" "}
                            </span>{" "}
                          </>
                        );
                      } else {
                        return (
                          <>
                            <span
                              class="material-symbols-outlined"
                              style={{
                                cursor: "pointer",
                                margin: "0 3px",
                                transform: "translateY(-3px)",
                              }}
                              onClick={() => {
                                setUpdatingPhone(true);
                              }}
                            >
                              edit_square{" "}
                            </span>{" "}
                          </>
                        );
                      }
                    })()}{" "}
                  </span>{" "}
                </li>{" "}
                <li>
                  <span className="id"> Email </span>{" "}
                  <span className="value">
                    {" "}
                    {props.email} {props.isVarified}{" "}
                    {(() => {
                      if (props.isVarified) {
                        return (
                          <>
                            <span
                              style={{
                                padding: "2px 5px",
                                fontSize: "0.7rem",
                                fontWeight: "800",
                                minWidth: "60px",
                                borderRadius: "16px",
                                background: "#0984e3",
                                backdropFilter: "blur(10px)",
                                border: " 1px solid rgba(255,255,255,0.05)",
                                margin: "0 5px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                            >
                              <span className="material-symbols-outlined">
                                verified{" "}
                              </span>
                              Verified{" "}
                            </span>{" "}
                          </>
                        );
                      }
                    })()}{" "}
                    {(() => {
                      if (!props.isVarified && !isSent) {
                        return (
                          <>
                            <span
                              style={{
                                padding: "2px 5px",
                                fontSize: "0.7rem",
                                fontWeight: "800",
                                minWidth: "100px",
                                borderRadius: "16px",
                                background: "rgba(255,0,0,0.3)",
                                backdropFilter: "blur(10px)",
                                border: " 1px solid rgba(255,255,255,0.05)",
                                margin: "0 5px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onClick={SendVarificationEmail}
                            >
                              <span className="material-symbols-outlined">
                                warning{" "}
                              </span>
                              Verify Email{" "}
                            </span>{" "}
                          </>
                        );
                      } else if (!props.isVarified && isSent) {
                        return (
                          <>
                            <span
                              style={{
                                padding: "2px 5px",
                                fontSize: "0.7rem",
                                fontWeight: "800",
                                minWidth: "100px",
                                borderRadius: "16px",
                                background: "green",
                                backdropFilter: "blur(10px)",
                                border: " 1px solid rgba(255,255,255,0.05)",
                                margin: "0 5px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                            >
                              <span className="material-symbols-outlined">
                                done_all{" "}
                              </span>
                              Email Sent{" "}
                            </span>{" "}
                          </>
                        );
                      }
                    })()}{" "}
                  </span>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="divider"> </div>{" "}
        <div className="profile-right">
          {" "}
          {/* <div className="profile-image">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
                          alt=""
                          srcSet=""
                        />
                      </div> */}{" "}
          <div className="ca-points">
            <ul>
              <li>
                <div className="id"> Points </div>{" "}
                <div className="value"> 1324 </div>{" "}
              </li>{" "}
              <li>
                <div className="id"> Referals </div>{" "}
                <div className="value"> 140 </div>{" "}
              </li>{" "}
              <li>
                <div className="id"> Z - Coins </div>{" "}
                <div className="value"> 123 </div>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          <div className="profile-refferal-section">
            <div className="refferal-content">
              <input
                type="text"
                className="text"
                onChange={handleCopyText}
                value={refferal}
                disabled
              />
            </div>{" "}
            <div className="refferal-copy" onClick={copyToClipboard}>
              <span className="material-symbols-outlined"> content_copy </span>{" "}
            </div>{" "}
          </div>{" "}
          <small> Refferal Code </small>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default Profile;
