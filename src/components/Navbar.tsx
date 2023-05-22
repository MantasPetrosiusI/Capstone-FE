import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/navbar.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowRight,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { RootState } from "../redux/interfaces";
import { logoutUser, searchQuestions, searchUsers } from "../redux/actions";
import { Form, FormControl, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const CustomNavbar = () => {
  const [brandTextOne, setBrandTextOne] = useState("My");
  const [brandTextTwo, setBrandTextTwo] = useState("Website");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState<string>("language");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
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
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.df.user);
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

  useEffect(() => {
    if (["tag", "language", "title"].includes(searchCategory)) {
      dispatch(searchQuestions(searchCategory, searchQuery));
    } else if (["username"].includes(searchCategory)) {
      dispatch(searchUsers(searchCategory, searchQuery));
    }
  }, [searchQuery, searchCategory, dispatch]);
  const searchedQuestions = useAppSelector(
    (state: RootState) => state.df.allSearch
  );
  const searchedUsers = useAppSelector(
    (state: RootState) => state.df.allUsersSearch
  );
  useEffect(() => {
    if (!isFocused) {
      setSearchQuery("");
    }
  }, [isFocused]);
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

          <Navbar.Collapse id="navbarSupportedContent" in={isNavOpen}>
            <Navbar.Brand className="debugForce" as={Link} to="/">
              <span id="one">{brandTextOne}</span>
              <span id="two">{brandTextTwo}</span>
            </Navbar.Brand>

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
            <Form
              className="input-container d-flex"
              onChange={(e) => {
                e.preventDefault();
              }}
            >
              <FormControl
                placeholder="Start search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <div style={{ display: "inline-block" }}>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={searchCategory}
                  variant="none"
                  className="mt-3"
                  align="end"
                >
                  <Dropdown.Item onClick={() => setSearchCategory("language")}>
                    language
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("title")}>
                    title
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("tag")}>
                    tag
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("username")}>
                    user
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </Form>
            {searchedQuestions &&
              searchedQuestions.length > 0 &&
              searchQuery !== "" && (
                <div>
                  <ul className="searchResult">
                    {searchedQuestions.map((question) => (
                      <li
                        className="searchResultLi"
                        key={question._id}
                        onClick={() =>
                          navigate("/Question", { state: { question } })
                        }
                      >
                        {question.title}{" "}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          fontSize={"1rem"}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {searchedUsers &&
              searchedUsers.length > 0 &&
              searchQuery !== "" && (
                <div>
                  <ul className="searchResult">
                    {searchedUsers.map((user) => (
                      <li
                        className="searchResultLi"
                        key={user._id}
                        onClick={() =>
                          navigate("/profile", { state: { user } })
                        }
                      >
                        {user.username}{" "}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          fontSize={"1rem"}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                  {(user.role === "Administrator" ||
                    user.role === "Moderator") && (
                    <Dropdown.Item>
                      <Link to="/pending__answers" className="nav-link">
                        Pending Answers
                      </Link>
                    </Dropdown.Item>
                  )}
                  {(user.role === "Administrator" ||
                    user.role === "Moderator") && (
                    <Dropdown.Item>
                      <Link to="/pending__questions" className="nav-link">
                        Pending Questions
                      </Link>
                    </Dropdown.Item>
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
              </button>{" "}
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};
export default CustomNavbar;
