import "./css/leaderboard-styles.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Leaderboard = (props) => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    function handleLeaderBoardData() {
      console.log("leaderboard called!");
      setLoading(true);
      fetch("http://localhost:5000/profile/leaderBoard", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          setLeaders(data);
        })
        .catch((err) => {
          toast.error(err);
          return;
        });
      setLoading(false);
    }
    handleLeaderBoardData();
  }, []);
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <div className="leaderboard-main">
      <div className="leaderboard-leaders">
        {" "}
        {[...Array(3)].map((x, i) => (
          <div className="leader-card" key={i}>
            <div className="leaders-card-first">
              <div className="leaders-card-details">
                <div className="leaders-card-details-name"> Student </div>{" "}
                <div className="leaders-card-details-college"> IIT BHU </div>{" "}
              </div>{" "}
              <div className="leaders-card-badge">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
              </div>{" "}
            </div>{" "}
            <div className="leaders-card-second">
              <div className="points">
                <div className="points-head"> Points </div>{" "}
                <div className="points-value"> 1399 </div>{" "}
              </div>{" "}
              <div className="referals">
                <div className="referals-head"> Referals </div>{" "}
                <div className="referals-value"> 50 </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <div className="leaders-list">
        <table className="leaders-table">
          <thead>
            <tr>
              <th> Sr.No. </th> <th> Name </th> <th> College </th>{" "}
              <th> Points </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {leaders &&
              leaders?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1} </td> <td> {item.name} </td>{" "}
                    <td> {item.collegeName} </td> <td> {item.invite} </td>{" "}
                  </tr>
                );
              })}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>
  );
};

export default Leaderboard;
