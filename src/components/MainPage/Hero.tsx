import { Button, Col, Row } from "react-bootstrap";
import "./mainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Question } from "../../redux/interfaces";

interface heroProps {
  mostLiked: Question;
}

const Hero = (props: heroProps) => {
  return (
    <Row id="hero">
      <Col className="md-4 hero__left">
        <span id="hero__title">Most liked question</span>
        <p id="hero__text">{props.mostLiked.title}</p>
        <p id="hero__text2">{props.mostLiked.description}</p>
        <span id="hero__likes">
          {props.mostLiked.noOfLikes}{" "}
          <FontAwesomeIcon icon={faHeart} color="red" />
        </span>
        <Button id="hero__button">Go to question</Button>
      </Col>
      <Col className="md-4 hero__right">
        <FontAwesomeIcon icon={faTrophy} stroke="black" />
      </Col>
    </Row>
  );
};
export default Hero;
