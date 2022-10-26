import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import "./home-style.css";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              THE <span className="purple"> BENEFITS </span> WE OFFER
            </h1>
            <p className="home-about-body">
              Lorem ipsum dolor ames
              <br />
              <br />
              Lorem ipsum dolor ames
              <i>
                <b className="purple"> Lorem ipsum dolor ames </b>
              </i>
              <br />
              <br />
              Lorem ipsum dolor ames &nbsp;
              <i>
                <b className="purple">Lorem ipsum dolor ames </b> aLorem ipsum
                dolor ames <b className="purple">Lorem ipsum dolor ames</b>
              </i>
              <br />
              <br />
              Lorem ipsum dolor ames
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>CONNECT NOW</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
