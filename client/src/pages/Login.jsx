import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { socket } = useContext(AppContext);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) {
      toast.error("All field is required!");
    }
    try {
      const res = await login(formData);
      if (res.data.success === true) {
        socket.emit("new-user");
        navigate("/chat");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleChangeValue}
              />
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
      <ToastContainer />
    </Container>
  );
}

export default Login;
