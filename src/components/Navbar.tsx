import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Dropdown } from "react-bootstrap";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type CustomNavbarProps = {
  isLoggedIn: boolean;
};

const CustomNavbar = ({ isLoggedIn }: CustomNavbarProps) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [brandTextOne, setBrandTextOne] = useState("My");
  const [brandTextTwo, setBrandTextTwo] = useState("Website");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeNav = (e: MouseEvent) => {
      const path = e.composedPath() as HTMLElement[];
      if (!path.includes(btnRef.current!)) {
        setIsNavOpen(false);
      }
    };
    document.body.addEventListener("click", closeNav);
    return () => document.body.removeEventListener("click", closeNav);
  }, []);
  const user = useAppSelector((state) => state.df.currentUser);
  function logout() {
    Cookies.remove("accessToken");
    logout();
    window.location.href = "/";
  }

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setBrandTextOne("D");
        setBrandTextTwo("F");
      } else {
        setBrandTextOne("Debug");
        setBrandTextTwo("Force");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="sm">
        <Container className="fluid">
          <Navbar.Toggle
            ref={btnRef}
            aria-controls="navbarSupportedContent"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "3rem" }} />
          </Navbar.Toggle>

          {/* Collapsible wrapper */}
          <Navbar.Collapse id="navbarSupportedContent" in={isNavOpen}>
            {/* Navbar brand */}
            <Navbar.Brand className="debugForce" href="/">
              <span id="one">{brandTextOne}</span>
              <span id="two">{brandTextTwo}</span>
            </Navbar.Brand>

            {/* Left links */}
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/editor">Editor</Nav.Link>
              <Nav.Link href="/questions">Questions</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {loggedIn && (
            <Dropdown id="profileDown" className="mr-auto" align={"end"}>
              <Dropdown.Toggle id="profileBtn">
                <img src={user.avatar} alt="userAvatar" id="userAvatar" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </Dropdown.Item>
                <hr />
                <div id="questionDiv">
                  <Dropdown>
                    <Dropdown.Toggle className="nav-link questions">
                      My questions
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="start">
                      <Dropdown.Item>
                        <Link to="/myAnswered" className="nav-link">
                          Answered
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/myUnanswered" className="nav-link">
                          Unanswered
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <Dropdown.Item>
                  <Link to="/myAnswers" className="nav-link">
                    My answers
                  </Link>
                </Dropdown.Item>
                <hr />
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
    </>
  );
};
export default CustomNavbar;
