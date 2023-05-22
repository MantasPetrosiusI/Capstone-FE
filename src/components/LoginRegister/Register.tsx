import React, { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/register`,
        { username, email, password }
      );

      localStorage.setItem("accessToken", data.accessToken);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="regLog">
      <Row className="d-flex fluid">
        <Col>
          <Form onSubmit={handleRegistration}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username here"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="reg" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="authCol">
          <Button className="auth">
            <a href={`${process.env.REACT_APP_BACKEND}/users/auth/google`}>
              <img
                className="authLogo"
                src="https://res.cloudinary.com/dlfkpg7my/image/upload/v1682775839/Capstone/google-icon-logo-png-transparent_ljbiwg.png"
                alt="Google Logo"
              />{" "}
              Register with Google
            </a>
          </Button>
          <Button className="auth">
            <a href={`${process.env.REACT_APP_BACKEND}/users/auth/github`}>
              <img
                className="authLogo"
                src="https://res.cloudinary.com/dlfkpg7my/image/upload/v1682775837/Capstone/25231_gfxqn2.png"
                alt="GitHub Logo"
              />{" "}
              Register with GitHub
            </a>
          </Button>
        </Col>
      </Row>
      <Row>
        <span id="regLogSpan">
          Already a member?{" "}
          <Link
            to={"/login"}
            style={{
              fontWeight: "bold",
              color: "#2C3B56",
              textDecoration: "none",
            }}
          >
            Login!
          </Link>
        </span>
      </Row>
    </Container>
  );
};

export default Register;
