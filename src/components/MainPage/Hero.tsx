import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Question } from "../../redux/interfaces";
import { useNavigate } from "react-router-dom";
import "./hero.css";

interface HeroProps {
  mostLiked: Question;
}

const MAX_DESCRIPTION_LENGTH = 350;

const Hero: React.FC<HeroProps> = ({ mostLiked }) => {
  const navigate = useNavigate();

  if (!mostLiked) {
    return null;
  }

  if (!mostLiked.accepted) {
    return null;
  }
  const { title, description, noOfLikes } = mostLiked;
  const truncatedDescription = description.substring(0, MAX_DESCRIPTION_LENGTH);
  const showEllipsis = description.length > MAX_DESCRIPTION_LENGTH;

  const handleButtonClick = () => {
    navigate("/Question", { state: { question: mostLiked } });
  };

  return (
    <Row id="hero">
      <Col md={4} className="hero__left">
        <span id="hero__title">
          Most liked question <FontAwesomeIcon icon={faTrophy} stroke="black" />
        </span>
        <p id="hero__text">{title}</p>
        <p id="hero__text2">
          {truncatedDescription}
          {showEllipsis && <span className="text-muted"> ...</span>}
        </p>
        <div className="hero__left__bottom">
          <span id="hero__likes">
            {noOfLikes} <FontAwesomeIcon icon={faHeart} color="maroon" />
          </span>
          <Button id="hero__button" onClick={handleButtonClick}>
            Go to question
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Hero;
