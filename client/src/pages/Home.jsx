import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AiOutlineWechat } from "react-icons/ai";


function Home() {
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div>
          <h1>Share the world with your friends</h1>
          <p>Connect with the world</p>
          <LinkContainer to={"/login"}>
            <Button variant="success">Get Started <AiOutlineWechat color="white" fontSize={20}/></Button>
          </LinkContainer>
        </div>
      </Col>
      <Col className="home__bg">
      </Col>
    </Row>
  );
}

export default Home;
