import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Dropdown } from "react-bootstrap";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";

type CustomNavbarProps = {
  isLoggedIn: boolean;
};

const CustomNavbar = ({ isLoggedIn }: CustomNavbarProps) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const user = useAppSelector((state) => state.df.currentUser);
  function logout() {
    Cookies.remove("accessToken");

    window.location.href = "/";
  }
  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link>
              <span id="bigScreen">Questions</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <pre className="debugforce" id="midScreen">
          <span style={{ color: "#2C3B56" }}>D</span>ebug
          <span style={{ color: "#E99374" }}>F</span>orce
        </pre>
        <pre className="debugforce" id="midScreenSmall">
          <span style={{ color: "#2C3B56" }}>D</span>
          <span style={{ color: "#E99374" }}>F</span>
        </pre>
        {loggedIn && (
          <Dropdown id="profileDown" align={"end"}>
            <Dropdown.Toggle id="profileBtn">
              <img src={user.avatar} alt="userAvatar" id="userAvatar" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!loggedIn && (
          <>
            <button id="login">
              <Link
                to={"/login"}
                style={{ color: "#000000", textDecoration: "none" }}
              >
                Login
              </Link>
            </button>
            <button id="register">
              <Link
                to={"register"}
                style={{ color: "#000000", textDecoration: "none" }}
              >
                Register
              </Link>
            </button>{" "}
          </>
        )}
      </Container>
    </Navbar>
  );
};
export default CustomNavbar;
