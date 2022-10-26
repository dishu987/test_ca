import React from "react";
import { Container, Row, Col, NavLink } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import "./home-style.css";
import Tilt from "react-parallax-tilt";

function Home() {
  return (
    <section>
      {/* <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 className="heading-name" style={{ textAlign: "left" }}>
                ZEITGEIST 22 '{" "}
                <p style={{ padding: 30 }}>
                  {" "}
                  <strong className="main-name">
                    {" "}
                    CAMPUS AMBASSADOR PROGRAM{" "}
                  </strong>
                </p>
              </h1>
            </Col>
            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />{" "}
            </Col>{" "}
          </Row>{" "}
        </Container>{" "}
      </Container>{" "} */}
      <div className="home-container">
        <div className="home-content">
          <div className="header">
            <h1>
              <Tilt> ZEITGEIST 22 </Tilt>
            </h1>
          </div>
          <div className="subheader">
            <h1> CAMPUS AMBASSADOR PROGRAM</h1>
          </div>
          <div className="registration-btn">
            <Tilt>
              <a href={""}>Register</a>
            </Tilt>
          </div>
        </div>
        <div className="home-logo">
          <img
            src={homeLogo}
            alt="home pic"
            className="img-fluid"
            style={{ maxHeight: "450px" }}
          />{" "}
        </div>
      </div>
      <Home2 />
    </section>
  );
}

export default Home;
