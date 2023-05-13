import { Button, Col, Row } from "react-bootstrap";
import "./mainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <Row id="hero">
      <Col className="md-4 hero__left">
        <span id="hero__title">Most liked question</span>
        <p id="hero__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <Button id="hero__button">Go to question</Button>
      </Col>
      <Col className="md-4 hero__right">
        <FontAwesomeIcon icon={faTrophy} stroke="black" />
      </Col>
    </Row>
  );
};
export default Hero;
