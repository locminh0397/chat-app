import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar from "../images/avatar.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useRegisterMutation } from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [register, { isLoading, error }] = useRegisterMutation();
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cysyxam7");
    try {
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dqiu3fmmf/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      return urlData.url;
    } catch (error) {
      console.log(error);
    }
  };
  const clear = () => {
    setImage(null);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    // eslint-disable-next-line no-useless-escape
    const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    if (!username || !email || !password || !confirmPassword) {
      toast.error("All field is required!");
    } else if (!emailValidate) {
      toast.error("Email is invalid!");
    } else if (password !== confirmPassword) {
      toast.error("Password doesn't match!");
    } else if (!image) {
      toast.error("Please upload your profile picture");
    } else {
      try {
        const url = await uploadImage(image);
        const res = await register({ username, password, email, picture: url });
        if (res.data.success === true) {
          toast.success(res.data.msg);
          clear();
        } else {
          toast.error(res.data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const valiadeImage = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      toast.error("Max file size 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <Container>
      <Row>
        <Col
          md={12}
          lg={7}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <Form onSubmit={handleSubmit} style={{ width: "80%", maxWidth: 500 }}>
            <div className="text-center mb-5">
              <h1>Create account</h1>
              <div className="avatar">
                <img src={imagePreview || avatar} alt="" />
                <label htmlFor="image-upload" className="image-upload-label">
                  <AiOutlinePlusCircle fontSize={25} color="rgb(6, 101, 243)" />
                </label>
                <input
                  type="file"
                  name=""
                  id="image-upload"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={valiadeImage}
                />
              </div>
            </div>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                placeholder="Enter username"
                onChange={handleChangeValue}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChangeValue}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                autoComplete="off"
                onChange={handleChangeValue}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm password"
                autoComplete="off"
                onChange={handleChangeValue}
              />
            </Form.Group>
            <div>
              <p className="text-end">
                Have an account? <Link to="/login">Login</Link>
              </p>
            </div>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
            <Button variant="primary" onClick={clear}>
              clear
            </Button>
          </Form>
        </Col>
        <Col lg={5} className="login__bg d-lg-block d-none"></Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Signup;
