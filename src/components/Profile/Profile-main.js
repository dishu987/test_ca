import { isValidElement } from "react";
import { useState } from "react";
import "./css/profile-main-styles.css";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import LoaderProfile from "./loader-profile";
import _CA_GUIDE from "./CA_guide";

const Profile_main = (props) => {
  const values = [
    { id: 1, text: "PROFILE" },
    { id: 2, text: "LEADERBOARD" },
    { id: 3, text: "CA GUIDE" },
  ];
  const [loading, setLoading] = useState(true);
  const [isActive, setActive] = useState(1);
  const handleTabs = (val) => {
    setTimeout(() => {
      setLoading(true);
    }, 50);
    setActive(val);
    setLoading(false);
  };
  return (
    <div className="profile-main">
      <div className="profile-card">
        <div className="profile-tabs">
          {" "}
          {values.map((val) => (
            <button
              key={val.id}
              onClick={() => handleTabs(val.id)}
              className={`${isActive === val.id ? "active" : ""}`}
            >
              {val.text}{" "}
            </button>
          ))}{" "}
        </div>{" "}
        <div className="main-content">
          <div className="profile-data-main">
            {" "}
            {(() => {
              if (!loading) {
                return (
                  <>
                    <div className="yes1">
                      <LoaderProfile />
                    </div>{" "}
                  </>
                );
              } else {
                return (
                  <>
                    <div
                      className={`${isActive === values[0].id ? "yes" : "no"}`}
                    >
                      <Profile
                        email={props.email}
                        isVarified={props.isVarified}
                      />{" "}
                    </div>{" "}
                    <div
                      className={`${
                        isActive === values[1].id ? "yes1" : "no1"
                      }`}
                    >
                      <Leaderboard
                        email={props.email}
                        isVarified={props.isVarified}
                      />{" "}
                    </div>{" "}
                    <div
                      className={`${
                        isActive === values[2].id ? "yes1" : "no1"
                      }`}
                    >
                      <_CA_GUIDE />
                    </div>{" "}
                  </>
                );
              }
            })()}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Profile_main;
