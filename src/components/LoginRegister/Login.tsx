import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchUserQuestions, setCurrentUser } from "../../redux/actions";
import { useAppDispatch } from "../../redux/hooks";
import { BeatLoader } from "react-spinners";
import "../../css/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/login`,
        {
          username,
          password,
        }
      );
      Cookies.set("accessToken", data.token, { expires: 1 });
      dispatch(setCurrentUser());
      dispatch(fetchUserQuestions());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Container className="regLog">
      {loading ? (
        <div className="loader-container">
          <BeatLoader color="#000" loading={loading} size={15} />
        </div>
      ) : (
        <>
          <Row className="d-flex fluid">
            <Col>
              <Form onSubmit={handleLogin}>
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button className="log" type="submit">
                  Login
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
                  Login with Google
                </a>
              </Button>
              <Button className="auth">
                <a href={`${process.env.REACT_APP_BACKEND}/users/auth/github`}>
                  <img
                    className="authLogo"
                    src="https://res.cloudinary.com/dlfkpg7my/image/upload/v1682775837/Capstone/25231_gfxqn2.png"
                    alt="GitHub Logo"
                  />{" "}
                  Login with GitHub
                </a>
              </Button>
            </Col>
          </Row>
          <Row>
            <span id="regLogSpan">
              Not a member?{" "}
              <Link
                to={"/register"}
                style={{
                  fontWeight: "bold",
                  color: "#2C3B56",
                  textDecoration: "none",
                }}
              >
                Register!
              </Link>
            </span>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Login;
