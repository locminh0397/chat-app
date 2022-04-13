import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault()
    const {email, password} = formData
    if(!email || !password){
      toast.error("All field is required!")
    }
  }
  return (
    <Container>
      <Row>
        <Col lg={5} className="login__bg d-lg-block d-none"></Col>
        <Col
          lg={7}
          md={12}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <Form onSubmit={handleSubmit} style={{ width: "80%", maxWidth: 500 }}>
            <div className="text-center mb-5">
              <h1>Login</h1>
              <VscAccount fontSize={50} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChangeValue}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChangeValue}
              />
            </Form.Group>
            <div>
              <p className="text-end">
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer/>
    </Container>
  );
}

export default Login;
