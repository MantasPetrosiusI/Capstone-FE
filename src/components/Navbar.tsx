import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/navbar.css";

const Register = () => {
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

        <button id="login">Login</button>
        <button id="register">Register</button>
      </Container>
    </Navbar>
  );
};
export default Register;
