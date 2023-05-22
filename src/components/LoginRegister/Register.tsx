import React, { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import "../../css/register.css";
import axios from "axios";

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </Form.Group>
);

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/register`,
        formData
      );

      localStorage.setItem("accessToken", data.accessToken);
      navigate("/login");
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
              <Form onSubmit={handleRegistration}>
                <FormField
                  label="Username"
                  type="text"
                  placeholder="Enter your username here"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Email"
                  type="email"
                  placeholder="Enter your email here"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Password"
                  type="password"
                  placeholder="Enter your password here"
                  value={formData.password}
                  onChange={handleInputChange}
                />
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
        </>
      )}
    </Container>
  );
};

export default Register;
