import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/interfaces";
import { logoutUser } from "../redux/actions";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const CustomNavbar = () => {
  const [brandTextOne, setBrandTextOne] = useState("My");
  const [brandTextTwo, setBrandTextTwo] = useState("Website");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => state.df.user);

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

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

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

  function logout() {
    fetch(`${process.env.REACT_APP_BACKEND}/users/logout`, {
      method: "POST",
      body: JSON.stringify({ userId: user._id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        Cookies.remove("accessToken");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout: ", error);
      });
  }
  return (
    <>
      <Navbar collapseOnSelect expand="md">
        <Container fluid>
          <div className="debugForce">
            <span id="one">{brandTextOne}</span>
            <span id="two">{brandTextTwo}</span>
          </div>
          <Navbar.Toggle
            ref={btnRef}
            aria-controls="navbarSupportedContent"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "3rem" }} />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbarSupportedContent" in={isNavOpen}>
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/editor">
                Editor
              </Nav.Link>
              <Nav.Link as={Link} to="/questions">
                Questions
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {user && user.online && (
            <>
              <Link to="/questionForm" className="noselect">
                <span className="text">New Question</span>
                <span className="icon">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
              </Link>
              <Dropdown id="profileDown" className="mr-auto" align={"end"}>
                <Dropdown.Toggle id="profileBtn">
                  <img src={user.avatar} alt="userAvatar" id="userAvatar" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/profile" className="nav-link" state={user}>
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item>
                    <Link to="/myUnanswered" className="nav-link">
                      Unanswered Questions
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/myAnswered" className="nav-link">
                      Answered Questions
                    </Link>
                  </Dropdown.Item>
                  {(user.role === "Administrator" ||
                    user.role === "Moderator") && (
                    <>
                      <Dropdown.Item>
                        <Link to="/pending__answers" className="nav-link">
                          Pending Answers
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/pending__questions" className="nav-link">
                          Pending Questions
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                  <hr />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}

          {!user.online && (
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
              </button>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
