import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AiOutlineWechat } from "react-icons/ai";

function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <AiOutlineWechat fontSize={50} color={"blue"} />{" "}
            <span className="logo">Chat</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
